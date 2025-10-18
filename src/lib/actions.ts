'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { summarizeDocument } from '@/ai/flows/ai-summarize-document';
import { aiSuggestDocumentTags } from '@/ai/flows/ai-suggest-document-tags';
import { addDocument } from '@/lib/data';

const MAX_TEXT_LENGTH = 10000;

const AIProcessingSchema = z.object({
  documentText: z.string().min(50, 'Document text is too short.').max(MAX_TEXT_LENGTH, `Document text must be under ${MAX_TEXT_LENGTH} characters.`),
});

export type AISuggestions = {
  summary?: string;
  category?: string;
  tags?: string;
  error?: string;
};

export async function getAISuggestions(documentText: string): Promise<AISuggestions> {
  const validatedFields = AIProcessingSchema.safeParse({ documentText });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.documentText?.[0] || 'Invalid document text.',
    };
  }
  
  try {
    const [summaryResult, tagsResult] = await Promise.all([
      summarizeDocument({ documentContent: validatedFields.data.documentText }),
      aiSuggestDocumentTags({ documentText: validatedFields.data.documentText }),
    ]);

    return {
      summary: summaryResult.summary,
      category: tagsResult.suggestedCategories[0] || '',
      tags: tagsResult.suggestedTags.join(', '),
    };
  } catch (error) {
    console.error('AI processing failed:', error);
    return { error: 'Failed to process document with AI. Please try again.' };
  }
}

const DocumentFormSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.'}),
  content: z.string().min(50, { message: 'Content must be at least 50 characters.'}),
  publishDate: z.string().min(1, { message: 'Publish date is required.'}),
  summary: z.string().min(10, { message: 'Summary is required.'}),
  category: z.string().min(3, { message: 'Category is required.'}),
  tags: z.string().min(3, { message: 'At least one tag is required.'}),
});

export async function createDocument(formData: FormData) {
  const validatedFields = DocumentFormSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    publishDate: formData.get('publishDate'),
    summary: formData.get('summary'),
    category: formData.get('category'),
    tags: formData.get('tags'),
  });

  if (!validatedFields.success) {
    // This should be caught by client-side validation, but provides a server-side check.
    throw new Error('Invalid form data provided.');
  }

  const { title, content, publishDate, summary, category, tags } = validatedFields.data;

  try {
    addDocument({
      title,
      content,
      publishDate,
      summary,
      category,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to save document to the database.');
  }

  revalidatePath('/');
  redirect('/');
}
