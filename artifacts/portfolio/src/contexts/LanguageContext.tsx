import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { LangTransitionOverlay } from '@/components/LangTransitionOverlay';

type Language = 'ES' | 'EN';

interface LanguageContextType {
  lang: Language;
  toggleLang: (l: Language) => void;
  t: (key: string) => string;
  isTransitioning: boolean;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': { ES: 'Inicio', EN: 'Home' },
  'nav.about': { ES: 'Sobre Mí', EN: 'About' },
  'nav.work': { ES: 'Trabajos', EN: 'Work' },
  'nav.contact': { ES: 'Contacto', EN: 'Contact' },
  
  // Home
  'home.title': { ES: 'Ing. en Ciberseguridad & Desarrollador Web', EN: 'Cybersecurity Engineer & Web Developer' },
  'home.subtitle.1': { ES: 'Automatización con IA', EN: 'AI Automation' },
  'home.subtitle.2': { ES: 'Integraciones con CRMs', EN: 'CRM Integrations' },
  'home.subtitle.3': { ES: 'APIs & Bases de Datos', EN: 'APIs & Databases' },
  'home.cta': { ES: 'Solicitar Consultoría', EN: 'Book a Consultation' },
  'home.scarcity': { ES: 'Solo 3 slots disponibles este mes', EN: 'Only 3 slots available this month' },
  'home.stat.1': { ES: 'proyectos', EN: 'projects' },
  'home.stat.2': { ES: 'años de experiencia', EN: 'years experience' },
  'home.stat.3': { ES: 'tasa de éxito', EN: 'success rate' },

  // About
  'about.title': { ES: 'Arquitectura, Seguridad y Automatización.', EN: 'Architecture, Security and Automation.' },
  'about.bio.1': { 
    ES: 'Combino tácticas de ciberseguridad ofensiva con desarrollo full-stack para construir sistemas que no solo funcionan, sino que resisten. Mi enfoque está en automatizar flujos de trabajo críticos de negocio integrando IA, CRMs y bases de datos legacy sin comprometer la seguridad.',
    EN: 'I combine offensive cybersecurity tactics with full-stack development to build systems that not only work, but endure. My focus is on automating critical business workflows by integrating AI, CRMs, and legacy databases without compromising security.'
  },
  'about.bio.2': {
    ES: 'Entiendo el lenguaje de los hackers y el de las juntas directivas. Mientras otros ensamblan componentes, yo diseño infraestructuras resilientes pensadas para escalar.',
    EN: 'I speak the language of both hackers and boardrooms. While others assemble components, I design resilient infrastructures built to scale.'
  },
  'about.timeline.title': { ES: 'Evolución Profesional', EN: 'Professional Evolution' },
  'about.timeline.1.year': { ES: '2016', EN: '2016' },
  'about.timeline.1.desc': { ES: 'Primer sistema de automatización empresarial', EN: 'First enterprise automation system' },
  'about.timeline.2.year': { ES: '2019', EN: '2019' },
  'about.timeline.2.desc': { ES: 'Certificación en Ciberseguridad ofensiva', EN: 'Offensive Cybersecurity Certification' },
  'about.timeline.3.year': { ES: '2021', EN: '2021' },
  'about.timeline.3.desc': { ES: 'Integración IA en pipelines productivos', EN: 'AI integration in production pipelines' },
  'about.timeline.4.year': { ES: '2024', EN: '2024' },
  'about.timeline.4.desc': { ES: '50+ automatizaciones desplegadas en producción', EN: '50+ automations deployed in production' },
  'about.skills.title': { ES: 'Arsenal Técnico', EN: 'Technical Arsenal' },
  'about.skills.sec': { ES: 'Seguridad', EN: 'Security' },
  'about.skills.dev': { ES: 'Desarrollo', EN: 'Development' },
  'about.skills.ai': { ES: 'IA & Automatización', EN: 'AI & Automation' },
  'about.skills.int': { ES: 'Integraciones', EN: 'Integrations' },
  'about.proof': { ES: 'Mis automatizaciones han procesado más de 2 millones de registros en producción', EN: 'My automations have processed over 2 million records in production' },
  'about.testimonial': { ES: '"Redujo nuestro tiempo de procesamiento de 8 horas a 12 minutos."', EN: '"Reduced our processing time from 8 hours to 12 minutes."' },
  'about.testimonial.author': { ES: 'CTO, Compañía FinTech', EN: 'CTO, FinTech Company' },
  'about.cv': { ES: 'Descargar CV', EN: 'Download CV' },

  // Work
  'work.title': { ES: 'Operaciones Desplegadas', EN: 'Deployed Operations' },
  'work.filter.all': { ES: 'Todos', EN: 'All' },
  'work.filter.crm': { ES: 'CRM', EN: 'CRM' },
  'work.filter.erp': { ES: 'ERP', EN: 'ERP' },
  'work.filter.api': { ES: 'APIs', EN: 'APIs' },
  'work.filter.db': { ES: 'BBDD', EN: 'Databases' },
  'work.card.btn': { ES: 'Ver detalles', EN: 'View details' },

  // Work Items
  'work.p1.title': { ES: 'Pipeline de Leads con IA', EN: 'AI Lead Pipeline' },
  'work.p1.desc': { ES: 'Scoring y nutrición automatizada de leads.', EN: 'Automated lead scoring and nurturing.' },
  'work.p1.full': { ES: 'Sistema integrado que ingesta leads, los califica usando GPT-4 según parámetros del negocio y los asigna dinámicamente en Salesforce.', EN: 'Integrated system that ingests leads, scores them using GPT-4 based on business parameters, and dynamically assigns them in Salesforce.' },
  'work.p1.metric': { ES: 'Aumento del 35% en conversión', EN: '35% increase in conversion' },

  'work.p2.title': { ES: 'Sincronización ERP ↔ eCommerce', EN: 'ERP ↔ eCommerce Sync' },
  'work.p2.desc': { ES: 'Sincronización de inventario en tiempo real.', EN: 'Real-time inventory synchronization.' },
  'work.p2.full': { ES: 'Middleware de alta disponibilidad que conecta SAP B1 con WooCommerce, resolviendo cuellos de botella de inventario.', EN: 'High-availability middleware connecting SAP B1 with WooCommerce, resolving inventory bottlenecks.' },
  'work.p2.metric': { ES: '0 overselling durante Black Friday', EN: '0 overselling during Black Friday' },

  'work.p3.title': { ES: 'Sistema de Alertas de Ciberseguridad', EN: 'Cybersecurity Alert System' },
  'work.p3.desc': { ES: 'Pipeline automatizado de detección de amenazas.', EN: 'Automated threat detection pipeline.' },
  'work.p3.full': { ES: 'Extracción de logs de Splunk, evaluación heurística y notificación enriquecida vía webhooks a Slack.', EN: 'Splunk log extraction, heuristic evaluation, and enriched notification via Slack webhooks.' },
  'work.p3.metric': { ES: 'MTTD reducido a < 2 min', EN: 'MTTD reduced to < 2 min' },

  'work.p4.title': { ES: 'ETL Inteligente para BBDD Legada', EN: 'Smart ETL for Legacy DB' },
  'work.p4.desc': { ES: 'Migración y normalización de 500k registros.', EN: 'Migration and normalization of 500k records.' },
  'work.p4.full': { ES: 'Pipeline ETL en Python utilizando LLMs para limpiar, formatear y estructurar datos sucios de un sistema on-premise.', EN: 'Python ETL pipeline using LLMs to clean, format, and structure dirty data from an on-premise system.' },
  'work.p4.metric': { ES: '99.8% precisión de normalización', EN: '99.8% normalization accuracy' },

  'work.p5.title': { ES: 'Asistente IA para Soporte al Cliente', EN: 'AI Assistant for Customer Support' },
  'work.p5.desc': { ES: 'Integración WhatsApp API + OpenAI + CRM.', EN: 'WhatsApp API + OpenAI + CRM integration.' },
  'work.p5.full': { ES: 'Agente conversacional que consulta el estado de pedidos en el CRM y responde clientes 24/7 vía WhatsApp.', EN: 'Conversational agent that queries order status in the CRM and responds to clients 24/7 via WhatsApp.' },
  'work.p5.metric': { ES: 'Reducción del 60% en tickets L1', EN: '60% reduction in L1 tickets' },

  'work.p6.title': { ES: 'Dashboard de KPIs en Tiempo Real', EN: 'Real-Time KPI Dashboard' },
  'work.p6.desc': { ES: 'Monitoreo de telemetría y métricas operativas.', EN: 'Telemetry and operational metrics monitoring.' },
  'work.p6.full': { ES: 'Plataforma full-stack con WebSockets para visualización de KPIs de negocio, con roles de acceso y auditoría de seguridad.', EN: 'Full-stack platform with WebSockets for business KPI visualization, featuring access roles and security auditing.' },
  'work.p6.metric': { ES: 'Latencia < 50ms', EN: '< 50ms latency' },

  // Contact
  'contact.title': { ES: 'Hablemos de tu próximo proyecto', EN: 'Let\'s talk about your next project' },
  'contact.scarcity': { ES: 'Solo acepto 3 nuevos clientes por mes para garantizar la máxima calidad.', EN: 'I only take 3 new clients per month to guarantee maximum quality.' },
  'contact.perk.1': { ES: 'Llamada de descubrimiento inicial', EN: 'Initial discovery call' },
  'contact.perk.2': { ES: 'Plan de automatización a medida', EN: 'Custom automation plan' },
  'contact.perk.3': { ES: 'Implementación end-to-end', EN: 'End-to-end implementation' },
  'contact.perk.4': { ES: 'Soporte post-despliegue (30 días)', EN: 'Post-deployment support (30 days)' },
  
  'contact.form.name': { ES: 'Nombre', EN: 'Name' },
  'contact.form.email': { ES: 'Correo Electrónico', EN: 'Email' },
  'contact.form.company': { ES: 'Empresa (Opcional)', EN: 'Company (Optional)' },
  'contact.form.message': { ES: 'Mensaje', EN: 'Message' },
  'contact.form.submit': { ES: 'Solicitar Consultoría', EN: 'Request Consultation' },
  'contact.form.submitting': { ES: 'Enviando...', EN: 'Sending...' },
  'contact.form.success': { ES: 'Transmisión recibida. Me pondré en contacto pronto.', EN: 'Transmission received. I will contact you shortly.' },
  'contact.or': { ES: 'O reserva directamente en mi calendario', EN: 'Or book directly on my calendar' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lang');
      if (saved === 'ES' || saved === 'EN') return saved;
    }
    return 'ES';
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingLang, setPendingLang] = useState<Language | null>(null);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const toggleLang = useCallback((l: Language) => {
    if (l === lang || isTransitioning) return;

    setPendingLang(l);
    setIsTransitioning(true);

    // Swap content mid-animation so it's ready when overlay lifts
    setTimeout(() => setLang(l), 700);

    // Hide overlay after full animation
    setTimeout(() => {
      setIsTransitioning(false);
      setPendingLang(null);
    }, 1600);
  }, [lang, isTransitioning]);

  const t = (key: string) => translations[key]?.[lang] || key;

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, isTransitioning }}>
      {children}
      <LangTransitionOverlay active={isTransitioning} incoming={pendingLang} />
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
