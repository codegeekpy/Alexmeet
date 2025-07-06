'use server';

/**
 * @fileOverview A matchmaking AI agent that suggests attendees to meet based on shared interests and personality traits.
 *
 * - generateMatch - A function that handles the matchmaking process.
 * - MatchmakingEngineInput - The input type for the generateMatch function.
 * - MatchmakingEngineOutput - The return type for the generateMatch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MatchmakingEngineInputSchema = z.object({
  attendeeInterests: z
    .array(z.string())
    .describe('A list of the attendee interests.'),
  attendeePersonalityTraits: z
    .array(z.string())
    .describe('A list of the attendee personality traits.'),
  otherAttendeeProfiles: z.array(z.object({
    name: z.string(),
    interests: z.array(z.string()),
    personalityTraits: z.array(z.string())
  })).describe('A list of other attendees profiles, including their interests and personality traits.')
});
export type MatchmakingEngineInput = z.infer<typeof MatchmakingEngineInputSchema>;

const MatchmakingEngineOutputSchema = z.array(z.object({
  attendeeName: z.string().describe('The name of the suggested attendee to meet.'),
  matchReason: z.string().describe('The explanation of why this attendee is a good match.'),
  matchPercentage: z.number().describe('The percentage of how well the attendee matches the user. Should be between 0 and 100.')
}));
export type MatchmakingEngineOutput = z.infer<typeof MatchmakingEngineOutputSchema>;

export async function generateMatch(input: MatchmakingEngineInput): Promise<MatchmakingEngineOutput> {
  return matchmakingEngineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'matchmakingEnginePrompt',
  input: {schema: MatchmakingEngineInputSchema},
  output: {schema: MatchmakingEngineOutputSchema},
  prompt: `You are an AI matchmaker for a conference. Given an attendee's interests and personality traits, and a list of other attendee profiles, suggest other attendees the person should meet and explain why.

Attendee Interests: {{attendeeInterests}}
Attendee Personality Traits: {{attendeePersonalityTraits}}

Other Attendee Profiles:
{{#each otherAttendeeProfiles}}
  - Name: {{name}}
    Interests: {{interests}}
    Personality Traits: {{personalityTraits}}
{{/each}}

Suggest attendees to meet, explain why they are a good match, and provide a match percentage.
`,
});

const matchmakingEngineFlow = ai.defineFlow(
  {
    name: 'matchmakingEngineFlow',
    inputSchema: MatchmakingEngineInputSchema,
    outputSchema: MatchmakingEngineOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
