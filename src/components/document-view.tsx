'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { Document } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DocumentViewProps {
  document: Document;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DocumentView({ document, open, onOpenChange }: DocumentViewProps) {
  const publicationYear = new Date(document.publishDate).getFullYear();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-full max-h-[90svh] flex flex-col p-0">
        <ScrollArea className="flex-1 min-h-0">
          <article className="px-8 py-12 md:px-12 md:py-16">
            <div className="space-y-12">
              <header className="text-center">
                <DialogTitle asChild>
                  <h1 className="text-4xl md:text-5xl font-headline mb-3">{document.title}</h1>
                </DialogTitle>
                <DialogDescription asChild>
                  <div className="text-muted-foreground text-sm">
                    <span>By {document.author}</span>
                    <span className="mx-2">•</span>
                    <span>{publicationYear}</span>
                    <span className="mx-2">•</span>
                    <span>{document.category}</span>
                  </div>
                </DialogDescription>
                <div className="flex flex-wrap gap-2 justify-center mt-6">
                  {document.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </header>

              <section>
                <h2 className="text-lg font-semibold font-headline mb-3 text-center text-muted-foreground tracking-widest uppercase">
                  Summary
                </h2>
                <p className="text-lg leading-relaxed text-foreground/80 text-left max-w-2xl mx-auto">
                  {document.summary}
                </p>
              </section>
              
              <section>
                <h2 className="text-lg font-semibold font-headline mb-4 text-center text-muted-foreground tracking-widest uppercase">
                  Full Text
                </h2>
                <div className="text-base leading-relaxed space-y-4 text-foreground/90 prose max-w-none">
                  {document.content.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold font-headline mb-3 text-center text-muted-foreground tracking-widest uppercase">
                  Source
                </h2>
                <div className="text-center">
                  <Button variant="outline" size="sm" asChild className="bg-transparent border-input hover:bg-card/50">
                    <a href={document.wikipediaUrl} target="_blank" rel="noopener noreferrer">
                      Read More on Wikipedia
                      <ArrowUpRight className="ml-2 size-3.5" />
                    </a>
                  </Button>
                </div>
              </section>
            </div>
          </article>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
