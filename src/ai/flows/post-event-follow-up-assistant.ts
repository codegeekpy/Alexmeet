'use server';
/**
 * @fileOverview Generates summaries of people met at the event and drafts personalized follow-up emails.
 *
 * - postEventFollowUp - A function that handles the post-event follow-up process.
 * - PostEventFollowUpInput - The input type for the postEventFollowUp function.
 * - PostEventFollowUpOutput - The return type for the postEventFollowUp function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PostEventFollowUpInputSchema = z.object({
  attendeeName: z.string().describe('The name of the attendee.'),
  eventSummary: z.string().describe('Summary of the event attended.'),
  peopleMet: z.array(
    z.object({
      name: z.string().describe('The name of the person met.'),
      company: z.string().describe('The company the person works for.'),
      avatar: z.string().optional(),
      sharedInterests: z.string().describe('Shared interests with the attendee.'),
      conversationSummary: z.string().describe('A summary of the conversation with the person.'),
    })
  ).describe('Array of people the attendee met at the event.'),
});
export type PostEventFollowUpInput = z.infer<typeof PostEventFollowUpInputSchema>;

const PostEventFollowUpOutputSchema = z.object({
  followUpEmails: z.array(
    z.object({
      recipientName: z.string().describe('The name of the recipient.'),
      subject: z.string().describe('The subject of the follow-up email.'),
      body: z.string().describe('The body of the follow-up email.'),
    })
  ).describe('Array of follow-up emails to send.'),
});
export type PostEventFollowUpOutput = z.infer<typeof PostEventFollowUpOutputSchema>;

export async function postEventFollowUp(input: PostEventFollowUpInput): Promise<PostEventFollowUpOutput> {
  return postEventFollowUpFlow(input);
}

const prompt = ai.definePrompt({
  name: 'postEventFollowUpPrompt',
  input: {schema: PostEventFollowUpInputSchema},
  output: {schema: PostEventFollowUpOutputSchema},
  prompt: `You are an AI assistant helping attendees draft personalized follow-up emails after an event.

  The attendee's name is: {{{attendeeName}}}.
  The event summary is: {{{eventSummary}}}.

  Here is a list of people the attendee met at the event, along with summaries of their conversations and shared interests:
  {{#each peopleMet}}
  Name: {{{name}}}
  Company: {{{company}}}
  Shared Interests: {{{sharedInterests}}}
  Conversation Summary: {{{conversationSummary}}}

  {{/each}}

  Based on this information, draft personalized follow-up emails for each person the attendee met.  The emails should be concise and professional, referencing the conversation and shared interests. The output should be an array of follow-up emails, including the recipient's name, subject, and body.
  `,
});

const postEventFollowUpFlow = ai.defineFlow(
  {
    name: 'postEventFollowUpFlow',
    inputSchema: PostEventFollowUpInputSchema,
    outputSchema: PostEventFollowUpOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
