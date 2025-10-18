'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Plus, FileText, LayoutGrid, Clock } from 'lucide-react';
import Link from 'next/link';
import { documents } from '@/lib/data';

const categoryCount = new Set(documents.map(doc => doc.category)).size;
// A placeholder for historical periods since it's not in the data model.
const historicalPeriodsCount = 3; 

const stats = [
  { name: 'Articles', value: documents.length, icon: FileText },
  { name: 'Categories', value: categoryCount, icon: LayoutGrid },
  { name: 'Historical Periods', value: historicalPeriodsCount, icon: Clock },
];

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center bg-background">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-headline text-foreground mb-4">
          Norsk Filosofi
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          A comprehensive archive of Norwegian philosophy – from 19th-century romanticism to modern existentialism, from ethical dilemmas to political theory.
        </p>
        <div className="flex justify-center gap-4 mb-16">
          <Button asChild size="lg">
            <Link href="/archive">
              <BookOpen className="mr-2" />
              Explore Articles
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/upload">
              <Plus className="mr-2" />
              Contribute
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <Card key={stat.name} className="bg-card/80 border-border/60 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <p className="text-4xl font-bold text-accent mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
