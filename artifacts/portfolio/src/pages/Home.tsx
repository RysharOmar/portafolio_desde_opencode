import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageTransition } from '@/components/PageTransition';

function ArrowCTA({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href}>
      <motion.div
        className="group flex flex-col gap-2 cursor-pointer w-fit"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        {/* Arrow + label row */}
        <div className="flex items-center gap-3">
          {/* Arrow */}
          <motion.span
            className="text-foreground group-hover:text-primary transition-colors duration-300 text-xl leading-none"
            variants={{
              rest: { x: 0 },
              hover: { x: 4 },
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            →
          </motion.span>
          <span className="font-sans text-base md:text-lg tracking-wide text-foreground group-hover:text-primary transition-colors duration-300">
            {label}
          </span>
        </div>

        {/* Loading-bar underline */}
        <div className="h-[1.5px] w-full bg-foreground/15 relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-primary"
            variants={{
              rest: { width: '0%' },
              hover: { width: '100%' },
            }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </Link>
  );
}

export default function Home() {
  const { lang } = useLanguage();

  const headline =
    lang === 'ES'
      ? 'Arquitectura,\nSeguridad y\nAutomatización.'
      : 'Architecture,\nSecurity &\nAutomation.';

  const body =
    lang === 'ES'
      ? 'Hola, soy Ryshar Nuñez. Construyo sistemas que tu negocio no puede permitirse que fallen. Combino desarrollo full-stack y ciberseguridad ofensiva para automatizar procesos críticos: IA, CRMs y bases de datos legacy integrados sin abrir brechas. Hablo el idioma de los hackers y de las juntas directivas, y diseño infraestructuras resilientes desde el primer día, no como parche. Trabajo con pocos proyectos a la vez, solo de alto impacto y tolerancia cero al fallo. Si tu operación no puede parar, hablemos.'
      : 'Hi, I\'m Ryshar Nuñez. I build systems your business cannot afford to let fail. I combine full-stack development and offensive cybersecurity to automate critical processes: AI, CRMs, and legacy databases integrated without opening vulnerabilities. I speak the language of hackers and boardrooms, and I design resilient infrastructure from day one, not as a patch. I work with only a few projects at a time, focused on high impact and zero tolerance for failure. If your operation cannot stop, let\'s talk.';

  const seeProjects = lang === 'ES' ? 'Ver mis proyectos' : 'See my projects';
  const aboutMe = lang === 'ES' ? 'Más sobre mí' : 'More about me';

  return (
    <PageTransition>
      <section className="relative flex h-[100dvh] max-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-5 pb-5 pt-16 text-center sm:px-8 md:px-16 lg:px-24">
        <div className="mx-auto w-full max-w-5xl">
          {/* Editorial headline */}
          <motion.h1
            className="mb-5 whitespace-pre-line font-display leading-[0.9] text-foreground md:mb-7"
            style={{ fontSize: 'clamp(2.25rem, 7.2vw, 7rem)' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {headline}
          </motion.h1>

          {/* Introductory copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="mx-auto max-w-4xl font-sans leading-[1.45] text-muted-foreground"
              style={{ fontSize: 'clamp(0.875rem, 1.35vw, 1.25rem)' }}
            >
              {body}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="mt-6 flex flex-row justify-center gap-8 sm:gap-12 md:mt-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <ArrowCTA href="/work" label={seeProjects} />
            <ArrowCTA href="/about" label={aboutMe} />
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
