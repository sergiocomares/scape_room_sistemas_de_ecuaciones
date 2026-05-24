import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => ({
  // GitHub Pages serves this app under /<repo-name>/ in production.
  base: command === 'build' ? '/scape_room_sistemadeecuacionesBilingue/' : '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
}))
