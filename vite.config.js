import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, 'src') },
  },
  build: {
    target: 'es2022',
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('/node_modules/react/') ||
            id.includes('/node_modules/react-dom/') ||
            id.includes('/node_modules/react-router-dom/')
          ) {
            return 'vendor-react'
          }
          if (id.includes('/node_modules/motion')) return 'motion'
          if (id.includes('/node_modules/gsap') || id.includes('/node_modules/@gsap/')) return 'gsap'
          if (id.includes('/node_modules/lucide-react') || id.includes('/node_modules/lenis')) return 'vendor-ui'
          return undefined
        },
      },
    },
  },
})
