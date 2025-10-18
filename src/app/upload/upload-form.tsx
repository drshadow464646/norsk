'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState, useTransition } from 'react';
import { WandSparkles, Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getAISuggestions, createDocument } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const FormSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  content: z.string().min(50, { message: 'Content must be at least 50 characters.' }).max(10000, { message: 'Content is too long.' }),
  publishDate: z.date({ required_error: 'A publication date is required.' }),
  summary: z.string().min(10, { message: 'Summary must be at least 10 characters.' }),
  category: z.string().min(3, { message: 'Category must be at least 3 characters.' }),
  tags: z.string().min(3, { message: 'Please provide at least one tag.' }),
});

type FormValues = z.infer<typeof FormSchema>;

export function UploadForm() {
  const [isAiLoading, setAiLoading] = useState(false);
  const [isSubmitting, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      content: '',
      summary: '',
      category: '',
      tags: '',
    },
  });

  const handleGenerateAI = async () => {
    const content = form.getValues('content');
    if (content.length < 50) {
      form.setError('content', { message: 'Please provide more content to generate suggestions.' });
      return;
    }
    setAiLoading(true);
    const result = await getAISuggestions(content);
    setAiLoading(false);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'AI Error',
        description: result.error,
      });
    } else {
      if (result.summary) form.setValue('summary', result.summary, { shouldValidate: true });
      if (result.category) form.setValue('category', result.category, { shouldValidate: true });
      if (result.tags) form.setValue('tags', result.tags, { shouldValidate: true });
      toast({
        title: 'AI Suggestions Generated',
        description: 'Summary, category, and tags have been filled in.',
      });
    }
  };

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('publishDate', data.publishDate.toISOString().split('T')[0]); // YYYY-MM-DD
    formData.append('summary', data.summary);
    formData.append('category', data.category);
    formData.append('tags', data.tags);

    startTransition(async () => {
      try {
        await createDocument(formData);
        toast({
          title: 'Document Uploaded',
          description: 'Your document has been added to the archive.',
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Upload Failed',
          description: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Document Details</CardTitle>
            <CardDescription>Provide the basic information for the document.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., On the Tragic by Zapffe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publishDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Original Publication Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date('1800-01-01')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Document Content</CardTitle>
            <CardDescription>
              Paste the full text of the document here. This will be used by the AI to generate a summary and tags.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="The post-World War II era in Norway saw a surge in existentialist thought..."
                      className="min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
            <div>
              <CardTitle>AI-Assisted Details</CardTitle>
              <CardDescription>
                Click the button to generate a summary, category, and tags based on the content above.
              </CardDescription>
            </div>
            <Button type="button" size="sm" onClick={handleGenerateAI} disabled={isAiLoading} className="shrink-0">
              {isAiLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <WandSparkles className="mr-2 h-4 w-4" />}
              Generate
            </Button>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea placeholder="AI-generated summary will appear here." {...field} className="min-h-[100px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl><Input placeholder="AI-suggested category" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags (comma-separated)</FormLabel>
                    <FormControl><Input placeholder="e.g., tag1, tag2, tag3" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit to Archive
        </Button>
      </form>
    </Form>
  );
}
