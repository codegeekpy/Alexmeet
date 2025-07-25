import type { Metadata } from 'next';
import './globals.css';
import { LayoutProvider } from '@/components/layout-provider';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'AIxMeet – Your Personal Event AI Companion',
  description: 'Enhancing attendee experience at large-scale events like RAISE Summit using AI-first features.',
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Code+Pro&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <LayoutProvider>{children}</LayoutProvider>
        <Toaster />
      </body>
    </html>
  );
}
