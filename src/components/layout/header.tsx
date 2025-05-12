"use client";

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Menu, X, Home, User, CodeXml, Briefcase, Award, Star, Milestone, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
  { name: 'About', href: '#about', icon: User },
  { name: 'Projects', href: '#projects', icon: CodeXml },
  { name: 'Skills', href: '#skills', icon: Star },
  { name: 'Resume', href: '#resume', icon: Briefcase },
  { name: 'Certifications', href: '#certifications', icon: Award },
  { name: 'Achievements', href: '#achievements', icon: Award }, // Reusing Award, could use Trophy if distinct needed
  { name: 'Timeline', href: '#timeline', icon: Milestone },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    setIsMounted(true); // Component is mounted

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    // Prevent scrolling when mobile menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = ''; // Clean up on unmount
    };
  }, [isOpen]);


  // Variants for the mobile menu container
    const menuVariants = {
      hidden: { opacity: 0, y: -50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 120, damping: 20, staggerChildren: 0.05 },
      },
      exit: { opacity: 0, y: -50, transition: { duration: 0.2 } },
    };

  // Variants for individual menu items
   const menuItemVariants = {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } },
       exit: { opacity: 0, x: -20 },
    };


   // Variants for the hamburger/close icon animation
   const iconVariants = {
       closed: { rotate: 0, scale: 1 },
       open: { rotate: 180, scale: 1.1 },
   };


  if (!isMounted) {
    // Render nothing or a placeholder on the server/before hydration
    // to avoid potential hydration mismatches with window/scroll logic
    return (
       <header
         className={cn(
           "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
           "glassmorphism rounded-b-lg mx-auto max-w-6xl mt-2 h-16" // Keep consistent height
         )}
        />
    );
  }


  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 50, delay: 0.2 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          "glassmorphism rounded-b-lg mx-auto max-w-6xl mt-2",
          isScrolled ? 'shadow-lg' : 'shadow-none'
        )}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-foreground hover:text-accent transition-colors" onClick={() => setIsOpen(false)}>
            <Code className="w-6 h-6 text-accent" />
            <span>Versafolio</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <Button key={item.name} variant="ghost" asChild size="sm" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors px-2 lg:px-3">
                <Link href={item.href}>
                  {item.name}
                </Link>
              </Button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
             {/* Theme Toggle remains visible */}
            <ThemeToggle />

             {/* Mobile Menu Trigger */}
             <motion.div className="md:hidden">
                 <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                    className="relative z-50 w-8 h-8" // Ensure button is above overlay
                 >
                     <AnimatePresence initial={false} mode="wait">
                        <motion.div
                             key={isOpen ? 'x' : 'menu'}
                             variants={iconVariants}
                             initial="closed"
                             animate="open"
                             exit="closed"
                             transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </motion.div>
                     </AnimatePresence>
                 </Button>
             </motion.div>
          </div>
        </div>
      </motion.header>

       {/* Mobile Menu Overlay */}
       <AnimatePresence>
          {isOpen && (
            <motion.div
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={cn(
                   "fixed inset-0 z-40 h-screen w-screen pt-20 p-8 flex flex-col items-center justify-center space-y-6",
                   "bg-background/95 backdrop-blur-md md:hidden" // Only for mobile
                 )}
                // onClick={() => setIsOpen(false)} // Optional: Close on overlay click
              >
                {navItems.map((item) => (
                  <motion.div key={item.name} variants={menuItemVariants}>
                     <Button
                        variant="ghost"
                        asChild
                        className="text-xl font-medium text-foreground/90 hover:text-accent hover:bg-transparent w-full justify-center"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href={item.href} className="flex items-center gap-3 py-2">
                           <item.icon className="w-5 h-5 text-accent"/>
                           {item.name}
                         </Link>
                      </Button>
                  </motion.div>
                ))}
             </motion.div>
          )}
       </AnimatePresence>
    </>
  );
}
