import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';
import fs from 'fs';
import https from 'https';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: https.createServer({
      key: fs.readFileSync('./key.pem'),
      cert: fs.readFileSync('./cert.pem'),
    }),
    host: 'localhost',
    port: 8000,
  },
  plugins: [react()],
});
