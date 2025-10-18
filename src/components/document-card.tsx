import type { Document } from '@/lib/data';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';

type DocumentCardProps = {
  document: Document;
};

export function DocumentCard({ document }: DocumentCardProps) {
  return (
    <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:border-primary/50 bg-card">
      <Link href={`/documents/${document.id}`} className="flex flex-col flex-grow p-6">
        <CardHeader className="p-0 flex-row justify-between items-center mb-4">
          <Badge variant="secondary" className="w-fit">{document.category}</Badge>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Eye className="h-4 w-4" />
            <span>{document.views}</span>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-grow">
          <CardTitle className="font-headline text-2xl leading-snug mb-2">{document.title}</CardTitle>
          <CardDescription className="text-muted-foreground mb-4">{document.author}</CardDescription>
          <p className="text-sm text-foreground/80 line-clamp-3">{document.summary}</p>
        </CardContent>
        <CardFooter className="p-0 mt-4">
          <div className="flex flex-wrap gap-2">
            {document.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}