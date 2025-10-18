'use client';

import { Suspense } from 'react';
import { ArchiveBrowser, ArchiveBrowserSkeleton } from '@/components/archive-browser';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
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
          <Button asChild>
            <Link href="/upload">Upload Document</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <Suspense fallback={<ArchiveBrowserSkeleton />}>
          <ArchiveBrowser />
        </Suspense>
      </main>
    </div>
  );
}