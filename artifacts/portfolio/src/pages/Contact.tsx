import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageTransition } from '@/components/PageTransition';
import { Marquee } from '@/components/Marquee';

export default function Contact() {
  const { t, lang } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const perks = [
    t('contact.perk.1'),
    t('contact.perk.2'),
    t('contact.perk.3'),
    t('contact.perk.4'),
  ];

  return (
    <PageTransition>
      <div className="flex flex-col w-full min-h-[100dvh]">
        
        {/* Header */}
        <section className="pt-32 pb-16 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto w-full">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-7xl md:text-9xl leading-[0.85] text-foreground"
          >
            {lang === 'ES' ? 'Hablemos.' : "Let's talk."}
          </motion.h1>
        </section>

        {/* Content */}
        <section className="flex-1 px-8 md:px-16 lg:px-24 pb-24 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative">
            
            {/* Left Column: Info */}
            <div className="flex flex-col">
              <motion.div 
                initial={{ opacity: 0, rotate: -2 }}
                animate={{ opacity: 1, rotate: -1 }}
                transition={{ delay: 0.2 }}
                className="bg-accent/30 p-6 mb-12 shadow-sm w-fit max-w-sm"
              >
                <p className="font-sans text-lg font-medium text-accent-foreground leading-relaxed">
                  {t('contact.scarcity')}
                </p>
                <div className="mt-4 flex justify-end">
                  <span className="text-xl">✦</span>
                </div>
              </motion.div>

              <div className="space-y-4 mb-16">
                {perks.map((perk, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className="flex items-start gap-4 text-muted-foreground font-sans text-lg"
                  >
                    <span className="text-primary mt-1">→</span>
                    <span>{perk}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-block border-b border-foreground pb-1 text-lg font-medium hover:border-primary hover:text-primary transition-colors"
                >
                  LinkedIn ↗
                </a>
              </motion.div>
            </div>

            {/* Right Column: Form */}
            <div className="relative">
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-10 bg-background/95 flex flex-col items-center justify-center text-center p-8"
                  >
                    <span className="text-4xl text-primary mb-6">✦</span>
                    <p className="font-display text-3xl text-foreground mb-4">
                      {lang === 'ES' ? 'Recibido.' : 'Received.'}
                    </p>
                    <p className="font-sans text-muted-foreground">
                      {t('contact.form.success')}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 flex flex-col h-full justify-between">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="font-sans text-sm uppercase tracking-widest text-muted-foreground">
                      {t('contact.form.name')} *
                    </label>
                    <input 
                      {...register('name', { required: true })}
                      className="w-full bg-transparent border-b border-foreground/20 px-0 py-3 text-lg font-sans focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-sans text-sm uppercase tracking-widest text-muted-foreground">
                      {t('contact.form.email')} *
                    </label>
                    <input 
                      type="email"
                      {...register('email', { required: true })}
                      className="w-full bg-transparent border-b border-foreground/20 px-0 py-3 text-lg font-sans focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-sans text-sm uppercase tracking-widest text-muted-foreground">
                      {t('contact.form.company')}
                    </label>
                    <input 
                      {...register('company')}
                      className="w-full bg-transparent border-b border-foreground/20 px-0 py-3 text-lg font-sans focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-sans text-sm uppercase tracking-widest text-muted-foreground">
                      {t('contact.form.message')} *
                    </label>
                    <textarea 
                      {...register('message', { required: true })}
                      rows={3}
                      className="w-full bg-transparent border-b border-foreground/20 px-0 py-3 text-lg font-sans focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>
                </div>

                <div className="pt-8">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground font-sans text-base font-medium py-4 rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                  </button>
                  
                  <div className="mt-8 text-center">
                    <a 
                      href="https://calendly.com" 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-block border-b border-foreground/30 text-muted-foreground pb-1 hover:text-foreground hover:border-foreground transition-colors"
                    >
                      {t('contact.or')} ↗
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        <Marquee items={['Contact', 'Connect', 'Collaborate', 'Build', 'Scale']} speed={30} direction="right" />
      </div>
    </PageTransition>
  );
}
