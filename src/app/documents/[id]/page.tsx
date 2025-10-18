import { documents } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, BookText } from 'lucide-react';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';

export default function DocumentPage({ params }: { params: { id: string } }) {
  const document = documents.find((doc) => doc.id === params.id);

  if (!document) {
    notFound();
  }

  return (
    <div className="h-full overflow-auto">
      <article className="max-w-4xl mx-auto p-4 md:p-8">
        <header className="mb-8">
          <Badge variant="outline" className="mb-4 text-sm font-semibold" style={{borderColor: 'hsl(var(--accent))', color: 'hsl(var(--accent))'}}>{document.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold font-headline mb-3">{document.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>Published on {format(new Date(document.publishDate), 'MMMM d, yyyy')}</span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {document.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </header>

        <Separator className="my-8" />

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold font-headline mb-4 flex items-center gap-3">
              <BookText className="text-primary" />
              Summary
            </h2>
            <p className="text-lg leading-relaxed text-foreground/80">
              {document.summary}
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold font-headline mb-4 flex items-center gap-3">
              <BookText className="text-primary" />
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
    </div>
  );
}

export async function generateStaticParams() {
  return documents.map((doc) => ({
    id: doc.id,
  }));
}
