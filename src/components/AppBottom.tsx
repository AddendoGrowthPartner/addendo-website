import { lazy, Suspense } from 'react';
import { I18nProvider } from '../i18n/context';
import Contact from './Contact';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

const Testimonials = lazy(() => import('./Testimonials'));
const Blog = lazy(() => import('./Blog'));
const CtaFinal = lazy(() => import('./CtaFinal'));
const FAQ = lazy(() => import('./FAQ'));

const LazyFallback = <div className="py-20" />;

// Bottom half of the page, rendered after the static Process / Infrastructure /
// WhyAddendo Astro islands. Has its own I18nProvider; cross-island sync
// happens through the 'addendo-lang-change' CustomEvent handled inside it.
export default function AppBottom() {
  return (
    <I18nProvider>
      <Suspense fallback={LazyFallback}>
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
    </I18nProvider>
  );
}
