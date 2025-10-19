import type { Document } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';

type DocumentCardProps = {
  document: Document;
  onClick: () => void;
};

export function DocumentCard({ document, onClick }: DocumentCardProps) {
  return (
    <Card 
      className="h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:border-primary/50 bg-card/80 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col flex-grow p-6">
        <CardHeader className="p-0 mb-4 flex-row items-center justify-between space-y-0 text-muted-foreground text-sm">
          <Badge variant="secondary" className="w-fit">{document.category}</Badge>
          <div className="flex items-center gap-1.5">
            <Eye className="size-4" />
            <span>{document.views}</span>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-grow space-y-3">
          <CardTitle className="font-headline text-xl leading-snug">{document.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{document.author}</p>
          <p className="text-sm text-foreground/80 line-clamp-2">{document.summary}</p>
        </CardContent>
        <CardFooter className="p-0 pt-4 mt-auto">
          <div className="flex flex-wrap gap-2">
            {document.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
