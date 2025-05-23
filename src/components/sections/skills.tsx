"use client";

import { motion, animate } from 'framer-motion';
import { Progress } from "@/components/ui/progress";
import SectionWrapper from '@/components/section-wrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BrainCircuit, Code, Database, Server, Palette, Settings, Cloud, ShieldCheck, HardDrive } from 'lucide-react'; // Added more icons
import React from 'react';

// Estimate levels based on description (BCA grad, recent certs)
const skillsData = [
  // Networking (High focus due to Diploma/CCNA)
  { name: "Routing & Switching", level: 85, category: "Networking", icon: Server },
  { name: "DHCP, NAT, VLAN, VPN", level: 80, category: "Networking", icon: Settings },
  { name: "ACL, VTP, SNMP", level: 75, category: "Networking", icon: ShieldCheck },
  { name: "Network Troubleshooting", level: 80, category: "Networking", icon: Settings }, // Added

  // Cloud (High focus due to Azure cert)
  { name: "Microsoft Azure Administration", level: 85, category: "Cloud", icon: Cloud }, // Updated title
  { name: "Azure Virtual Machines", level: 80, category: "Cloud", icon: Cloud },
  { name: "Azure Storage Accounts", level: 75, category: "Cloud", icon: Database },
  { name: "Azure Entra ID (AD)", level: 75, category: "Cloud", icon: Cloud },

  // Windows Server/Tools (Medium focus due to MCSE)
  { name: "Active Directory (ADDS)", level: 70, category: "Server & Tools", icon: Server },
  { name: "IIS, DHCP Server, FTP, RRAS", level: 65, category: "Server & Tools", icon: Server }, // Consolidated
  { name: "Hyper-V", level: 60, category: "Server & Tools", icon: Server },
  { name: "Server Backup & Recovery", level: 60, category: "Server & Tools", icon: HardDrive }, // Updated

  // Windows Client (Supporting skill)
  { name: "OS Installation & Config", level: 80, category: "Client OS", icon: HardDrive }, // Updated
  { name: "BitLocker, Defender", level: 70, category: "Client OS", icon: ShieldCheck },
  { name: "KMSPico (Activation Tool)", level: 60, category: "Client OS", icon: Settings }, // Clarified

  // Web Development (From Bootcamp)
  { name: "HTML & CSS", level: 65, category: "Web Development", icon: Code },
  { name: "JavaScript Basics", level: 60, category: "Web Development", icon: Code },

];

// Define categories based on the skills provided
const categories = [
    { name: "Networking", icon: Server },
    { name: "Cloud", icon: Cloud },
    { name: "Server & Tools", icon: Settings },
    { name: "Client OS", icon: HardDrive },
    { name: "Web Development", icon: Code },
];

const Skills = () => {

  return (
    <SectionWrapper id="skills" title="Skills & Expertise">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, catIndex) => {
           const categorySkills = skillsData.filter((skill) => skill.category === category.name);
           if (categorySkills.length === 0) return null; // Don't render empty categories

           return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }} // Adjust amount slightly
                transition={{ duration: 0.5, delay: catIndex * 0.1 }} // Stagger category cards
              >
                <Card className={cn("h-full overflow-hidden glassmorphism")}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-semibold text-primary dark:text-foreground">{category.name}</CardTitle>
                    <category.icon className="h-6 w-6 text-accent" />
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    {categorySkills.map((skill, skillIndex) => (
                        // Pass category index to SkillItem for combined staggering effect
                        <SkillItem key={skill.name} skill={skill} index={skillIndex} categoryIndex={catIndex} />
                      ))}
                  </CardContent>
                </Card>
              </motion.div>
            )
        })}
      </div>
    </SectionWrapper>
  );
};


interface SkillItemProps {
    skill: typeof skillsData[0];
    index: number;
    categoryIndex: number; // Add category index for overall stagger
}

const SkillItem: React.FC<SkillItemProps> = ({ skill, index, categoryIndex }) => {
    const [animatedLevel, setAnimatedLevel] = React.useState(0);
    const progressRef = React.useRef<HTMLDivElement>(null); // Ref for the progress bar container

    return (
        <motion.div
          ref={progressRef} // Attach ref here
          key={skill.name}
          className="space-y-1"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          // Use viewport settings from parent or define specific ones
          viewport={{ once: true, amount: 0.8 }} // Trigger when 80% visible
          // Combine category and skill index for a smoother overall stagger
          transition={{ duration: 0.5, delay: categoryIndex * 0.1 + index * 0.05 + 0.1 }}
           onViewportEnter={() => {
              // Animate the progress bar value when the item enters the viewport
              const controls = animate(0, skill.level, { // Use imported animate function
                  duration: 0.8, // Slightly faster animation
                  delay: 0.1, // Minimal delay after entering viewport
                  ease: "easeOut",
                  onUpdate: (value) => {
                    // Check if the component is still mounted before updating state
                     if (progressRef.current) {
                         setAnimatedLevel(Math.round(value));
                     }
                  },
              });
              // Return cleanup function
              return () => controls.stop();
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
