import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { TermsDialog } from '@/components/terms-dialog'; // Import the TermsDialog
import { cn } from '@/lib/utils';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/yourusername', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/yourusername', icon: Linkedin },
  { name: 'Twitter', href: 'https://twitter.com/yourusername', icon: Twitter },
  { name: 'Email', href: 'mailto:your.email@example.com', icon: Mail },
];

export default function Footer() {
  return (
    <footer className={cn(
        "mt-auto py-8 border-t border-border/40",
        "bg-background/80 backdrop-blur-sm" // Subtle glassmorphism
        )}>
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-6">
          {socialLinks.map((link) => (
            <Button
              key={link.name}
              variant="ghost"
              size="icon"
              asChild
              className="text-foreground/70 hover:text-accent hover:bg-accent/10 transition-colors rounded-full"
              data-cursor-pointer
            >
              <Link href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                <link.icon className="h-5 w-5" />
              </Link>
            </Button>
          ))}
        </div>
        <Separator className="w-1/4 mx-auto mb-6 bg-border/60" />
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} Your Name. All rights reserved.</span>
          <span className="hidden sm:inline">|</span>
           <TermsDialog /> {/* Integrate TermsDialog */}
          <span className="hidden sm:inline">|</span>
          <Link href="#privacy" className="hover:text-accent transition-colors" data-cursor-pointer>Privacy Policy</Link> {/* Placeholder */}
        </div>
      </div>
    </footer>
  );
}
