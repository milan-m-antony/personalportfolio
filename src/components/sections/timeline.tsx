"use client";

import SectionWrapper from '@/components/section-wrapper';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Rocket, Flag } from 'lucide-react'; // Example icons
import React from 'react';

const timelineData = [
  {
    date: "Present",
    title: "Frontend Developer @ Tech Solutions Inc.",
    description: "Continuing to build innovative features, mentor junior developers, and lead frontend initiatives.",
    icon: Briefcase,
    iconBg: "bg-blue-500",
  },
   {
    date: "2023",
    title: "Launched Project Alpha",
    description: "Successfully developed and launched a major web application, receiving positive user feedback.",
    icon: Rocket,
    iconBg: "bg-purple-500",
  },
  {
    date: "2022",
    title: "Graduated University",
    description: "Completed B.S. in Computer Science with Magna Cum Laude honors.",
    icon: GraduationCap,
    iconBg: "bg-green-500",
  },
   {
    date: "2021",
    title: "Web Dev Internship",
    description: "Gained practical experience at Web Creations Co., contributing to real-world projects.",
    icon: Briefcase,
    iconBg: "bg-blue-500",
  },
  {
    date: "2018",
    title: "Started University Journey",
    description: "Began studies in Computer Science at the University of Example.",
    icon: Flag,
    iconBg: "bg-gray-500",
  },
];

const Timeline = () => {
  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const lineVariants = {
      hidden: { scaleY: 0 },
      visible: {
          scaleY: 1,
          transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
      }
  }

  return (
    <SectionWrapper id="timeline" title="My Journey">
      <div className="relative max-w-2xl mx-auto">
        {/* Vertical line */}
        <motion.div
            className="absolute left-5 md:left-1/2 top-0 bottom-0 w-1 -ml-[2px] bg-gradient-to-b from-transparent via-accent/50 to-transparent origin-top"
             variants={lineVariants}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
        />

        <div className="space-y-12">
          {timelineData.map((item, index) => {
             const Icon = item.icon || Briefcase;
             const isLeft = index % 2 === 0 && typeof window !== 'undefined' && window.innerWidth >= 768; // Alternate sides on larger screens

             return (
                <motion.div
                  key={index}
                  className={cn(
                    "relative flex items-start gap-4 md:gap-8",
                     isLeft ? "md:flex-row-reverse" : "md:flex-row"
                  )}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                 >
                  {/* Icon */}
                  <div className={cn(
                      "absolute left-5 md:left-1/2 top-0 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full z-10 shadow-md",
                      item.iconBg || "bg-accent"
                      )}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Content Card */}
                  <div className={cn(
                    "w-full md:w-[calc(50%-2rem)] p-4 rounded-lg ml-12 md:ml-0",
                    "glassmorphism border border-border/50",
                    isLeft ? "md:mr-[calc(50%+2rem)]" : "md:ml-[calc(50%+2rem)]" // Adjust margin for alignment
                   )} data-cursor-pointer>
                    <p className="text-xs font-semibold text-accent mb-1">{item.date}</p>
                    <h3 className="text-md font-semibold text-primary dark:text-primary-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-foreground/80 dark:text-foreground/70">{item.description}</p>
                  </div>
                </motion.div>
             )
            })}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Timeline;
