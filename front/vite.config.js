import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import jsconfigPaths from 'vite-jsconfig-paths'
import dotenv from 'dotenv';

dotenv.config();

const backPath = process.env.VITE_BACK;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  server: {
    host: true,
    proxy: {
      '/api': {
        //target: 'http://localhost:3002',
				target: backPath,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
