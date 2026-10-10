import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sun, Moon, Menu, X, Home, User, Briefcase, Mail } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const navItems = [
  { href: '/', labelKey: 'nav.home', icon: Home },
  { href: '/about', labelKey: 'nav.about', icon: User },
  { href: '/work', labelKey: 'nav.work', icon: Briefcase },
  { href: '/contact', labelKey: 'nav.contact', icon: Mail },
];

export function Header() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change or Escape key
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // The language button shows the OPPOSITE language (what you'll switch TO)
  const langLabel = lang === 'ES' ? 'EN' : 'ES';
  const handleLangToggle = () => toggleLang(lang === 'ES' ? 'EN' : 'ES');

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled || menuOpen
            ? 'bg-background/90 backdrop-blur-md border-b border-border shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <Link href="/">
            <div className="flex cursor-pointer items-center gap-3 group">
              <img
                src="/synapse-sentinel.ico"
                alt="Synapse Sentinel"
                className="h-12 w-12 object-contain"
              />
              <span className="font-display text-xl text-foreground group-hover:text-primary transition-colors duration-200 hidden sm:inline">
                Synapse Sentinel
              </span>
            </div>
          </Link>

          {/* Right controls: Theme + Lang + Hamburger */}
          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Toggle Theme"
            >
              {theme === 'dark'
                ? <Sun className="h-5 w-5" />
                : <Moon className="h-5 w-5" />
              }
            </button>

            {/* Language toggle */}
            <button
              onClick={handleLangToggle}
              className="font-sans text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Toggle Language"
            >
              {langLabel}
            </button>

            {/* Hamburger menu button */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex items-center justify-center text-muted-foreground transition-colors hover:text-foreground ml-2"
              aria-label="Toggle Menu"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Nav Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="nav-overlay"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl"
          >
            <nav className="relative z-10 flex flex-col items-center gap-8">
              {navItems.map((item, i) => {
                const isActive = location === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: i * 0.07, duration: 0.25 }}
                  >
                    <Link href={item.href} onClick={() => setMenuOpen(false)}>
                      <div
                        className={`group flex cursor-pointer items-center gap-4 transition-all duration-200`}
                      >
                        <span
                          className={`font-display text-4xl md:text-6xl transition-colors ${
                            isActive ? 'text-primary' : 'text-foreground group-hover:text-primary'
                          }`}
                        >
                          {t(item.labelKey)}
                        </span>
                        {isActive && (
                          <span className="h-3 w-3 rounded-full bg-primary animate-pulse" />
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
