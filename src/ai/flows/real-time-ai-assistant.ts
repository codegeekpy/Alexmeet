// src/ai/flows/real-time-ai-assistant.ts
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

const GetNextActionInputSchema = z.object({
  query: z.string().describe('The user query for what to do next.'),
});
export type GetNextActionInput = z.infer<typeof GetNextActionInputSchema>;

const GetNextActionOutputSchema = z.object({
  suggestion: z.string().describe('The AI-generated suggestion for the next action.'),
});
export type GetNextActionOutput = z.infer<typeof GetNextActionOutputSchema>;

export async function getNextAction(input: GetNextActionInput): Promise<GetNextActionOutput> {
  return getNextActionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getNextActionPrompt',
  input: {schema: GetNextActionInputSchema},
  output: {schema: GetNextActionOutputSchema},
  prompt: `You are an AI assistant at a conference. A user has asked you what they should do next. Consider suggesting nearby booths, live trending talks, and people to meet.

  User query: {{{query}}}

  What is your suggestion for what the user should do next?`,
});

const getNextActionFlow = ai.defineFlow(
  {
    name: 'getNextActionFlow',
    inputSchema: GetNextActionInputSchema,
    outputSchema: GetNextActionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
