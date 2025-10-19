'use client';

import { Suspense } from 'react';
import { ArchiveBrowser, ArchiveBrowserSkeleton } from '@/components/archive-browser';

export default function ArchivePage() {
  return (
    <div className="flex h-full flex-col">
      <header className="flex-shrink-0 border-b p-4 pt-24">
        <div className="container mx-auto flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold font-headline">Archive</h1>
            <p className="text-muted-foreground">
              Browse the public archive of documents on Norwegian philosophy.
            </p>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="container mx-auto">
          <Suspense fallback={<ArchiveBrowserSkeleton />}>
            <ArchiveBrowser isArchivePage={true} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
