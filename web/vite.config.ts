import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // Évite les chunks séparés qui peuvent causer des problèmes dans FiveM
        manualChunks: undefined,
      },
    },
  },
})