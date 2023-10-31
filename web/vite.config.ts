import path from "path"
import { defineConfig, splitVendorChunkPlugin } from "vite"
import webfontDownload from "vite-plugin-webfont-dl"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), webfontDownload(), splitVendorChunkPlugin(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
