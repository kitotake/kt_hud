import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // CRITIQUE FiveM : un seul JS — uniquement au build, pas en dev
    rollupOptions: command === 'build'
      ? { output: { manualChunks: undefined, inlineDynamicImports: true } }
      : {},
  },
}))
