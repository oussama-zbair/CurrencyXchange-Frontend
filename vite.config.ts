import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "./", // Ensure relative paths for static deployment
  server: {
    host: "::",
    port: 3000,
  },
  build: {
    outDir: "dist",         
    emptyOutDir: true,      
    target: "esnext",       
    sourcemap: false,       
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
