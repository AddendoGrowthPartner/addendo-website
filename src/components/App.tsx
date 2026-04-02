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
import Contact from './Contact';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

const AIAgents = lazy(() => import('./AIAgents'));
const ForWhom = lazy(() => import('./ForWhom'));
const Process = lazy(() => import('./Process'));
const Infrastructure = lazy(() => import('./Infrastructure'));
const WhyAddendo = lazy(() => import('./WhyAddendo'));
const Testimonials = lazy(() => import('./Testimonials'));
const Blog = lazy(() => import('./Blog'));
const CtaFinal = lazy(() => import('./CtaFinal'));
const FAQ = lazy(() => import('./FAQ'));

const LazyFallback = <div className="py-20" />;

function Content() {
  return (
    <>
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
      <Suspense fallback={LazyFallback}>
        <Process />
        <Infrastructure />
      </Suspense>
      <Suspense fallback={LazyFallback}>
        <WhyAddendo />
        <Testimonials />
      </Suspense>
      <Suspense fallback={LazyFallback}>
        <Blog />
        <CtaFinal />
      </Suspense>
      <Suspense fallback={LazyFallback}>
        <FAQ />
      </Suspense>
      <Contact />
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <Content />
    </I18nProvider>
  );
}
