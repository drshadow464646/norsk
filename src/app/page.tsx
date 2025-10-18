import { DocumentCard } from '@/components/document-card';
import { documents } from '@/lib/data';
import type { Document } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  const allCategories = ['All', ...Array.from(new Set(documents.map((doc) => doc.category)))];

  return (
    <div className="flex h-full flex-col">
      <header className="flex-shrink-0 border-b p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-headline">Archive</h1>
            <p className="text-muted-foreground">
              Browse the public archive of documents on Norwegian philosophy.
            </p>
          </div>
          <Link href="/upload" asChild>
            <Button>Upload Document</Button>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search documents..." className="pl-9" />
          </div>
          <Select>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {allCategories.map((category) => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-4 md:p-6">
        {documents.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {documents.map((doc: Document) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed bg-card/50 p-12">
            <div className="text-center">
              <h2 className="text-xl font-semibold">No Documents Found</h2>
              <p className="text-muted-foreground mt-2 mb-4">
                Start by uploading a document to the archive.
              </p>
              <Link href="/upload" asChild>
                <Button>Upload a Document</Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
