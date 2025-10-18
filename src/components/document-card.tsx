import type { Document } from '@/lib/data';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays } from 'lucide-react';
import { format } from 'date-fns';

type DocumentCardProps = {
  document: Document;
};

export function DocumentCard({ document }: DocumentCardProps) {
  return (
    <Link href={`/documents/${document.id}`} className="block h-full">
      <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:border-primary/50 bg-card">
        <CardHeader>
          <Badge variant="outline" className="w-fit mb-2">{document.category}</Badge>
          <CardTitle className="font-headline text-lg leading-snug">{document.title}</CardTitle>
          <CardDescription className="flex items-center gap-2 pt-2 text-xs">
            <CalendarDays className="h-4 w-4" />
            <span>{format(new Date(document.publishDate), 'MMMM d, yyyy')}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-4">{document.summary}</p>
        </CardContent>
        <CardFooter>
          <div className="flex flex-wrap gap-2">
            {document.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
