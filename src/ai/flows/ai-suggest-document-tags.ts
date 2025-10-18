'use server';

/**
 * @fileOverview AI-powered document tag suggestion flow.
 *
 * - aiSuggestDocumentTags - A function that suggests relevant categories and tags for uploaded documents.
 * - AiSuggestDocumentTagsInput - The input type for the aiSuggestDocumentTags function.
 * - AiSuggestDocumentTagsOutput - The return type for the aiSuggestDocumentTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiSuggestDocumentTagsInputSchema = z.object({
  documentText: z.string().describe('The text content of the document.'),
});
export type AiSuggestDocumentTagsInput = z.infer<typeof AiSuggestDocumentTagsInputSchema>;

const AiSuggestDocumentTagsOutputSchema = z.object({
  suggestedCategories: z.array(z.string()).describe('Suggested categories for the document.'),
  suggestedTags: z.array(z.string()).describe('Suggested tags for the document.'),
});
export type AiSuggestDocumentTagsOutput = z.infer<typeof AiSuggestDocumentTagsOutputSchema>;

export async function aiSuggestDocumentTags(input: AiSuggestDocumentTagsInput): Promise<AiSuggestDocumentTagsOutput> {
  return aiSuggestDocumentTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSuggestDocumentTagsPrompt',
  input: {schema: AiSuggestDocumentTagsInputSchema},
  output: {schema: AiSuggestDocumentTagsOutputSchema},
  prompt: `You are an expert in document categorization and tagging.

  Based on the following document text, suggest relevant categories and tags.

  Document Text: {{{documentText}}}

  Please provide the suggested categories and tags in the following JSON format:
  {
    "suggestedCategories": ["category1", "category2", ...],
    "suggestedTags": ["tag1", "tag2", ...]
  }`,
});

const aiSuggestDocumentTagsFlow = ai.defineFlow(
  {
    name: 'aiSuggestDocumentTagsFlow',
    inputSchema: AiSuggestDocumentTagsInputSchema,
    outputSchema: AiSuggestDocumentTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
