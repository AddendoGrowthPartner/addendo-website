// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://addendo.io',
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: false },
    maxDuration: 60,
  }),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
