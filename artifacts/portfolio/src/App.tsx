import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { lazy, Suspense, useEffect } from 'react';

import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Preloader } from '@/components/Preloader';
import { NeonCursor } from '@/components/NeonCursor';
import { Header } from '@/components/Header';
const loadHome = () => import('@/pages/Home');
const loadAbout = () => import('@/pages/About');
const loadWork = () => import('@/pages/Work');
const loadProjectDetail = () => import('@/pages/ProjectDetail');
const loadContact = () => import('@/pages/Contact');
const loadNotFound = () => import('@/pages/not-found');

const Home = lazy(loadHome);
const About = lazy(loadAbout);
const Work = lazy(loadWork);
const ProjectDetail = lazy(loadProjectDetail);
const Contact = lazy(loadContact);
const NotFound = lazy(loadNotFound);

const queryClient = new QueryClient();

function Router() {
  return (
    <Suspense
      fallback={null}
    >
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/work/:projectId" component={ProjectDetail} />
        <Route path="/work" component={Work} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  useEffect(() => {
    // Keep route chunks separate while fetching them quietly after first paint.
    // This prevents a visible loading state when navigating between sections.
    void Promise.all([
      loadHome(),
      loadAbout(),
      loadWork(),
      loadProjectDetail(),
      loadContact(),
      loadNotFound(),
    ]);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Preloader />
            <NeonCursor />
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
              <div className="relative flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">
                  <Router />
                </main>

              </div>
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </QueryClientProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
