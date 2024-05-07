import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: "https://victorperezbrotons.com",
  output: "static",
  compressHTML: false, // Temporary, remove
  // build: { format: "file"}
})