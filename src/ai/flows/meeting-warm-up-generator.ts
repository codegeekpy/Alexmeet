'use server';
/**
 * @fileOverview A pre-briefing generator for meetings between two event attendees.
 *
 * - generateMeetingWarmUp - Generates a "warm-up" with conversation starters and shared interests.
 * - MeetingWarmUpInput - The input type for the generateMeetingWarmUp function.
 * - MeetingWarmUpOutput - The return type for the generateMeetingWarmUp function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AttendeeProfileSchema = z.object({
    name: z.string().describe('The name of the attendee.'),
    title: z.string().describe('The job title of the attendee.'),
    company: z.string().describe('The company the attendee works for.'),
    interests: z.array(z.string()).describe("A list of the attendee's interests."),
    goals: z.string().optional().describe("The attendee's goals for the event."),
    avatar: z.string().optional(),
});

const MeetingWarmUpInputSchema = z.object({
  userProfile: AttendeeProfileSchema.describe('The profile of the user requesting the warm-up.'),
  matchProfile: AttendeeProfileSchema.describe('The profile of the person the user is meeting with.')
});
export type MeetingWarmUpInput = z.infer<typeof MeetingWarmUpInputSchema>;

const MeetingWarmUpOutputSchema = z.object({
  summary: z.string().describe('A brief summary of why this is a good connection.'),
  sharedInterests: z.array(z.string()).describe('A list of specific shared interests or background.'),
  conversationStarters: z.array(z.string()).describe('A list of potential conversation starters.'),
  keyQuestions: z.array(z.string()).describe('A list of key questions to ask the matched person.')
});
export type MeetingWarmUpOutput = z.infer<typeof MeetingWarmUpOutputSchema>;

export async function generateMeetingWarmUp(input: MeetingWarmUpInput): Promise<MeetingWarmUpOutput> {
  return meetingWarmUpFlow(input);
}

const prompt = ai.definePrompt({
  name: 'meetingWarmUpPrompt',
  input: {schema: MeetingWarmUpInputSchema},
  output: {schema: MeetingWarmUpOutputSchema},
  prompt: `You are an expert networking assistant. Your goal is to prepare an event attendee, {{{userProfile.name}}}, for a meeting with {{{matchProfile.name}}}.

Generate a concise pre-meeting briefing.

Here is the user's profile:
- Name: {{{userProfile.name}}}
- Title: {{{userProfile.title}}}
- Company: {{{userProfile.company}}}
- Interests: {{{userProfile.interests}}}
- Goals: {{{userProfile.goals}}}

Here is the profile of the person they are meeting:
- Name: {{{matchProfile.name}}}
- Title: {{{matchProfile.title}}}
- Company: {{{matchProfile.company}}}
- Interests: {{{matchProfile.interests}}}

Based on their profiles, generate a warm-up that includes:
1. A brief summary of why they are a good connection.
2. A list of their most significant shared interests or background points.
3. Three engaging conversation starters to break the ice.
4. Two insightful key questions for {{{userProfile.name}}} to ask {{{matchProfile.name}}} to facilitate a meaningful discussion.
`,
});

const meetingWarmUpFlow = ai.defineFlow(
  {
    name: 'meetingWarmUpFlow',
    inputSchema: MeetingWarmUpInputSchema,
    outputSchema: MeetingWarmUpOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
