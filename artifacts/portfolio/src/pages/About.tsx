import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageTransition } from '@/components/PageTransition';

export default function About() {
  const { lang } = useLanguage();
  const isSpanish = lang === 'ES';

  const copy = isSpanish
    ? {
        sectionLabel: 'Sobre mí',
        intro: 'Hola, soy Ryshar Nuñez. Construyo sistemas que tu negocio no puede permitirse que fallen.',
        paragraphs: [
          'Soy desarrollador full-stack con foco en automatización de procesos críticos. Combino ciberseguridad ofensiva y desarrollo full-stack para diseñar infraestructuras que no solo funcionan: resisten. Integro IA, CRMs y bases de datos legacy sin abrir brechas.',
          'Hablo el idioma de los hackers y el de las juntas directivas. Traduzco riesgo técnico en decisiones ejecutivas y decisiones ejecutivas en arquitectura segura. Mientras otros ensamblan componentes, yo diseño operaciones resilientes pensadas para escalar.',
          'Trabajo con operaciones donde un minuto caído cuesta miles de euros. Por eso no dejo nada al azar: seguridad desde la primera línea, sin atajos ni parches.',
          'Me involucro en pocos proyectos a la vez, solo los que exigen alto impacto y tolerancia cero al fallo.',
          'Si tu operación depende de procesos que no pueden parar, no buscas otro desarrollador. Buscas a alguien que elimine el riesgo desde el diseño.',
        ],
        contact: 'Hablemos.',
        cv: 'Descargar CV',
      }
    : {
        sectionLabel: 'About',
        intro: "Hi, I'm Ryshar Nuñez. I build systems your business cannot afford to let fail.",
        paragraphs: [
          'I am a full-stack developer focused on automating critical processes. I combine offensive cybersecurity with full-stack development to design infrastructure that does not just work: it withstands. I integrate AI, CRMs, and legacy databases without opening new vulnerabilities.',
          'I speak the language of hackers and boardrooms. I translate technical risk into executive decisions, and executive decisions into secure architecture. While others assemble components, I design resilient operations built to scale.',
          'I work with operations where one minute of downtime costs thousands of euros. That is why I leave nothing to chance: security from the first line, with no shortcuts or patches.',
          'I take on only a few projects at a time, only those that demand high impact and zero tolerance for failure.',
          'If your operation depends on processes that cannot stop, you are not looking for another developer. You are looking for someone who eliminates risk by design.',
        ],
        contact: "Let's talk.",
        cv: 'Download CV',
      };

  return (
    <PageTransition>
      <main className="w-full px-8 pb-24 pt-32 md:px-16 md:pt-40 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-10 w-full md:mb-14">
              <span className="font-display text-4xl leading-none text-primary md:text-6xl">
                {copy.sectionLabel}
              </span>
              <div className="mt-6 h-[2px] w-full bg-foreground/20" />
            </div>

            <h1 className="max-w-3xl font-sans text-lg font-normal leading-[1.65] text-foreground md:text-xl">
              {copy.intro}
            </h1>

            <div className="mt-14 max-w-3xl space-y-7 md:mt-20 md:space-y-9">
              {copy.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={paragraph}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.15 + index * 0.08,
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`font-sans text-lg leading-[1.65] md:text-xl ${
                    index === 0 ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <div className="mt-16 flex flex-col items-start gap-8 border-t border-foreground/10 pt-10 md:mt-24 md:flex-row md:items-center md:justify-between">
              <Link
                href="/contact"
                className="font-display text-4xl text-foreground transition-colors hover:text-primary md:text-5xl"
              >
                {copy.contact}
              </Link>
              <a
                href="/cv.pdf?v=2"
                download="ryshar_perez_nunez_cv.pdf"
                target="_blank"
                className="border-b border-foreground pb-1 font-sans text-base font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {copy.cv}
              </a>
            </div>
          </motion.article>
        </div>
      </main>
    </PageTransition>
  );
}
