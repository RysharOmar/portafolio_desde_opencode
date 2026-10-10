import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageTransition } from '@/components/PageTransition';
import { Marquee } from '@/components/Marquee';
import { getProjects } from '@/data/projects';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function Work() {
  const { t, lang } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filters = [
    { id: 'All', label: t('work.filter.all') },
    { id: 'CRM', label: t('work.filter.crm') },
    { id: 'ERP', label: t('work.filter.erp') },
    { id: 'APIs', label: t('work.filter.api') },
    { id: 'BBDD', label: t('work.filter.db') },
  ];

  const projects = getProjects(t);

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const activeProjectData = projects.find(p => p.id === selectedProject);

  const openProjectDetails = (projectId: number) => {
    setSelectedProject(projectId);
    setIsDialogOpen(true);
  };

  return (
    <PageTransition>
      <div className="flex flex-col w-full">
        
        {/* Header */}
        <section className="pt-32 pb-16 px-8 md:px-16 lg:px-24 max-w-6xl mx-auto w-full">
          <p className="font-sans text-sm uppercase tracking-widest text-muted-foreground mb-8">
            {lang === 'ES' ? 'Casos de Estudio' : 'Case Studies'}
          </p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-6xl md:text-8xl leading-[0.95] text-foreground mb-16"
          >
            Operaciones<br/>
            Desplegadas.
          </motion.h1>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 font-sans text-sm uppercase tracking-widest text-muted-foreground">
            {filters.map((filter, idx) => (
              <React.Fragment key={filter.id}>
                <button
                  onClick={() => setActiveFilter(filter.id)}
                  className={`hover:text-foreground transition-colors ${
                    activeFilter === filter.id ? 'text-foreground border-b border-foreground' : ''
                  }`}
                >
                  {filter.label}
                </button>
                {idx < filters.length - 1 && <span>/</span>}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Project List */}
        <section className="px-8 md:px-16 lg:px-24 pb-32 max-w-6xl mx-auto w-full">
          <div className="flex flex-col border-t border-foreground/10">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => {
                const isEven = i % 2 !== 0;
                
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="py-16 border-b border-foreground/10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center"
                  >
                    {!isEven ? (
                      // ODD Layout: Text Left, Meta Right
                      <>
                        <div className="md:col-span-7 flex flex-col items-start">
                          <span className="font-sans text-xs text-muted-foreground mb-6">
                            0{project.id}
                          </span>
                          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
                            {project.title}
                          </h2>
                          <button 
                            onClick={() => openProjectDetails(project.id)}
                            className="border-b border-foreground pb-1 text-lg font-medium hover:border-primary hover:text-primary transition-colors"
                          >
                            {t('work.card.btn')}
                          </button>
                        </div>
                        <div className="md:col-span-5 flex flex-col justify-center">
                          <p className="font-sans text-lg text-muted-foreground mb-8">
                            {project.desc}
                          </p>
                          <div className="mb-8">
                            <span className="block font-sans text-xs uppercase tracking-widest text-muted-foreground mb-2">
                              {lang === 'ES' ? 'Impacto' : 'Impact'}
                            </span>
                            <span className="font-display text-3xl text-primary">
                              {project.metric}
                            </span>
                          </div>
                          <div className="flex gap-2 flex-wrap text-sm text-muted-foreground">
                            {project.tags.join(' · ')}
                          </div>
                        </div>
                      </>
                    ) : (
                      // EVEN Layout: Image/Metric block Left, Text Right
                      <>
                        <div className="md:col-span-5 bg-card aspect-square flex flex-col items-center justify-center p-8 text-center border border-border shadow-sm order-2 md:order-1">
                          <span className="block font-sans text-xs uppercase tracking-widest text-muted-foreground mb-4">
                            {lang === 'ES' ? 'Métrica Clave' : 'Key Metric'}
                          </span>
                          <span className="font-display text-primary leading-tight"
                            style={{ fontSize: 'clamp(1.25rem, 3.5vw, 2.75rem)' }}>
                            {project.metric}
                          </span>
                        </div>
                        <div className="md:col-span-7 flex flex-col items-start order-1 md:order-2">
                          <span className="font-sans text-xs text-muted-foreground mb-6">
                            0{project.id}
                          </span>
                          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
                            {project.title}
                          </h2>
                          <p className="font-sans text-lg text-muted-foreground mb-8">
                            {project.desc}
                          </p>
                          <div className="flex gap-2 flex-wrap text-sm text-muted-foreground mb-8">
                            {project.tags.join(' · ')}
                          </div>
                          <button 
                            onClick={() => openProjectDetails(project.id)}
                            className="border-b border-foreground pb-1 text-lg font-medium hover:border-primary hover:text-primary transition-colors"
                          >
                            {t('work.card.btn')}
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </section>

        <Marquee items={['Integraciones', 'Migraciones', 'APIs', 'Automatización', 'Seguridad']} speed={20} />

        {/* Detail Modal */}
        <Dialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        >
          <DialogContent
            className="sm:max-w-[600px] border-border bg-background rounded-none shadow-2xl p-8"
            onAnimationEnd={(event) => {
              if (event.currentTarget.dataset.state === 'closed') {
                setSelectedProject(null);
              }
            }}
          >
            {activeProjectData && (
              <>
                <DialogHeader className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
                      {activeProjectData.category}
                    </span>
                  </div>
                  <DialogTitle className="font-display text-4xl font-normal leading-tight text-foreground">
                    {activeProjectData.title}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-8">
                  <DialogDescription className="font-sans text-lg text-muted-foreground leading-relaxed text-left">
                    {activeProjectData.full}
                  </DialogDescription>

                  <div className="border-t border-foreground/10 pt-8 flex flex-col gap-6">
                    <div>
                      <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-2">
                        {lang === 'ES' ? 'Impacto' : 'Impact'}
                      </p>
                      <p className="font-display text-3xl text-primary">
                        {activeProjectData.metric}
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-2">
                        Stack
                      </p>
                      <p className="font-sans text-base text-foreground">
                        {activeProjectData.tags.join(' · ')}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
}
