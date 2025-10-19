'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { Document } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { BookText } from 'lucide-react';

interface DocumentViewProps {
  document: Document;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DocumentView({ document, open, onOpenChange }: DocumentViewProps) {
  const publicationYear = new Date(document.publishDate).getFullYear();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full p-8 md:p-12">
        <DialogHeader className="text-center mb-8">
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
        </DialogHeader>
        <article className="h-full overflow-auto -mt-8">
          <header className="mb-8 text-center">
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {document.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </header>

          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-semibold font-headline mb-4 flex items-center justify-center gap-3">
                Summary
              </h2>
              <p className="text-lg leading-relaxed text-foreground/80 text-center max-w-2xl mx-auto">
                {document.summary}
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold font-headline mb-4 flex items-center justify-center gap-3">
                Full Text
              </h2>
              <div className="text-base leading-relaxed space-y-4 text-foreground/90">
                {document.content.split('\\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          </div>
        </article>
      </DialogContent>
    </Dialog>
  );
}
