'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, LayoutGrid, Clock } from 'lucide-react';
import Link from 'next/link';
import { documents } from '@/lib/data';
import { ArchiveBrowser } from '@/components/archive-browser';

const categoryCount = new Set(documents.map(doc => doc.category)).size;
const historicalPeriodsCount = 3; 

const stats = [
  { name: 'Articles', value: documents.length, icon: FileText },
  { name: 'Categories', value: categoryCount, icon: LayoutGrid },
  { name: 'Historical Periods', value: historicalPeriodsCount, icon: Clock },
];

const categories = [
  {
    title: 'Political Philosophy',
    description: 'The study of government and politics',
  },
  {
    title: 'Environmental Philosophy',
    description: 'The study of the natural world and our relationship to it.',
  },
  {
    title: 'Existentialism',
    description: 'The study of individual freedom, responsibility, and the meaning of life.',
  },
  {
    title: 'Metaphysics',
    description: 'The study of the fundamental nature of reality.',
  },
  {
    title: 'Aesthetics',
    description: 'The study of beauty and art',
  },
  {
    title: 'Ethics',
    description: 'The study of moral principles and values.',
  },
]

export default function Home() {
  return (
    <div className="flex h-full flex-col bg-background">
      <section className="flex items-center justify-center p-8 text-center pt-32 pb-24 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-8xl font-headline text-foreground mb-4">
            Norsk Filosofi Arkiv
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
             A sophisticated and modern digital encyclopedia dedicated to the rich history of Norwegian philosophy. Designed as an elegant and engaging platform for exploration and learning.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Button asChild size="lg">
              <Link href="/archive">
                Explore the Archive
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
      </section>

      <section className="py-16 sm:py-24">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-headline text-center mb-12">Explore by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Card key={category.title} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="font-headline text-xl">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-card/50">
        <div className="container mx-auto">
          <ArchiveBrowser />
        </div>
      </section>
    </div>
  );
}
