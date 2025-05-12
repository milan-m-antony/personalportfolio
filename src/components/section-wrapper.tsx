"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type React from 'react';

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  title?: string; // Optional title for the section
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, children, className, title }) => {
  return (
    <motion.section
      id={id}
      className={cn("py-16 md:py-20 scroll-mt-20", className)} // Added scroll-mt to offset sticky header
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% is visible
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {title && (
         <motion.h2
            className="text-3xl md:text-4xl font-bold mb-10 md:mb-12 text-center text-primary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {title}
        </motion.h2>
      )}
      {children}
    </motion.section>
  );
};

export default SectionWrapper;
