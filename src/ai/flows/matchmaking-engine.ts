
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
    title: z.string(),
    company: z.string(),
    interests: z.array(z.string()),
    personalityTraits: z.array(z.string()),
    avatar: z.string().optional(),
  })).describe('A list of other attendees profiles, including their interests and personality traits.')
});
export type MatchmakingEngineInput = z.infer<typeof MatchmakingEngineInputSchema>;

const MatchmakingEngineOutputSchema = z.array(z.object({
  attendeeName: z.string().describe('The name of the suggested attendee to meet.'),
  title: z.string().describe("The matched attendee's job title."),
  company: z.string().describe("The matched attendee's company."),
  interests: z.array(z.string()).describe("The matched attendee's interests."),
  avatar: z.string().optional().describe("URL for the attendee's avatar image."),
  matchReason: z.string().describe('A concise, one-sentence explanation justifying why this attendee is a good match.'),
  matchPercentage: z.number().min(0).max(100).describe('A score from 0 to 100 representing the strength of the match.')
}));
export type MatchmakingEngineOutput = z.infer<typeof MatchmakingEngineOutputSchema>;

export async function generateMatch(input: MatchmakingEngineInput): Promise<MatchmakingEngineOutput> {
  return matchmakingEngineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'matchmakingEnginePrompt',
  input: {schema: MatchmakingEngineInputSchema},
  output: {schema: MatchmakingEngineOutputSchema},
  prompt: `You are an expert AI matchmaker for a professional conference. Your goal is to connect attendees for high-value networking opportunities.

You will be given the profile of the user and a list of other attendees. For each attendee in the list, you must decide if they are a good match for the user.

**User's Profile:**
- Interests: {{attendeeInterests}}
- Personality Traits: {{attendeePersonalityTraits}}

**Other Attendee Profiles:**
{{#each otherAttendeeProfiles}}
- Name: {{name}}
  - Title: {{title}}
  - Company: {{company}}
  - Interests: {{interests}}
  - Personality Traits: {{personalityTraits}}
  - Avatar: {{avatar}}
{{/each}}

**Your Task:**
Based on the provided data, identify the top 3-5 most promising connections for the user.

For each match, you MUST return their full profile information (\`attendeeName\`, \`title\`, \`company\`, \`interests\`, \`avatar\`) along with the following calculated fields:

1.  **matchPercentage**: A score from 0 to 100 representing the strength of the match. Calculate this based on a weighted combination of:
    - **Shared Interests (60% weight):** The more interests in common, the higher the score.
    - **Complementary Traits (20% weight):** Consider how their personality traits might lead to a productive conversation (e.g., 'Analytical' and 'Creative').
    - **Potential for Synergy (20% weight):** Look at their roles and companies. Is there a potential for partnership, mentorship, or collaboration?
2.  **matchReason**: A concise, one-sentence explanation justifying the match. It should highlight the most compelling reason for the two individuals to connect (e.g., "You both share a deep interest in Generative AI and your complementary skills could lead to a great partnership.")

Return an array of the best matches you find. IMPORTANT: The 'matchPercentage' field must be a JSON number (e.g., 85), not a string like "85%" or a sentence.
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
