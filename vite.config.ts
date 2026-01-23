import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: ".htaccess",
          dest: ".",
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  server: {
    port: 5173, // Change this number to your desired port
    host: true, // This allows access from the local network
  },
});
