import AboutMe from '@/components/sections/about-me';
import Projects from '@/components/sections/projects';
import Skills from '@/components/sections/skills';
import Resume from '@/components/sections/resume';
import ContactForm from '@/components/sections/contact-form';
import Certifications from '@/components/sections/certifications';
import Achievements from '@/components/sections/achievements';
import Timeline from '@/components/sections/timeline';
import FloatingActionButton from '@/components/floating-action-button';

export default function Home() {
  return (
    <div className="flex flex-col space-y-24 md:space-y-32">
      <AboutMe />
      <Projects />
      <Skills />
      <Resume />
      <Certifications />
      <Achievements />
      <Timeline />
      <ContactForm />
      <FloatingActionButton />
    </div>
  );
}
