import { lazy, Suspense } from 'react';
import { I18nProvider } from '../i18n/context';
import Navbar from './Navbar';
import Hero from './Hero';
import HowItWorks from './HowItWorks';
import StatsCounter from './StatsCounter';
import TechAllies from './TechAllies';
import ClientLogos from './ClientLogos';
import SectionSeparator from './SectionSeparator';
import Problem from './Problem';
import Solution from './Solution';
import Services from './Services';
import Contact from './Contact';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import { useI18n } from '../i18n/context';

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
  const { t } = useI18n();

  return (
    <>
      <Navbar />
      <Hero />
      <SectionSeparator number="07" label={t.separators.s07} />
      <HowItWorks />
      <Suspense fallback={LazyFallback}>
        <AIAgents />
        <ForWhom />
      </Suspense>
      <StatsCounter />
      <TechAllies />
      <ClientLogos />
      <SectionSeparator number="01" label={t.separators.s01} />
      <Problem />
      <Solution />
      <SectionSeparator number="02" label={t.separators.s02} />
      <Services />
      <SectionSeparator number="03" label={t.separators.s03} />
      <Suspense fallback={LazyFallback}>
        <Process />
        <Infrastructure />
      </Suspense>
      <SectionSeparator number="04" label={t.separators.s04} />
      <Suspense fallback={LazyFallback}>
        <WhyAddendo />
        <Testimonials />
      </Suspense>
      <SectionSeparator number="06" label={t.separators.s06} />
      <Suspense fallback={LazyFallback}>
        <Blog />
        <CtaFinal />
      </Suspense>
      <Suspense fallback={LazyFallback}>
        <FAQ />
      </Suspense>
      <SectionSeparator number="05" label={t.separators.s05} />
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
