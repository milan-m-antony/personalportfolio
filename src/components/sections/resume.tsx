"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download, Briefcase, GraduationCap, Award, Star } from 'lucide-react';
import SectionWrapper from '@/components/section-wrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const resumeData = {
  education: [
    {
      institution: "University of Example",
      degree: "B.S. in Computer Science",
      years: "2018 - 2022",
      details: "Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems. Graduated Magna Cum Laude.",
    },
     {
      institution: "Online Bootcamp",
      degree: "Full-Stack Web Development Certificate",
      years: "2021",
      details: "Intensive program covering MERN stack, deployment, and best practices.",
    },
  ],
  experience: [
    {
      company: "Tech Solutions Inc.",
      role: "Frontend Developer",
      years: "2022 - Present",
      responsibilities: [
        "Developed and maintained responsive user interfaces using React and Next.js.",
        "Collaborated with designers and backend developers to implement new features.",
        "Improved website performance and accessibility scores.",
        "Wrote unit and integration tests using Jest and React Testing Library.",
      ],
    },
    {
      company: "Web Creations Co.",
      role: "Junior Web Developer Intern",
      years: "Summer 2021",
      responsibilities: [
        "Assisted senior developers in building client websites using HTML, CSS, and JavaScript.",
        "Participated in code reviews and agile development processes.",
        "Gained experience with version control (Git).",
      ],
    },
  ],
   keySkills: [ // Added Key Skills Section
    { name: "Frontend", skills: "React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Zustand" },
    { name: "Backend", skills: "Node.js, Express, Python, REST APIs" },
    { name: "Databases", skills: "PostgreSQL, MongoDB, SQL" },
    { name: "Tools", skills: "Git, Docker, Figma, Jira, VS Code" },
    { name: "Concepts", skills: "Agile Methodologies, UI/UX Principles, Responsive Design, Testing" },
  ],
};

const Resume = () => {
  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  return (
    <SectionWrapper id="resume" title="My Resume">
       <motion.div
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, amount: 0.2 }}
         transition={{ duration: 0.6 }}
       >
        <Card className={cn("w-full max-w-4xl mx-auto overflow-hidden glassmorphism")}>
          <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6">
            <div>
                <CardTitle className="text-2xl font-bold text-primary dark:text-primary-foreground">Your Name</CardTitle>
                <CardDescription className="text-accent">Passionate Web Developer</CardDescription>
            </div>
            <Button asChild variant="outline" className="mt-4 sm:mt-0 border-accent text-accent hover:bg-accent/10 hover:text-accent font-semibold shadow-sm transition-transform hover:scale-105" data-cursor-pointer>
              <Link href="/resume.pdf" download target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" /> Download Full CV
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <Tabs defaultValue="experience" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 mb-6 bg-muted/50 dark:bg-muted/20 p-1 rounded-lg">
                <TabsTrigger value="experience" className="data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-accent"><Briefcase className="inline-block w-4 h-4 mr-1" />Experience</TabsTrigger>
                <TabsTrigger value="education" className="data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-accent"><GraduationCap className="inline-block w-4 h-4 mr-1" />Education</TabsTrigger>
                 <TabsTrigger value="skills" className="data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-accent col-span-2 md:col-span-1"><Star className="inline-block w-4 h-4 mr-1" />Key Skills</TabsTrigger>
              </TabsList>

              {/* Experience Tab */}
              <TabsContent value="experience">
                <div className="space-y-6">
                  {resumeData.experience.map((exp, index) => (
                     <motion.div
                       key={index}
                       variants={listItemVariants}
                       initial="hidden"
                       whileInView="visible"
                       viewport={{ once: true, amount: 0.5 }}
                       custom={index}
                       className="border-l-2 border-accent pl-4"
                     >
                      <h3 className="text-lg font-semibold text-foreground">{exp.role}</h3>
                      <p className="text-sm font-medium text-accent">{exp.company} | {exp.years}</p>
                      <ul className="list-disc list-outside pl-5 mt-2 space-y-1 text-sm text-foreground/80 dark:text-foreground/70">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i}>{resp}</li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Education Tab */}
              <TabsContent value="education">
                <div className="space-y-6">
                  {resumeData.education.map((edu, index) => (
                     <motion.div
                        key={index}
                        variants={listItemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        custom={index}
                        className="border-l-2 border-accent pl-4"
                      >
                      <h3 className="text-lg font-semibold text-foreground">{edu.degree}</h3>
                      <p className="text-sm font-medium text-accent">{edu.institution} | {edu.years}</p>
                       <p className="mt-1 text-sm text-foreground/80 dark:text-foreground/70">{edu.details}</p>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

               {/* Skills Tab */}
                <TabsContent value="skills">
                  <div className="space-y-4">
                    {resumeData.keySkills.map((skillCat, index) => (
                      <motion.div
                        key={skillCat.name}
                        variants={listItemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        custom={index}
                      >
                        <h4 className="text-md font-semibold text-accent mb-1">{skillCat.name}</h4>
                        <p className="text-sm text-foreground/80 dark:text-foreground/70">{skillCat.skills}</p>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

            </Tabs>
          </CardContent>
        </Card>
       </motion.div>
    </SectionWrapper>
  );
};

export default Resume;
