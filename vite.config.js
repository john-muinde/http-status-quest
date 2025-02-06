import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'mock-api',
      configureServer(server) {
        server.middlewares.use('/api/player-count', (req, res) => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          // Return a random number between 100-150 for development
          const mockCount = Math.floor(Math.random() * 50) + 100;
          res.end(JSON.stringify({ count: mockCount }));
        });
      }
    }
  ]
});