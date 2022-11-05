import dns from 'node:dns';
import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import checker from 'vite-plugin-checker';

// Open localhost instead of 127.0.0.1
dns.setDefaultResultOrder('verbatim');

const resolvePath = (dir: string) => path.resolve(__dirname, dir);

// https://vitejs.dev/config/

const config = ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [splitVendorChunkPlugin(), react(), checker({ typescript: true, enableBuild: false })],
    optimizeDeps: {
      include: ['react/jsx-runtime'],
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
      },
    },
    build: {
      outDir: resolvePath('build'),
      assetsInlineLimit: 0,
    },
    resolve: {
      alias: {
        src: resolvePath('src'),
      },
    },
    server: {
      port: 3000,
      open: true,
    },
  });
};

export default config;
