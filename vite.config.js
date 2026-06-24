import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ponytail: base './' => assets load from any GitHub Pages subpath, no need to hardcode repo name
export default defineConfig({
  plugins: [react()],
  base: './',
})
