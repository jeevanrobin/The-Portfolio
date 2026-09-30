import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
// Absolute base so nested routes (/case-studies/...) resolve assets correctly.
// Defaults to "/" (Netlify, Vercel, custom domain); GitHub Pages builds pass
// --base=/The-Portfolio/ (see `build:ghpages`).
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    // hls.js is large but only loaded on demand for the background video.
    chunkSizeWarningLimit: 600,
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.js'],
  },
})
