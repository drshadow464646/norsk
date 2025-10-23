import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AppHeader } from '@/components/layout/app-header';

const siteUrl = 'https://yourdomain.com'; // Replace with your actual domain

export const metadata: Metadata = {
  title: {
    default: 'Norsk Filosofi Arkiv',
    template: '%s | Norsk Filosofi Arkiv',
  },
  description: 'An open archive on the Norwegian history of philosophy. Explore articles, thinkers, and movements from medieval times to the present day.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'Norsk Filosofi Arkiv',
    description: 'A comprehensive encyclopedia of Norwegian philosophy.',
    url: siteUrl,
    siteName: 'Norsk Filosofi Arkiv',
    images: [
      {
        url: '/og-image.png', // You would need to create this image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Norsk Filosofi Arkiv',
    description: 'A comprehensive encyclopedia of Norwegian philosophy.',
     // You would need to create this image
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <div className="flex flex-col min-h-screen">
          <AppHeader />
          <main className="flex-grow">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
