/// <reference types="vitest/config" />
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import tailwindcss from "@tailwindcss/vite";
// import path from "node:path";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [tailwindcss(), react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   test: {
//     globals: true,
//     environment: "jsdom",
//     setupFiles: "./src/test/setup.ts",
//     css: true,
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router"],
          "vendor-ui": [
            "@radix-ui/react-avatar",
            "@radix-ui/react-slot",
            "@radix-ui/react-separator",
            "@radix-ui/react-tooltip",
          ],
          "vendor-carousel": ["embla-carousel-react"],
          "vendor-utils": ["tailwind-merge", "clsx"],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: true,
  },
});
