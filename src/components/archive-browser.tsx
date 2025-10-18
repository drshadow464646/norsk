'use client';

import { useState, useEffect } from 'react';
import { DocumentCard } from '@/components/document-card';
import { documents } from '@/lib/data';
import type { Document } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export function ArchiveBrowser() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const allCategories = ['All', ...Array.from(new Set(documents.map((doc) => doc.category)))];
  
  if (!isClient) {
    return <ArchiveBrowserSkeleton />;
  }

  return (
    <>
      <div className="mb-4 flex flex-col gap-4 sm:flex-row">
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
            <Button asChild>
              <Link href="/upload">Upload a Document</Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export function ArchiveBrowserSkeleton() {
    return (
      <>
        <div className="mb-4 flex flex-col gap-4 sm:flex-row">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-full sm:w-[200px]" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-4 w-2/4" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-20 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-6 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }