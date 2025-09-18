// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
  server: {
    // headers: {
    //   // CSP - Google Identity Services
    //   'Content-Security-Policy': [
    //     "default-src 'self'; connect-src 'self' https://accounts.google.com https://www.googleapis.com https://oauth2.googleapis.com https://api.emailjs.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; frame-src 'self' https://accounts.google.com;",
    //     "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://apis.google.com https://www.gstatic.com https://ssl.gstatic.com",
    //     "frame-src 'self' https://accounts.google.com",
    //     "connect-src 'self' https://accounts.google.com https://www.googleapis.com https://oauth2.googleapis.com",
    //     "img-src 'self' data: https:",
    //     "style-src 'self' 'unsafe-inline' https:",
    //   ].join('; '),
    // }
  }
})