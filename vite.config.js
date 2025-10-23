import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "path";
const config = {
  mode: "development",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false, // Disable sourcemaps for better performance
    minify: 'esbuild', // Enable minification
    cssMinify: true, // Enable CSS minification
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', 'bootstrap']
        }
      }
    }
  },
  define: { "process.env.NODE_ENV": "'development'" },
  esbuild: { 
    jsx: "automatic", 
    jsxImportSource: "react",
    target: 'es2020' // Better performance target
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react', 'bootstrap']
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: "./assets/*", dest: "assets" },
        {
          src: "./public/assets/{*,}",
          dest: path.join("dist", "public/assets"),
        },
        { src: "./assets/*", dest: path.join("dist", "assets") },
      ],
      silent: true,
    }),
  ],
  resolve: {},
};
export default defineConfig(config);
