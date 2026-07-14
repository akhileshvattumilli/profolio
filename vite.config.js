import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// base "./" so dist/index.html also works when opened directly from disk
export default defineConfig({
  base: "./",
  plugins: [react()],
})
