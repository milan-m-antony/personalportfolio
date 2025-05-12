"use client";

import SectionWrapper from '@/components/section-wrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Award, Calendar, ExternalLink, Code, Cloud, Server } from 'lucide-react'; // Added relevant icons
import Link from 'next/link';
import { Button } from '../ui/button';


const certificationsData = [
  {
    title: "CCNA",
    issuer: "SMEC",
    date: "Dec 2024",
    imageUrl: "https://picsum.photos/300/200?random=6",
    verifyUrl: "#",
    description: "Cisco Certified Network Associate certification covering networking fundamentals.",
    icon: Server, // Networking icon
    aiHint: "certificate network cisco",
  },
  {
    title: "MCSE",
    issuer: "SMEC",
    date: "Dec 2024",
    imageUrl: "https://picsum.photos/300/200?random=7",
    verifyUrl: "#",
    description: "Microsoft Certified Solutions Expert certification.",
    icon: Server, // Server/Microsoft icon
     aiHint: "certificate microsoft expert",
  },
  {
    title: "Microsoft Azure Administration",
    issuer: "SMEC",
    date: "Dec 2024",
    imageUrl: "https://picsum.photos/300/200?random=8",
    verifyUrl: "#",
    description: "Certification focusing on managing Azure subscriptions, resources, and infrastructure.",
    icon: Cloud, // Cloud icon
     aiHint: "certificate azure cloud",
  },
   {
    title: "Web Design & Development Bootcamp",
    issuer: "Unknown", // Assuming issuer is not specified
    date: "Completed", // Assuming date is not specified precisely
    imageUrl: "https://picsum.photos/300/200?random=9",
    verifyUrl: "#",
    description: "Completed 50+ hour bootcamp covering web design and development principles.",
    icon: Code, // Code icon
     aiHint: "certificate web development",
  },
  {
    title: "Cloud Foundations",
    issuer: "Great Learning",
    date: "Completed", // Assuming date is not specified precisely
    imageUrl: "https://picsum.photos/300/200?random=10",
    verifyUrl: "#",
    description: "Foundational knowledge in cloud computing concepts.",
    icon: Cloud,
     aiHint: "certificate cloud learning",
  },
   {
    title: "Networking Basics",
    issuer: "Cisco Networking Academy",
    date: "Completed", // Assuming date is not specified precisely
    imageUrl: "https://picsum.photos/300/200?random=11",
    verifyUrl: "#",
    description: "Understanding of basic networking principles from Cisco.",
    icon: Server,
     aiHint: "certificate networking basics",
  },
];

const Certifications = () => {
   const cardVariants = {
      hidden: { opacity: 0, scale: 0.9 },
      visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: {
          delay: i * 0.1,
          duration: 0.4,
          ease: "easeOut",
        },
      }),
   };


  return (
    <SectionWrapper id="certifications" title="Certifications & Training">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {certificationsData.map((cert, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={index}
          >
            <Card className={cn(
              "h-full overflow-hidden group glassmorphism transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col" // Added flex flex-col
            )} data-cursor-pointer>
              <CardHeader className="p-0 relative">
                 <Image
                  src={cert.imageUrl}
                  alt={`${cert.title} Certificate Thumbnail`}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={cert.aiHint}
                />
                {/* Add a subtle overlay on hover */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                 {/* Icon overlay */}
                 {cert.icon && (
                     <div className="absolute top-2 right-2 bg-background/70 p-1.5 rounded-full shadow">
                        <cert.icon className="w-4 h-4 text-accent" />
                     </div>
                 )}
              </CardHeader>
              <CardContent className="p-4 flex flex-col flex-grow"> {/* Ensure content grows */}
                <CardTitle className="text-md font-semibold mb-1 text-primary dark:text-primary-foreground leading-tight">{cert.title}</CardTitle>
                <CardDescription className="text-xs text-accent mb-2 flex items-center">
                   <Award className="w-3 h-3 mr-1" /> {cert.issuer}
                </CardDescription>
                 <p className="text-sm text-foreground/80 dark:text-foreground/70 mb-3 flex-grow">{cert.description}</p> {/* flex-grow pushes footer down */}

                 <div className="flex justify-between items-center mt-auto pt-2 border-t border-border/50">
                    <Badge variant="outline" className="text-xs flex items-center gap-1 px-2 py-0.5 bg-muted/50 dark:bg-muted/20 border-border/80">
                        <Calendar className="w-3 h-3" /> {cert.date}
                    </Badge>
                    {cert.verifyUrl && cert.verifyUrl !== "#" && (
                         <Button variant="link" size="sm" asChild className="p-0 h-auto text-xs text-accent hover:underline">
                           <Link href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
                             Verify <ExternalLink className="ml-1 h-3 w-3" />
                           </Link>
                         </Button>
                     )}
                 </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Certifications;
