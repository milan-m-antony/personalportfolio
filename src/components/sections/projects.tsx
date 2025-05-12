"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Tilt from 'react-parallax-tilt';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
import SectionWrapper from '@/components/section-wrapper';
import { cn } from '@/lib/utils';
import { Button } from "../ui/button";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";


const projectsData = [
  {
    title: "Online Diagnostic Lab Management System",
    description: "A web application for managing diagnostic lab operations, improving efficiency in appointment scheduling and report delivery.",
    image: "https://picsum.photos/600/400?random=1",
    tags: ["Web App", "Management", "PHP", "MySQL"],
    liveUrl: "#",
    githubUrl: "#",
    aiHint: "lab system online",
  },
  {
    title: "Cloud Resource Management",
    description: "Developed scripts and strategies for optimizing resource allocation and cost management within a cloud environment.",
    image: "https://picsum.photos/600/400?random=2",
    tags: ["Cloud", "Management", "Azure", "Scripting"],
    liveUrl: "#",
    githubUrl: "#",
    aiHint: "cloud dashboard manage",
  },
  {
    title: "Teacher Duty Hour Allocation System",
    description: "A system designed to automate and streamline the process of assigning duty hours for teachers, ensuring fair distribution.",
    image: "https://picsum.photos/600/400?random=3",
    tags: ["Allocation System", "Web App", "Automation"],
    liveUrl: "#",
    githubUrl: "#",
    aiHint: "schedule system teacher",
  },
   {
    title: "Personal Portfolio",
    description: "This website, built using modern web technologies to showcase my skills, projects, and professional journey.",
    image: "https://picsum.photos/600/400?random=4",
    tags: ["Next.js", "React", "TailwindCSS", "TypeScript", "Framer Motion"],
    liveUrl: "#", // Current site URL ideally
    githubUrl: "#", // Link to this repo if public
    aiHint: "portfolio website modern",
  },
   // Add more projects here if needed
];

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


const Projects = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <SectionWrapper id="projects" title="My Projects">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          align: "start",
          loop: projectsData.length > 3, // Only loop if enough items
        }}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.start} // Use start instead of reset for continuous play
      >
        <CarouselContent className="-ml-4">
          {projectsData.map((project, index) => (
            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3 group">
              <motion.div
                 variants={cardVariants}
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true }}
                 custom={index} // Pass index for staggered delay
              >
                <Tilt
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  glareEnable={true}
                  glareMaxOpacity={0.15}
                  glarePosition="all"
                  glareBorderRadius="0.75rem" // Match card radius
                  className="h-full"
                  transitionSpeed={1000}
                  scale={1.02} // Slight scale on hover via tilt
                >
                  <Card className={cn(
                    "h-full overflow-hidden flex flex-col transition-all duration-300 ease-out",
                    "glassmorphism group-hover:shadow-2xl" // Glassmorphism and hover shadow
                    )}
                    data-cursor-pointer
                    >
                    <CardHeader className="p-0 relative">
                       <Image
                        src={project.image}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint={project.aiHint}
                      />
                      {/* Overlay for better text visibility if needed */}
                      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div> */}
                    </CardHeader>
                    <CardContent className="p-6 flex-grow flex flex-col">
                      <CardTitle className="text-xl font-semibold mb-2 text-primary dark:text-foreground">{project.title}</CardTitle> {/* Updated dark mode text color */}
                      <CardDescription className="text-foreground/80 dark:text-foreground/70 mb-4 flex-grow">{project.description}</CardDescription>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                     <CardFooter className="p-6 pt-0 flex justify-between items-center mt-auto"> {/* Ensure footer is at bottom */}
                      <Button variant="link" asChild className="p-0 h-auto text-accent hover:underline" disabled={project.liveUrl === "#"}>
                        <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          Live Demo <ExternalLink className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild className="text-foreground/70 hover:text-foreground" disabled={project.githubUrl === "#"}>
                         <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} GitHub Repository`}>
                           <Github className="h-5 w-5" />
                         </Link>
                       </Button>
                     </CardFooter>
                  </Card>
                </Tilt>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {projectsData.length > 1 && ( // Only show controls if more than 1 item
             <>
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 hidden sm:flex bg-[#33c4a9] text-white hover:bg-[#217ca6]" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 hidden sm:flex bg-[#33c4a9] text-white hover:bg-[#217ca6]" />
             </>
        )}
      </Carousel>
    </SectionWrapper>
  );
};

export default Projects;
