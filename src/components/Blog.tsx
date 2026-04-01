import { useI18n } from '../i18n/context';

export default function Blog() {
  const { t } = useI18n();
  const posts = t.blog.posts;

  return (
    <section className="section-pad" style={{ background: '#080F24' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal mb-6">
            <span className="gold-gradient-text">{t.blog.title}</span>
          </h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">{t.blog.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post: any, i: number) => (
            <article
              key={i}
              className="group rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(26,26,46,0.6)',
                backdropFilter: 'blur(16px)',
                borderColor: 'rgba(201,168,76,0.15)',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.15)')}
            >
              {/* Placeholder image with gold gradient */}
              <div className="h-48 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/20 via-[#0D1B3E] to-[#080F24]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,26,46,0.6)] to-transparent" />
              </div>

              <div className="p-6">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold/10 text-gold border border-gold/20 mb-4">
                  {post.category}
                </span>
                <h3 className="font-display text-xl font-bold text-white mb-3 leading-snug">
                  {post.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-white/30 text-xs">{post.date}</span>
                  <a href="#" className="text-gold text-sm font-semibold hover:text-gold-light transition-colors">
                    {post.cta}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-gold/30 text-gold font-semibold hover:bg-gold/10 transition-all duration-300"
          >
            {t.blog.viewAll}
          </a>
        </div>
      </div>
    </section>
  );
}
