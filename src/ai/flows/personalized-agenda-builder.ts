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
    .describe("A list of the attendee's interests."),
  goals: z.string().describe("The attendee's goals for the event."),
  availability: z
    .array(z.object({
      startTime: z.string().describe('The start time of the available slot (ISO format).'),
      endTime: z.string().describe('The end time of the available slot (ISO format).'),
    }))
    .describe("A list of the attendee's available time slots."),
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
    .array(
      z.object({
        title: z.string().describe('The title of the recommended session.'),
        startTime: z
          .string()
          .describe('The start time of the session (ISO format).'),
        endTime: z
          .string()
          .describe('The end time of the session (ISO format).'),
        reason: z
          .string()
          .describe('The reason why this session was recommended.'),
      })
    )
    .describe(
      "A conflict-free list of recommended sessions that fit the attendee's interests, goals, and availability."
    ),
  conflicts: z
    .array(
      z.object({
        conflictingSession: z.object({
          title: z.string(),
          startTime: z.string(),
          endTime: z.string(),
        }),
        chosenSession: z.object({
          title: z.string(),
          startTime: z.string(),
          endTime: z.string(),
        }),
        alternativeSuggestions: z
          .array(
            z.object({
              title: z
                .string()
                .describe('The title of an alternative session.'),
              startTime: z
                .string()
                .describe('The start time of the alternative session.'),
              endTime: z
                .string()
                .describe('The end time of the alternative session.'),
              reason: z
                .string()
                .describe('The reason why this alternative is suggested.'),
            })
          )
          .describe(
            "Alternative sessions that don't conflict with the chosen one."
          ),
      })
    )
    .describe(
      "A list of scheduling conflicts that were identified and resolved, including alternative suggestions for the sessions that weren't chosen."
    )
    .optional(),
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
Your primary task is to create a conflict-free list of recommended sessions that best align with the attendee's profile.

If you identify a scheduling conflict between two or more relevant sessions, you must:
1.  Choose the session that is the absolute best fit for the attendee's interests and goals to include in the main \`recommendedSessions\` list.
2.  Document the conflict in the \`conflicts\` array.
3.  For the session that was *not* chosen, suggest one or two alternative sessions that do not conflict with the final schedule. Provide a brief reason for each alternative.

Attendee Interests: {{interests}}
Attendee Goals: {{goals}}

Attendee Availability:
{{#each availability}}
- Start: {{startTime}}, End: {{endTime}}
{{/each}}

Available Sessions:
{{#each sessions}}
- Title: {{title}}
  Description: {{{description}}}
  Time: {{startTime}} - {{endTime}}
  Tags: {{tags}}
{{/each}}

Output a conflict-free schedule and a list of any conflicts you resolved with alternative suggestions.
`,
});

const personalizedAgendaBuilderFlow = ai.defineFlow(
  {
    name: 'personalizedAgendaBuilderFlow',
    inputSchema: PersonalizedAgendaBuilderInputSchema,
    outputSchema: PersonalizedAgendaBuilderOutputSchema,
  },
  async input => {
    console.log('personalizedAgendaBuilderFlow input:', JSON.stringify(input, null, 2));
    const {output} = await prompt(input);
    console.log('personalizedAgendaBuilderFlow output:', JSON.stringify(output, null, 2));
    return output!;
  }
);
