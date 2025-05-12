"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false); // State to track if hovering over interactive element

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseOver = (e: MouseEvent) => {
      // Check if the target or its parent is interactive (links, buttons, etc.)
       if (
        (e.target instanceof Element && e.target.closest('a, button, input, textarea, [role="button"], [data-cursor-pointer]')) ||
        (e.target instanceof HTMLElement && window.getComputedStyle(e.target).cursor === 'pointer')
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };


    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);


    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);

      // Restore default cursor
      document.body.style.cursor = 'auto';
    };
  }, []);

  const cursorVariants = {
    default: {
      x: position.x - 10, // Center the cursor dot
      y: position.y - 10,
      scale: 1,
      opacity: isVisible ? 1 : 0,
      transition: { type: 'spring', stiffness: 500, damping: 30, mass: 0.5 },
      backgroundColor: "hsl(var(--accent))",
      mixBlendMode: 'difference',
    },
    pointer: {
       x: position.x - 15, // Center the larger pointer circle
       y: position.y - 15,
       scale: 1.5, // Scale up for pointer effect
       opacity: isVisible ? 0.6 : 0, // Slightly transparent
       transition: { type: 'spring', stiffness: 300, damping: 20, mass: 0.3 },
       backgroundColor: "hsl(var(--accent) / 0.5)", // More transparent accent
       mixBlendMode: 'normal', // Normal blend mode for pointer
    }
  };

  const outerVariants = {
     default: {
        x: position.x - 20, // Center the outer ring
        y: position.y - 20,
        scale: 1,
        opacity: isVisible ? 1 : 0,
        transition: { type: 'spring', stiffness: 100, damping: 20, mass: 1 },
     },
     pointer: {
       x: position.x - 25, // Center the slightly larger outer ring
       y: position.y - 25,
       scale: 1.2,
       opacity: isVisible ? 0.3 : 0, // More transparent
       transition: { type: 'spring', stiffness: 150, damping: 25, mass: 0.8 },
     }
  }


  return (
    <>
      {/* Outer Ring (Glassmorphic) */}
      <motion.div
        className={cn(
          "fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999]",
          "border border-accent/30 backdrop-blur-xs" // Glass effect for outer ring
        )}
         variants={outerVariants}
         animate={isPointer ? 'pointer' : 'default'}
         style={{ mixBlendMode: 'normal' }} // Keep outer ring normal blend
      />
       {/* Inner Dot */}
      <motion.div
        className={cn(
          "fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[9999]",
          "bg-accent"
        )}
        variants={cursorVariants}
        animate={isPointer ? 'pointer' : 'default'}
      />
    </>
  );
};

export default CustomCursor;
