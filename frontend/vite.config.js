import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
      deleteOriginFile: false,
    }),
  ],
  build: {
    target: "es2015",
    outDir: "dist",
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    sourcemap: false,
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", 
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
