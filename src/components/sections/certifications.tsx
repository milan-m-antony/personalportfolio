"use client";

import SectionWrapper from '@/components/section-wrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Award, Calendar, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';


const certificationsData = [
  {
    title: "Certified React Developer",
    issuer: "React Academy",
    date: "2023",
    imageUrl: "https://picsum.photos/300/200?random=6",
    verifyUrl: "#",
    description: "Demonstrated proficiency in React core concepts, hooks, and state management.",
    aiHint: "certificate design modern",
  },
  {
    title: "Next.js Fundamentals",
    issuer: "Vercel Learning",
    date: "2023",
    imageUrl: "https://picsum.photos/300/200?random=7",
    verifyUrl: "#",
    description: "Completed course covering Next.js features like SSR, SSG, API routes, and optimization.",
     aiHint: "certificate technology minimal",
  },
  {
    title: "Cloud Practitioner Essentials",
    issuer: "Amazon Web Services (AWS)",
    date: "2022",
    imageUrl: "https://picsum.photos/300/200?random=8",
    verifyUrl: "#",
    description: " foundational understanding of AWS Cloud concepts, services, and terminology.",
     aiHint: "certificate official corporate",
  },
   {
    title: "Advanced Tailwind CSS",
    issuer: "Tailwind Labs",
    date: "2023",
    imageUrl: "https://picsum.photos/300/200?random=9",
    verifyUrl: "#",
    description: "Mastered advanced Tailwind concepts including customization, plugins, and JIT.",
     aiHint: "certificate blue abstract",
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
    <SectionWrapper id="certifications" title="Certifications & Awards">
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
              "h-full overflow-hidden group glassmorphism transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
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
              </CardHeader>
              <CardContent className="p-4 flex flex-col flex-grow">
                <CardTitle className="text-md font-semibold mb-1 text-primary dark:text-primary-foreground leading-tight">{cert.title}</CardTitle>
                <CardDescription className="text-xs text-accent mb-2 flex items-center">
                   <Award className="w-3 h-3 mr-1" /> {cert.issuer}
                </CardDescription>
                 <p className="text-sm text-foreground/80 dark:text-foreground/70 mb-3 flex-grow">{cert.description}</p>

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
