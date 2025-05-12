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
    title: "Project Alpha",
    description: "A revolutionary web application for task management.",
    image: "https://picsum.photos/600/400?random=1",
    tags: ["React", "Node.js", "MongoDB", "TailwindCSS"],
    liveUrl: "#",
    githubUrl: "#",
    aiHint: "web app dashboard",
  },
  {
    title: "Project Beta",
    description: "E-commerce platform with seamless user experience.",
    image: "https://picsum.photos/600/400?random=2",
    tags: ["Next.js", "Stripe", "GraphQL", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
    aiHint: "online store product",
  },
  {
    title: "Project Gamma",
    description: "Interactive data visualization dashboard.",
    image: "https://picsum.photos/600/400?random=3",
    tags: ["D3.js", "React", "Firebase", "Charts"],
    liveUrl: "#",
    githubUrl: "#",
    aiHint: "data dashboard chart",
  },
   {
    title: "Project Delta",
    description: "Mobile-first social networking app.",
    image: "https://picsum.photos/600/400?random=4",
    tags: ["React Native", "Expo", "Firebase", "Push Notifications"],
    liveUrl: "#",
    githubUrl: "#",
    aiHint: "mobile app social",
  },
   {
    title: "Project Epsilon",
    description: "AI-powered content generation tool.",
    image: "https://picsum.photos/600/400?random=5",
    tags: ["Python", "Flask", "OpenAI API", "React"],
    liveUrl: "#",
    githubUrl: "#",
    aiHint: "ai tool interface",
  },
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
          loop: true,
        }}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
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
                      <CardTitle className="text-xl font-semibold mb-2 text-primary dark:text-primary-foreground">{project.title}</CardTitle>
                      <CardDescription className="text-foreground/80 dark:text-foreground/70 mb-4 flex-grow">{project.description}</CardDescription>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                     <CardFooter className="p-6 pt-0 flex justify-between items-center">
                      <Button variant="link" asChild className="p-0 h-auto text-accent hover:underline">
                        <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          Live Demo <ExternalLink className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild className="text-foreground/70 hover:text-foreground">
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
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 hidden sm:flex glassmorphism hover:bg-primary/80 text-primary-foreground" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 hidden sm:flex glassmorphism hover:bg-primary/80 text-primary-foreground" />
      </Carousel>
    </SectionWrapper>
  );
};

export default Projects;
