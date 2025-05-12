"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const FloatingActionButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show FAB after scrolling down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <Button
            asChild
            size="icon"
            className={cn(
              "rounded-full w-14 h-14 shadow-lg bg-green-600 hover:bg-[#33c4a9]", // removed glassmorphism if it causes issues
              "bg-green-600 dark:hover:bg-[#33c4a9]"
            )}
            aria-label="Contact Me"
            data-cursor-pointer // Add attribute for custom cursor interaction
          >
            <Link href="#contact">
              <MessageSquare className="w-6 h-6 text-white" />
            </Link>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingActionButton;
