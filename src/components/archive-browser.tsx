'use client';

import { useState, useEffect, useMemo } from 'react';
import { DocumentCard } from '@/components/document-card';
import { documents } from '@/lib/data';
import type { Document } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { DocumentView } from '@/components/document-view';

type SortOption = 'most-viewed' | 'most-recent';

export function ArchiveBrowser({ isArchivePage = false, initialCategory = '' }: { isArchivePage?: boolean, initialCategory?: string }) {
  const [isClient, setIsClient] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All Topics');
  const [sortOrder, setSortOrder] = useState<SortOption>('most-viewed');

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    setSelectedCategory(initialCategory || 'All Topics');
  }, [initialCategory]);


  const handleCardClick = (doc: Document) => {
    setSelectedDocument(doc);
  };

  const handleModalClose = () => {
    setSelectedDocument(null);
  };

  const allCategories = ['All Topics', ...Array.from(new Set(documents.map((doc) => doc.category)))];

  const filteredAndSortedDocuments = useMemo(() => {
    let filtered = documents;

    // Filter by category
    if (selectedCategory !== 'All Topics') {
      filtered = filtered.filter(doc => doc.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(lowerCaseQuery) ||
        doc.author.toLowerCase().includes(lowerCaseQuery) ||
        doc.summary.toLowerCase().includes(lowerCaseQuery) ||
        doc.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
      );
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === 'most-recent') {
        return b.createdAt - a.createdAt;
      }
      // Default to most-viewed
      return b.views - a.views;
    });

    return sorted;
  }, [selectedCategory, searchQuery, sortOrder]);


  const displayedDocuments = isArchivePage ? filteredAndSortedDocuments : filteredAndSortedDocuments.slice(0, 3);
  const title = isArchivePage ? 'All Articles' : 'Featured Articles';

  if (!isClient) {
    return <ArchiveBrowserSkeleton />;
  }

  return (
    <>
      <div className="mb-12 space-y-6">
        <h2 className="text-3xl md:text-4xl font-headline text-center">{title}</h2>
        <div className="mx-auto max-w-4xl p-4 rounded-lg bg-card/50 shadow-sm border border-border/60">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by keyword, title, author..." 
                className="pl-9 bg-background/50 h-11" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[180px] bg-background/50 h-11">
                  <SelectValue placeholder="All Topics" />
                </SelectTrigger>
                <SelectContent>
                  {allCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as SortOption)}>
                <SelectTrigger className="w-full md:w-[180px] bg-background/50 h-11">
                  <SelectValue placeholder="Most Viewed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="most-viewed">Most Viewed</SelectItem>
                  <SelectItem value="most-recent">Most Recent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {displayedDocuments.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedDocuments.map((doc: Document) => (
            <DocumentCard key={doc.id} document={doc} onClick={() => handleCardClick(doc)} />
          ))}
        </div>
      ) : (
        <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed bg-card/50 p-12 text-center">
          <div>
            <h2 className="text-xl font-semibold">No Documents Found</h2>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
          </div>
        </div>
      )}

      {selectedDocument && (
        <DocumentView
          document={selectedDocument}
          open={!!selectedDocument}
          onOpenChange={handleModalClose}
        />
      )}
    </>
  );
}

export function ArchiveBrowserSkeleton() {
    return (
      <>
        <div className="mb-12 space-y-6">
          <Skeleton className="h-10 w-1/3 mx-auto" />
          <div className="mx-auto max-w-4xl p-4 rounded-lg bg-card/50">
            <div className="flex flex-col md:flex-row gap-4">
              <Skeleton className="h-11 flex-1" />
              <div className="flex gap-4">
                <Skeleton className="h-11 w-full md:w-[180px]" />
                <Skeleton className="h-11 w-full md:w-[180px]" />
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4 rounded-lg border p-6">
              <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-1/4" />
                <Skeleton className="h-5 w-1/6" />
              </div>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-16 w-full" />
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-6 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
