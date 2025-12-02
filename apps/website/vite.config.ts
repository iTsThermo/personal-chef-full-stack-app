import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      ".prisma/client/default": "../../node_modules/.pnpm/@prisma+client@5.19.1_prisma@5.19.1/node_modules/@prisma/client/default.js",
    },
  },
})
