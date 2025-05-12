"use client";

import SectionWrapper from '@/components/section-wrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Trophy, Zap, Users, Code } from 'lucide-react'; // Example icons
import React from 'react';


const achievementsData = [
  {
    title: "Hackathon Winner",
    description: "1st Place in the 2023 Regional Web Dev Hackathon.",
    icon: Trophy,
    bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
    iconColor: "text-yellow-600 dark:text-yellow-400",
     aiHint: "award trophy gold",
  },
  {
    title: "Top Contributor",
    description: "Recognized as a top contributor to an open-source project.",
    icon: Code,
     bgColor: "bg-blue-100 dark:bg-blue-900/30",
     iconColor: "text-blue-600 dark:text-blue-400",
      aiHint: "code abstract binary",
  },
  {
    title: "Community Recognition",
    description: "Awarded for outstanding community support and mentorship.",
    icon: Users,
     bgColor: "bg-green-100 dark:bg-green-900/30",
     iconColor: "text-green-600 dark:text-green-400",
      aiHint: "community people connection",
  },
   {
    title: "Performance Award",
    description: "Received company award for exceptional performance in Q4 2023.",
    icon: Zap,
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
       aiHint: "lightning bolt energy",
  },
];

const Achievements = () => {
   const cardVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.1,
          duration: 0.5,
          ease: "easeOut",
        },
      }),
   };

   // Function to get a default icon if none provided
   const getIcon = (IconComponent?: React.ElementType) => {
       const Icon = IconComponent || Trophy; // Default to Trophy
       return <Icon className={cn("w-8 h-8 mb-3")} />;
   }

  return (
    <SectionWrapper id="achievements" title="Achievements & Recognition">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievementsData.map((achievement, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={index}
          >
            <Card className={cn(
              "h-full text-center overflow-hidden group glassmorphism transition-all duration-300 hover:shadow-lg hover:border-accent/30 flex flex-col"
              )} data-cursor-pointer>
              <CardHeader className={cn("p-6 items-center flex-shrink-0 rounded-t-lg", achievement.bgColor)}>
                 <div className={cn("p-3 rounded-full bg-background/50", achievement.iconColor)}>
                    {getIcon(achievement.icon)}
                 </div>
              </CardHeader>
              <CardContent className="p-6 flex flex-col flex-grow items-center">
                <CardTitle className="text-lg font-semibold mb-2 text-primary dark:text-primary-foreground">{achievement.title}</CardTitle>
                <CardDescription className="text-sm text-foreground/80 dark:text-foreground/70 flex-grow">
                    {achievement.description}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Achievements;
