import { Link, useRoute } from 'wouter';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageTransition } from '@/components/PageTransition';
import { getProjects } from '@/data/projects';
import NotFound from '@/pages/not-found';

export default function ProjectDetail() {
  const { t, lang } = useLanguage();
  const [, params] = useRoute('/work/:projectId');
  const projectId = Number(params?.projectId);
  const project = getProjects(t).find((item) => item.id === projectId);

  if (!project) {
    return <NotFound />;
  }

  return (
    <PageTransition>
      <article className="mx-auto w-full max-w-5xl px-8 pb-32 pt-32 md:px-16 lg:px-24">
        <Link href="/work">
          <span className="mb-16 inline-flex cursor-pointer items-center gap-2 font-sans text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            {lang === 'ES' ? 'Volver a trabajos' : 'Back to work'}
          </span>
        </Link>

        <header className="max-w-4xl">
          <p className="mb-6 font-sans text-xs uppercase tracking-widest text-muted-foreground">
            {project.category} / 0{project.id}
          </p>
          <h1 className="font-display text-5xl font-normal leading-[0.98] text-foreground md:text-8xl">
            {project.title}
          </h1>
          <p className="mt-10 max-w-2xl font-sans text-xl leading-relaxed text-muted-foreground md:text-2xl">
            {project.full}
          </p>
        </header>

        <div className="mt-20 grid gap-10 border-t border-foreground/10 pt-10 md:grid-cols-2">
          <div>
            <p className="mb-3 font-sans text-xs uppercase tracking-widest text-muted-foreground">
              {lang === 'ES' ? 'Impacto' : 'Impact'}
            </p>
            <p className="font-display text-4xl text-primary">{project.metric}</p>
          </div>
          <div>
            <p className="mb-3 font-sans text-xs uppercase tracking-widest text-muted-foreground">
              Stack
            </p>
            <p className="font-sans text-lg text-foreground">{project.tags.join(' · ')}</p>
          </div>
        </div>

        <Link href="/contact">
          <span className="mt-20 inline-flex cursor-pointer items-center gap-3 border-b border-foreground pb-2 font-sans text-lg font-medium text-foreground transition-colors hover:border-primary hover:text-primary">
            {lang === 'ES' ? 'Hablemos de un proyecto' : 'Talk about a project'}
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </Link>
      </article>
    </PageTransition>
  );
}