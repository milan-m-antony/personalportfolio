"use client";

import { motion } from 'framer-motion';
import { Progress } from "@/components/ui/progress";
import SectionWrapper from '@/components/section-wrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BrainCircuit, Code, Database, Server, Palette } from 'lucide-react'; // Example icons
import React from 'react';

const skillsData = [
  { name: "HTML5", level: 95, category: "Frontend", icon: Code },
  { name: "CSS3 & Tailwind", level: 90, category: "Frontend", icon: Palette },
  { name: "JavaScript (ES6+)", level: 85, category: "Frontend", icon: Code },
  { name: "React & Next.js", level: 88, category: "Frontend", icon: Code },
  { name: "TypeScript", level: 80, category: "Frontend", icon: Code },
  { name: "Node.js & Express", level: 75, category: "Backend", icon: Server },
  { name: "Python & Flask/Django", level: 70, category: "Backend", icon: Server },
  { name: "SQL (PostgreSQL)", level: 70, category: "Databases", icon: Database },
  { name: "MongoDB", level: 65, category: "Databases", icon: Database },
  { name: "Git & GitHub", level: 90, category: "Tools", icon: Github }, // Assuming Github is imported elsewhere or use a generic tool icon
  { name: "Docker", level: 60, category: "Tools", icon: Server }, // Placeholder icon
  { name: "Figma", level: 70, category: "Design", icon: Palette},
];

const categories = [
    { name: "Frontend", icon: Code },
    { name: "Backend", icon: Server },
    { name: "Databases", icon: Database },
    { name: "Tools", icon: BrainCircuit }, // Example, adjust as needed
    { name: "Design", icon: Palette }
];

const Skills = () => {
  const [animatedLevels, setAnimatedLevels] = React.useState<{ [key: string]: number }>({});
  const sectionRef = React.useRef(null);

  // Note: Framer Motion's whileInView handles the animation triggering,
  // but we keep this structure if we need manual control or more complex state updates.
  React.useEffect(() => {
    // Initial setup if needed, though whileInView handles the start.
  }, []);


  return (
    <SectionWrapper id="skills" title="Skills & Expertise" ref={sectionRef}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <Card className={cn("h-full overflow-hidden glassmorphism")}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold text-primary dark:text-primary-foreground">{category.name}</CardTitle>
                 <category.icon className="h-6 w-6 text-accent" />
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {skillsData
                  .filter((skill) => skill.category === category.name)
                  .map((skill, index) => (
                    <SkillItem key={skill.name} skill={skill} index={index} />
                  ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};


interface SkillItemProps {
    skill: typeof skillsData[0];
    index: number;
}

const SkillItem: React.FC<SkillItemProps> = ({ skill, index }) => {
    const [animatedLevel, setAnimatedLevel] = React.useState(0);

    return (
        <motion.div
          key={skill.name}
          className="space-y-1"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          // Use viewport settings from parent or define specific ones
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }} // Stagger within card + card delay
           onViewportEnter={() => {
              // Animate the progress bar value when the item enters the viewport
              const controls = motion.animate(0, skill.level, {
                  duration: 1,
                  delay: index * 0.1 + 0.4, // Delay slightly more for the bar animation
                  ease: "easeOut",
                  onUpdate: (value) => setAnimatedLevel(Math.round(value)),
              });
              // Return cleanup function if needed, though whileInView handles this
              // return () => controls.stop();
           }}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-foreground/90 dark:text-foreground/80">{skill.name}</span>
            <span className="text-xs font-semibold text-accent">{animatedLevel}%</span>
          </div>
          <Progress
            value={animatedLevel}
            aria-label={`${skill.name} skill level ${skill.level}%`}
            className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-accent/70 [&>div]:to-accent"
            />

        </motion.div>
    )
}


export default Skills;
