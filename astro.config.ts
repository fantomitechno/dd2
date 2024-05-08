import { defineConfig } from 'astro/config';
import node from "@astrojs/node";
import image from './build/image.js';

// https://astro.build/config
export default defineConfig({
  site: "https://mc.renoux.dev",
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  integrations: [image()],
  scopedStyleStrategy: "where"
});