import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import glob from 'vite-plugin-glob'

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    glob()
  ],
})
