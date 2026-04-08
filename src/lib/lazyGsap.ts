// Lazy-loads GSAP + ScrollTrigger only when the target element is near the viewport.
// Deferring GSAP (~60KB) away from the initial bundle eliminates the "unused JavaScript"
// cost flagged by PageSpeed Insights for sections below the fold.
//
// Usage:
//   useEffect(() => lazyGsap(ref.current, (gsap, ScrollTrigger) => {
//     gsap.fromTo(...);
//   }), []);
//
// Returns a cleanup function safe to use directly as a useEffect return value.

type GsapAnimator = (gsap: typeof import('gsap').gsap, ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger) => void;

export function lazyGsap(el: Element | null, animate: GsapAnimator): () => void {
  if (typeof window === 'undefined' || !el) return () => {};
  // Mobile: skip scroll-triggered animations entirely (matches prior behavior and
  // avoids paying the GSAP download cost on low-powered devices).
  if (window.innerWidth < 768) return () => {};

  let cancelled = false;
  const obs = new IntersectionObserver((entries, o) => {
    if (!entries.some((e) => e.isIntersecting)) return;
    o.disconnect();
    if (cancelled) return;
    import('gsap').then(({ gsap }) => {
      if (cancelled) return;
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        animate(gsap, ScrollTrigger);
      });
    });
  }, { rootMargin: '300px 0px' });
  obs.observe(el);

  return () => {
    cancelled = true;
    obs.disconnect();
  };
}
