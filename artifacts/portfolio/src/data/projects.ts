export interface Project {
  id: number;
  title: string;
  desc: string;
  full: string;
  metric: string;
  tags: string[];
  category: string;
}

export function getProjects(t: (key: string) => string): Project[] {
  return [
    {
      id: 1,
      title: t('work.p1.title'),
      desc: t('work.p1.desc'),
      full: t('work.p1.full'),
      metric: t('work.p1.metric'),
      tags: ['Salesforce', 'GPT-4', 'Python'],
      category: 'CRM',
    },
    {
      id: 2,
      title: t('work.p2.title'),
      desc: t('work.p2.desc'),
      full: t('work.p2.full'),
      metric: t('work.p2.metric'),
      tags: ['SAP B1', 'WooCommerce', 'REST API'],
      category: 'ERP',
    },
    {
      id: 3,
      title: t('work.p3.title'),
      desc: t('work.p3.desc'),
      full: t('work.p3.full'),
      metric: t('work.p3.metric'),
      tags: ['Splunk', 'Webhook', 'Slack'],
      category: 'APIs',
    },
    {
      id: 4,
      title: t('work.p4.title'),
      desc: t('work.p4.desc'),
      full: t('work.p4.full'),
      metric: t('work.p4.metric'),
      tags: ['PostgreSQL', 'Python', 'LLM'],
      category: 'BBDD',
    },
    {
      id: 5,
      title: t('work.p5.title'),
      desc: t('work.p5.desc'),
      full: t('work.p5.full'),
      metric: t('work.p5.metric'),
      tags: ['OpenAI', 'WhatsApp API', 'CRM'],
      category: 'APIs',
    },
    {
      id: 6,
      title: t('work.p6.title'),
      desc: t('work.p6.desc'),
      full: t('work.p6.full'),
      metric: t('work.p6.metric'),
      tags: ['Node.js', 'PostgreSQL', 'WebSocket', 'React'],
      category: 'BBDD',
    },
  ];
}