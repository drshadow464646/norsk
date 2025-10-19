'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function AppHeader() {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 p-4 bg-transparent">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-foreground hover:text-accent transition-colors">
          <span className="text-xl font-headline font-semibold">
            Norsk Filosofi Arkiv
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/archive">Archive</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
