"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download, Briefcase, GraduationCap, Award, Star, Languages } from 'lucide-react'; // Added Languages icon
import SectionWrapper from '@/components/section-wrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const resumeData = {
  name: "Milan M Antony",
  title: "Cloud Support Engineer",
  education: [
     {
      institution: "SMEC, Kaloor, Kochi",
      degree: "Diploma in Network Engineering",
      years: "June – Dec 2024",
      details: "Focused on networking concepts and technologies.",
    },
    {
      institution: "B.V.M. Holy Cross College, Cherpunkal",
      degree: "BCA (Bachelor of Computer Applications)",
      years: "2021 – 2024",
      details: "Comprehensive study in computer applications and software development.",
    },
     {
      institution: "St. Thomas HSS, Erumely",
      degree: "Higher Secondary (Computer Science)",
      years: "2019 – 2021",
      details: "Focused on Computer Science stream.",
    },
    {
      institution: "St. Mary’s HS, Umikuppa",
      degree: "High School",
      years: "2018 – 2019",
       details: "", // No specific details provided
    },
  ],
  experience: [
    {
      company: "SMEC LABS, Kochi, India",
      role: "Network Support Engineer",
      years: "Currently Training", // Assuming this based on diploma dates
      responsibilities: [
        "Gaining hands-on experience in network support and troubleshooting.", // Placeholder responsibility
        "Learning about network configuration and maintenance.", // Placeholder responsibility
      ],
    },
    // Add more experience if available
  ],
   keySkills: [
    { name: "Networking", skills: "Routing, DHCP, NAT, VLAN, VPN, ACL, VTP, SNMP" },
    { name: "Cloud (Azure)", skills: "Virtual Machines, Storage Accounts, Entra ID (formerly Azure AD)" },
    { name: "Windows Server/Tools", skills: "ADDS, IIS, DHCP, FTP, RRAS, NAT, Hyper-V, Server Backup" },
    { name: "Windows Client", skills: "OS Installation, KMSPico Activation, BitLocker, Defender" },
    { name: "Certifications", skills: "CCNA, MCSE, Azure Admin (In Progress/Dec 2024)" },
    { name: "Web Basics", skills: "HTML, CSS, JavaScript (from Bootcamp)" },
  ],
   languages: [ // Added Languages Section
       { name: "English", proficiency: "Professional Working Proficiency" },
       { name: "Malayalam", proficiency: "Full Professional Proficiency" },
   ]
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
                <CardTitle className="text-2xl font-bold text-primary dark:text-primary-foreground">{resumeData.name}</CardTitle>
                <CardDescription className="text-accent">{resumeData.title}</CardDescription>
            </div>
             {/* Placeholder link for CV download */}
            <Button asChild variant="outline" className="mt-4 sm:mt-0 border-accent text-accent hover:bg-accent/10 hover:text-accent font-semibold shadow-sm transition-transform hover:scale-105" data-cursor-pointer>
              <Link href="/resume.pdf" download target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" /> Download Full CV
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <Tabs defaultValue="experience" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6 bg-muted/50 dark:bg-muted/20 p-1 rounded-lg">
                <TabsTrigger value="experience" className="data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-accent"><Briefcase className="inline-block w-4 h-4 mr-1" />Experience</TabsTrigger>
                <TabsTrigger value="education" className="data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-accent"><GraduationCap className="inline-block w-4 h-4 mr-1" />Education</TabsTrigger>
                 <TabsTrigger value="skills" className="data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-accent"><Star className="inline-block w-4 h-4 mr-1" />Key Skills</TabsTrigger>
                 <TabsTrigger value="languages" className="data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-accent"><Languages className="inline-block w-4 h-4 mr-1" />Languages</TabsTrigger>
              </TabsList>

              {/* Experience Tab */}
              <TabsContent value="experience">
                {resumeData.experience.length > 0 ? (
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
                        {exp.responsibilities && exp.responsibilities.length > 0 && (
                            <ul className="list-disc list-outside pl-5 mt-2 space-y-1 text-sm text-foreground/80 dark:text-foreground/70">
                                {exp.responsibilities.map((resp, i) => (
                                <li key={i}>{resp}</li>
                                ))}
                            </ul>
                        )}
                        </motion.div>
                    ))}
                    </div>
                ) : (
                    <p className="text-center text-muted-foreground italic">No professional experience listed yet.</p>
                )}
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
                       {edu.details && <p className="mt-1 text-sm text-foreground/80 dark:text-foreground/70">{edu.details}</p>}
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

                 {/* Languages Tab */}
                <TabsContent value="languages">
                  <div className="space-y-4">
                    {resumeData.languages.map((lang, index) => (
                      <motion.div
                        key={lang.name}
                        variants={listItemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        custom={index}
                        className="flex justify-between items-center"
                      >
                        <span className="text-md font-semibold text-foreground">{lang.name}</span>
                        <span className="text-sm text-muted-foreground">{lang.proficiency}</span>
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
