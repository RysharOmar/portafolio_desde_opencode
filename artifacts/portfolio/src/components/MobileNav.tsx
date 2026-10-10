import React from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { Home, User, Briefcase, Mail } from 'lucide-react';

export function MobileNav() {
  const [location] = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { href: '/', label: t('nav.home'), icon: Home },
    { href: '/about', label: t('nav.about'), icon: User },
    { href: '/work', label: t('nav.work'), icon: Briefcase },
    { href: '/contact', label: t('nav.contact'), icon: Mail },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 z-50 w-full border-t border-border bg-background/90 backdrop-blur-md pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = location === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <div className="flex flex-col items-center justify-center w-full h-full space-y-1 cursor-pointer">
                <Icon 
                  className={`h-5 w-5 transition-colors ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`} 
                />
                <span 
                  className={`text-[10px] font-mono tracking-wider ${
                    isActive ? 'text-primary glow-text' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
