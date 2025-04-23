import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['f24e-103-99-148-120.ngrok-free.app'], // 👈 add this
    port: 5173,
    host: true, // 👈 allow external access (important!)
  }
})
