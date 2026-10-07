import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Em desenvolvimento, o front chama /api/... no próprio endereço do Vite
    // e o Vite repassa para o JSON Server (npm run api) na porta 3001.
    // Assim o navegador não faz requisição para outra origem (sem problema de CORS).
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (caminho) => caminho.replace(/^\/api/, ''),
      },
    },
  test: {
    environment: 'jsdom',
  },
})
