// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://addendo.io',
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: false },
    maxDuration: 60,
  }),
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-US',
          en: 'en-US',
        },
      },
      filter: (page) => !page.includes('/pulse'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
