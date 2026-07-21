import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'lucide-react'],
          pdf: ['html2canvas', 'jspdf']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
