import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // Change this to your desired port number
    proxy: {
      // Proxy requests to Django API
      '/api': {
        target: 'http://localhost:7777/',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
