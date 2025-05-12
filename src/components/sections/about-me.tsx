"use client";

import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Download, Mail } from 'lucide-react';
import SectionWrapper from '@/components/section-wrapper';
import { cn } from '@/lib/utils';

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
      staggerChildren: 0.06,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const AboutMe = () => {
  const line1 = "Hi, I'm Your Name";
  const line2 = "A Passionate Web Developer";
  const bio = "I specialize in creating modern, responsive, and user-friendly web applications. With a keen eye for detail and a love for clean code, I strive to build exceptional digital experiences. Let's build something amazing together!";

  return (
    <SectionWrapper id="about" className="relative overflow-hidden">
       {/* Background decorative element */}
       <div className="absolute top-0 left-1/4 w-72 h-72 bg-accent/10 dark:bg-accent/5 rounded-full filter blur-3xl opacity-50 -z-10 animate-pulse"></div>
       <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary/10 dark:bg-primary/5 rounded-full filter blur-3xl opacity-50 -z-10 animate-pulse animation-delay-4000"></div>


      <div className={cn(
        "flex flex-col md:flex-row items-center gap-12 p-8 md:p-12 rounded-lg",
        "glassmorphism" // Apply glassmorphism here
        )}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-shrink-0"
        >
          <Avatar className="w-32 h-32 md:w-48 md:h-48 border-4 border-accent/50 shadow-lg">
            <AvatarImage src="https://picsum.photos/200/200" alt="Your Name" data-ai-hint="professional portrait" />
            <AvatarFallback className="text-4xl md:text-6xl bg-primary text-primary-foreground">YN</AvatarFallback>
          </Avatar>
        </motion.div>
        <div className="flex-grow text-center md:text-left">
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-primary dark:text-primary-foreground"
            variants={sentence}
            initial="hidden"
            whileInView="visible" // Animate when in view
            viewport={{ once: true }} // Only animate once
          >
            {line1.split("").map((char, index) => (
              <motion.span key={char + "-" + index} variants={letter}>
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.h2
             className="text-xl md:text-2xl font-semibold mb-4 text-accent"
             variants={sentence}
             initial="hidden"
             whileInView="visible" // Animate when in view
             viewport={{ once: true }} // Only animate once
             transition={{ delay: 0.5, staggerChildren: 0.04 }} // Stagger slightly later
           >
             {line2.split("").map((char, index) => (
               <motion.span key={char + "-" + index} variants={letter}>
                 {char}
               </motion.span>
             ))}
          </motion.h2>

          <motion.p
            className="text-base md:text-lg mb-6 text-foreground/80 dark:text-foreground/70 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {bio}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: 1.0 }}
          >
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-primary font-semibold shadow-md transition-transform hover:scale-105" data-cursor-pointer>
              <Link href="#contact">
                <Mail className="mr-2 h-5 w-5" /> Get In Touch
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/10 hover:text-accent font-semibold shadow-sm transition-transform hover:scale-105" data-cursor-pointer>
              <Link href="/resume.pdf" download target="_blank" rel="noopener noreferrer">
                 <Download className="mr-2 h-5 w-5" /> Download CV
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AboutMe;
