import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'html-rewrite-middleware',
        configureServer(server) {
          server.middlewares.use((req, _res, next) => {
            if (req.url === '/' || req.url === '') {
              req.url = '/html/index.html';
            }
            next();
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          index: path.resolve(__dirname, 'html/index.html'),
          login: path.resolve(__dirname, 'html/login.html'),
          register: path.resolve(__dirname, 'html/register.html'),
          dashboard: path.resolve(__dirname, 'html/dashboard.html'),
          transactions: path.resolve(__dirname, 'html/transactions.html'),
          budget: path.resolve(__dirname, 'html/budget.html'),
          savings: path.resolve(__dirname, 'html/savings.html'),
          analytics: path.resolve(__dirname, 'html/analytics.html'),
          profile: path.resolve(__dirname, 'html/profile.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      proxy: {
        // React dev -> FastAPI backend. `npm run dev` forwards /api to :8000.
        '/api': {
          target: 'http://127.0.0.1:8000',
          changeOrigin: true,
        },
      },
    },
  };
});
