import { I18nProvider } from '../i18n/context';
import Navbar from './Navbar';
import Hero from './Hero';
import StatsCounter from './StatsCounter';
import ClientLogos from './ClientLogos';
import SectionSeparator from './SectionSeparator';
import Problem from './Problem';
import Solution from './Solution';
import Services from './Services';
import Industries from './Industries';
import Process from './Process';
import Infrastructure from './Infrastructure';
import WhyAddendo from './WhyAddendo';
import Testimonials from './Testimonials';
import CtaFinal from './CtaFinal';
import Blog from './Blog';
import Contact from './Contact';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import { useI18n } from '../i18n/context';

function Content() {
  const { t } = useI18n();

  return (
    <>
      <Navbar />
      <Hero />
      <StatsCounter />
      <ClientLogos />
      <SectionSeparator number="01" label={t.separators.s01} />
      <Problem />
      <Solution />
      <SectionSeparator number="02" label={t.separators.s02} />
      <Services />
      <Industries />
      <SectionSeparator number="03" label={t.separators.s03} />
      <Process />
      <Infrastructure />
      <SectionSeparator number="04" label={t.separators.s04} />
      <WhyAddendo />
      <Testimonials />
      <CtaFinal />
      <SectionSeparator number="05" label={t.separators.s05} />
      <Contact />
      <SectionSeparator number="06" label={t.separators.s06} />
      <Blog />
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
