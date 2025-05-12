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
        "Gaining hands-on experience in network support and troubleshooting.",
        "Learning about network configuration and maintenance.",
        "Assisting senior engineers with client network issues.",
      ],
    },
    // Add more experience if available
  ],
   keySkills: [
    { name: "Networking", skills: "Routing, DHCP, NAT, VLAN, VPN, ACL, VTP, SNMP, Network Troubleshooting, Configuration" },
    { name: "Cloud (Azure)", skills: "Virtual Machines, Storage Accounts, Entra ID (formerly Azure AD), Resource Management" },
    { name: "Windows Server/Tools", skills: "ADDS, IIS, DHCP, FTP, RRAS, NAT, Hyper-V, Server Backup, Troubleshooting" },
    { name: "Windows Client", skills: "OS Installation & Configuration, KMSPico Activation, BitLocker, Defender Security" },
    // { name: "Certifications", skills: "CCNA, MCSE, Azure Admin (In Progress/Dec 2024)" }, // Handled in Certifications section
    { name: "Web Basics", skills: "HTML, CSS, JavaScript (Fundamental understanding from Bootcamp)" },
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
          <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 pb-4"> {/* Adjusted padding */}
            <div>
                <CardTitle className="text-2xl font-bold text-primary dark:text-foreground">{resumeData.name}</CardTitle> {/* Updated dark mode text color */}
                <CardDescription className="text-accent">{resumeData.title}</CardDescription>
            </div>
             {/* Placeholder link for CV download */}
            <Button asChild variant="outline" className="mt-4 sm:mt-0 border-accent text-accent hover:bg-accent/10 hover:text-accent font-semibold shadow-sm transition-transform hover:scale-105" data-cursor-pointer>
              <Link href="/resume.pdf" download target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" /> Download Full CV
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-6 pt-4"> {/* Adjusted padding */}
            <Tabs defaultValue="experience" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-10 bg-muted/50 dark:bg-muted/20 p-1.5 rounded-lg gap-1"> {/* Increased mb and gap, adjusted p */}
                <TabsTrigger value="experience" className="py-2 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-accent"><Briefcase className="inline-block w-4 h-4 mr-2" />Experience</TabsTrigger> {/* Adjusted padding and mr */}
                <TabsTrigger value="education" className="py-2 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-accent"><GraduationCap className="inline-block w-4 h-4 mr-2" />Education</TabsTrigger> {/* Adjusted padding and mr */}
                <TabsTrigger value="skills" className="py-2 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-accent"><Star className="inline-block w-4 h-4 mr-2" />Key Skills</TabsTrigger> {/* Adjusted padding and mr */}
                <TabsTrigger value="languages" className="py-2 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-accent"><Languages className="inline-block w-4 h-4 mr-2" />Languages</TabsTrigger> {/* Adjusted padding and mr */}
              </TabsList>

              {/* Experience Tab */}
              <TabsContent value="experience">
                {resumeData.experience.length > 0 ? (
                    <div className="space-y-10"> {/* Increased spacing between items */}
                    {resumeData.experience.map((exp, index) => (
                        <motion.div
                        key={index}
                        variants={listItemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        custom={index}
                        className="border-l-4 border-accent pl-6 space-y-1.5 relative group" // Increased padding left, added space-y, thicker border, relative for dot
                        >
                        {/* Dot on the timeline */}
                        <div className="absolute -left-[9px] top-1 w-4 h-4 bg-background border-2 border-accent rounded-full transition-transform duration-300 group-hover:scale-110"></div>

                        <h3 className="text-lg font-semibold text-foreground leading-snug pt-0.5">{exp.role}</h3> {/* Added padding top */}
                        <p className="text-sm font-medium text-accent">{exp.company} | {exp.years}</p>
                        {exp.responsibilities && exp.responsibilities.length > 0 && (
                            <ul className="list-disc list-outside pl-5 pt-2 space-y-2 text-sm text-foreground/80 dark:text-foreground/70"> {/* Increased space-y and pt */}
                                {exp.responsibilities.map((resp, i) => (
                                <li key={i}>{resp}</li>
                                ))}
                            </ul>
                        )}
                        </motion.div>
                    ))}
                    </div>
                ) : (
                    <p className="text-center text-muted-foreground italic py-4">No professional experience listed yet.</p>
                )}
              </TabsContent>

              {/* Education Tab */}
              <TabsContent value="education">
                 <div className="space-y-10"> {/* Increased spacing between items */}
                  {resumeData.education.map((edu, index) => (
                     <motion.div
                        key={index}
                        variants={listItemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        custom={index}
                        className="border-l-4 border-accent pl-6 space-y-1.5 relative group" // Increased padding left, added space-y, thicker border, relative for dot
                      >
                       {/* Dot on the timeline */}
                       <div className="absolute -left-[9px] top-1 w-4 h-4 bg-background border-2 border-accent rounded-full transition-transform duration-300 group-hover:scale-110"></div>

                      <h3 className="text-lg font-semibold text-foreground leading-snug pt-0.5">{edu.degree}</h3> {/* Added padding top */}
                      <p className="text-sm font-medium text-accent">{edu.institution} | {edu.years}</p>
                       {edu.details && <p className="mt-1 text-sm text-foreground/80 dark:text-foreground/70">{edu.details}</p>}
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

               {/* Skills Tab */}
                <TabsContent value="skills">
                   <div className="space-y-8"> {/* Increased spacing */}
                    {resumeData.keySkills.map((skillCat, index) => (
                      <motion.div
                        key={skillCat.name}
                        variants={listItemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        custom={index}
                        className="border-b border-border/40 pb-4 last:border-b-0" // Added border bottom and padding
                      >
                         <h4 className="text-md font-semibold text-accent mb-2.5">{skillCat.name}</h4> {/* Increased mb */}
                         <p className="text-sm text-foreground/80 dark:text-foreground/70 leading-relaxed">{skillCat.skills}</p> {/* Added leading-relaxed */}
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                 {/* Languages Tab */}
                <TabsContent value="languages">
                   <div className="space-y-6"> {/* Increased spacing */}
                    {resumeData.languages.map((lang, index) => (
                      <motion.div
                        key={lang.name}
                        variants={listItemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        custom={index}
                        className="flex justify-between items-center border-b border-border/50 pb-4" // Added padding bottom
                      >
                        <span className="text-md font-medium text-foreground">{lang.name}</span>
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
