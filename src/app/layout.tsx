import type {Metadata} from 'next';
import {GeistSans as Geist} from 'next/font/google';
import './globals.css';
import {ThemeProvider} from '@/components/theme-provider';
import {Toaster} from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import CustomCursor from '@/components/custom-cursor';
import { cn } from '@/lib/utils';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});


export const metadata: Metadata = {
  title: 'Versafolio',
  description: 'A dynamic and modern portfolio website.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          "antialiased min-h-screen flex flex-col"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CustomCursor />
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8 pt-24"> {/* Add padding top to avoid overlap with sticky header */}
            {children}
          </main>
          {/* <Footer /> Optionally add a footer */}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
