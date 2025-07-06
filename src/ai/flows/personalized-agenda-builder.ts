'use server';

/**
 * @fileOverview Personalized Agenda Builder AI agent.
 *
 * - personalizedAgendaBuilder - A function that recommends best-fit sessions and talks.
 * - PersonalizedAgendaBuilderInput - The input type for the personalizedAgendaBuilder function.
 * - PersonalizedAgendaBuilderOutput - The return type for the personalizedAgendaBuilder function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedAgendaBuilderInputSchema = z.object({
  interests: z
    .array(z.string())
    .describe('A list of the attendee\'s interests.'),
  goals: z.string().describe('The attendee\'s goals for the event.'),
  availability: z
    .array(z.object({
      startTime: z.string().describe('The start time of the available slot (ISO format).'),
      endTime: z.string().describe('The end time of the available slot (ISO format).'),
    }))
    .describe('A list of the attendee\'s available time slots.'),
  sessions: z
    .array(z.object({
      title: z.string().describe('The title of the session.'),
      description: z.string().describe('A detailed description of the session.'),
      startTime: z.string().describe('The start time of the session (ISO format).'),
      endTime: z.string().describe('The end time of the session (ISO format).'),
      tags: z.array(z.string()).describe('Keywords or tags associated with the session.'),
    }))
    .describe('A list of available sessions at the event.'),
});
export type PersonalizedAgendaBuilderInput = z.infer<
  typeof PersonalizedAgendaBuilderInputSchema
>;

const PersonalizedAgendaBuilderOutputSchema = z.object({
  recommendedSessions: z
    .array(z.object({
      title: z.string().describe('The title of the recommended session.'),
      startTime: z.string().describe('The start time of the session (ISO format).'),
      endTime: z.string().describe('The end time of the session (ISO format).'),
      reason: z.string().describe('The reason why this session was recommended.'),
    }))
    .describe('A list of recommended sessions that fit the attendee\'s interests, goals, and availability, with conflicts resolved.'),
});
export type PersonalizedAgendaBuilderOutput = z.infer<
  typeof PersonalizedAgendaBuilderOutputSchema
>;

export async function personalizedAgendaBuilder(
  input: PersonalizedAgendaBuilderInput
): Promise<PersonalizedAgendaBuilderOutput> {
  return personalizedAgendaBuilderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedAgendaBuilderPrompt',
  input: {schema: PersonalizedAgendaBuilderInputSchema},
  output: {schema: PersonalizedAgendaBuilderOutputSchema},
  prompt: `You are an AI assistant that helps attendees build a personalized agenda for an event.

You will receive the attendee's interests, goals, availability, and a list of available sessions.
Your task is to recommend the best-fit sessions that align with the attendee's interests, goals, and availability, while automatically resolving any scheduling conflicts.

Attendee Interests: {{{interests}}}
Attendee Goals: {{{goals}}}
Attendee Availability: {{{availability}}}
Available Sessions: {{{sessions}}}

Consider the following when recommending sessions:

*   Relevance to the attendee's interests and goals.
*   The session's description and tags.
*   The attendee's availability and avoid scheduling conflicts.
*   Provide a brief reason for recommending each session.

Output the recommended sessions in the following JSON format:

{
  "recommendedSessions": [
    {
      "title": "",
      "startTime": "",
      "endTime": "",
      "reason": "",
    }
  ]
}
`,
});

const personalizedAgendaBuilderFlow = ai.defineFlow(
  {
    name: 'personalizedAgendaBuilderFlow',
    inputSchema: PersonalizedAgendaBuilderInputSchema,
    outputSchema: PersonalizedAgendaBuilderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
