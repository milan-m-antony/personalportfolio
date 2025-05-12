"use client";

import SectionWrapper from '@/components/section-wrapper';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Rocket, Flag, Construction } from 'lucide-react'; // Added Construction icon
import React from 'react';

// Build timeline data from user's info, ordering chronologically (most recent first)
const timelineData = [
   {
    date: "Dec 2024",
    title: "Expected Certifications (CCNA, MCSE, Azure Admin)",
    description: "Completing intensive training and certification exams at SMEC.",
    icon: GraduationCap,
    iconBg: "bg-green-500",
  },
  {
    date: "June–Dec 2024",
    title: "Network Engineering Diploma & Training",
    description: "Enrolled in Diploma program and Network Support Engineer training at SMEC LABS, Kochi.",
    icon: Briefcase,
    iconBg: "bg-blue-500",
  },
   {
    date: "2024",
    title: "Graduated BCA",
    description: "Completed Bachelor of Computer Applications from B.V.M. Holy Cross College.",
    icon: GraduationCap,
    iconBg: "bg-green-500",
  },
  {
    date: "Ongoing", // Representing continuous project work
    title: "Personal Projects Development",
    description: "Working on projects like Online Diagnostic Lab, Cloud Management, and this portfolio.",
    icon: Construction, // Icon for ongoing work/building
    iconBg: "bg-purple-500",
  },
   {
    date: "2021–2024",
    title: "BCA Studies",
    description: "Studied Computer Applications at B.V.M. Holy Cross College, Cherpunkal.",
    icon: GraduationCap,
    iconBg: "bg-green-500",
  },
  {
    date: "2019–2021",
    title: "Higher Secondary Education",
    description: "Completed Higher Secondary (Computer Science) at St. Thomas HSS, Erumely.",
    icon: GraduationCap,
    iconBg: "bg-green-500",
  },
  {
    date: "2018–2019",
    title: "High School Education",
    description: "Completed High School at St. Mary’s HS, Umikuppa.",
    icon: GraduationCap,
    iconBg: "bg-green-500",
  },
   {
    date: "~2019/2020", // Approximate date for state exhibition
    title: "State-Level Work Exhibition",
    description: "Participated by designing a multi-purpose rescue vehicle concept.",
    icon: Rocket, // Or Lightbulb
    iconBg: "bg-yellow-500",
  },
   {
    date: "2021", // Start of BCA journey
    title: "Started University Journey (BCA)",
    description: "Began Bachelor's degree at B.V.M. Holy Cross College.",
    icon: Flag,
    iconBg: "bg-gray-500",
  },
].sort((a, b) => {
  // Basic sort: 'Present' first, then years descending. Needs more robust date parsing for accuracy.
  if (a.date === "Present") return -1;
  if (b.date === "Present") return 1;
  if (a.date === "Ongoing") return -1; // Show ongoing projects near the top
  if (b.date === "Ongoing") return 1;

  const yearA = parseInt(a.date.split('–')[0].match(/\d{4}/)?.[0] || '0');
  const yearB = parseInt(b.date.split('–')[0].match(/\d{4}/)?.[0] || '0');
  return yearB - yearA; // Sort descending by year
});


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


  // Detect if window is defined (client-side)
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);


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
              // Determine side based on index and screen size (only if client-side)
             const isLeft = isClient && index % 2 === 0 && window.innerWidth >= 768;

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
                  transition={{ delay: index * 0.1 }} // Add stagger delay
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
                    <h3 className="text-md font-semibold text-primary dark:text-foreground mb-1">{item.title}</h3> {/* Updated dark mode text color */}
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
