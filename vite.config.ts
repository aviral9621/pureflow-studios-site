import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // The third parameter '' allows loading all env variables, including those from Vercel.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [tailwindcss(), react()],
    resolve: {
      alias: {
        '@': path.resolve((process as any).cwd(), '.'),
      },
    },
    define: {
      // This is the critical part: it replaces process.env.API_KEY in your client code
      // with the actual string value from the environment variables.
      // We check process.env (Vercel) first, then the loaded env (local .env).
      'process.env.API_KEY': JSON.stringify(process.env.GEMINI_API_KEY || env.GEMINI_API_KEY || ''),
    },
  };
});