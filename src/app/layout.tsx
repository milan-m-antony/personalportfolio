import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import {ThemeProvider} from '@/components/theme-provider';
import {Toaster} from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer'; // Import Footer
import CustomCursor from '@/components/custom-cursor';
import { cn } from '@/lib/utils';

// Initialize Inter font
const inter = Inter({
  variable: '--font-inter',
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
          inter.variable,
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
          <Footer /> {/* Add Footer component */}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
