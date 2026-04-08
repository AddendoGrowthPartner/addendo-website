import { lazy, Suspense } from 'react';
import { I18nProvider } from '../i18n/context';
import Navbar from './Navbar';
import Hero from './Hero';
import HowItWorks from './HowItWorks';
import StatsCounter from './StatsCounter';
import TechAllies from './TechAllies';
import ClientLogos from './ClientLogos';
import Problem from './Problem';
import Solution from './Solution';
import Services from './Services';

const AIAgents = lazy(() => import('./AIAgents'));
const ForWhom = lazy(() => import('./ForWhom'));

const LazyFallback = <div className="py-20" />;

// Top half of the page, up to Services. Anything after Services is either
// the static Process.astro island or AppBottom.tsx.
export default function AppTop() {
  return (
    <I18nProvider>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Suspense fallback={LazyFallback}>
        <AIAgents />
        <ForWhom />
      </Suspense>
      <StatsCounter />
      <TechAllies />
      <ClientLogos />
      <Problem />
      <Solution />
      <Services />
    </I18nProvider>
  );
}
