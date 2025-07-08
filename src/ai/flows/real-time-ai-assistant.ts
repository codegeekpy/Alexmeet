
'use server';
/**
 * @fileOverview An AI agent that suggests nearby booths, live trending talks, and people to meet.
 *
 * - getNextAction - A function that handles the process of getting the next action suggestion.
 * - GetNextActionInput - The input type for the getNextAction function.
 * - GetNextActionOutput - The return type for the getNextAction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { eventSessions } from '@/lib/data';
import { openDb } from '@/app/database/db';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type Message = z.infer<typeof MessageSchema>;

const GetNextActionInputSchema = z.object({
  query: z.string().describe('The user query for what to do next.'),
  history: z.array(MessageSchema).optional().describe('The conversation history so far.'),
});
export type GetNextActionInput = z.infer<typeof GetNextActionInputSchema>;

const GetNextActionOutputSchema = z.object({
  suggestion: z.string().describe('The AI-generated suggestion for the next action.'),
});
export type GetNextActionOutput = z.infer<typeof GetNextActionOutputSchema>;

export async function getNextAction(input: GetNextActionInput): Promise<GetNextActionOutput> {
  return getNextActionFlow(input);
}

const getLiveSessions = ai.defineTool(
  {
    name: 'getLiveSessions',
    description: 'Get a list of event sessions that are currently live or are starting in the next 15 minutes. Useful for when a user asks what they can do right now.',
    inputSchema: z.object({}),
    outputSchema: z.array(z.object({
        title: z.string(),
        startTime: z.string(),
    })),
  },
  async () => {
    const now = new Date();
    const in15Minutes = new Date(now.getTime() + 15 * 60 * 1000);
    return eventSessions
        .filter(session => {
            const startTime = new Date(session.startTime);
            return startTime >= now && startTime <= in15Minutes;
        })
        .map(({ title, startTime }) => ({ title, startTime }));
  }
);

const findRelevantPeople = ai.defineTool(
  {
    name: 'findRelevantPeople',
    description: 'Finds conference attendees who have a specified interest. Useful for networking recommendations.',
    inputSchema: z.object({ interest: z.string().describe('The interest or topic to search for, e.g., "SaaS" or "AI".') }),
    outputSchema: z.array(z.object({ name: z.string(), title: z.string(), company: z.string() })),
  },
  async ({ interest }) => {
    const lowerCaseInterest = interest.toLowerCase();
    const db = await openDb();
    const allAttendees = await db.all('SELECT name, title, company, interests FROM attendees');
    
    return allAttendees
        .filter(person => {
            const interests: string[] = JSON.parse(person.interests || '[]');
            return interests.some(i => i.toLowerCase().includes(lowerCaseInterest))
        })
        .map(({ name, title, company }) => ({ name, title, company }));
  }
);

const getNextActionFlow = ai.defineFlow(
  {
    name: 'getNextActionFlow',
    inputSchema: GetNextActionInputSchema,
    outputSchema: GetNextActionOutputSchema,
  },
  async ({ query, history }) => {
    const response = await ai.generate({
      prompt: query,
      history: history?.map(m => ({ role: m.role, parts: [{ text: m.content }] })),
      tools: [getLiveSessions, findRelevantPeople],
      system: `You are a helpful and friendly AI event guide for the AIxMeet conference.
Your goal is to provide personalized and actionable recommendations to attendees.
Use the available tools to answer questions about what sessions to attend or who to meet.

- If the user asks what to do now or soon, use the 'getLiveSessions' tool to see what's on.
- If the user mentions an interest or topic (e.g., "I'm interested in SaaS"), use the 'findRelevantPeople' tool to suggest networking opportunities.
- If no specific tools apply, provide a general helpful suggestion.
- Be proactive and engaging in your responses. Keep them concise and to the point.
- Format your response as a direct suggestion. For example, if you find a session, say "You should check out the 'The AI Revolution' session starting soon!"
`,
    });

    return { suggestion: response.text };
  }
);
