import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


export default defineConfig({
  server: {

    port: 3000,
    https: false,             // Set to true to enable HTTPS
    hotOnly: false,           // Set to true to disable HMR (Hot Module Replacement)
    // open: true,               // Automatically open the browser when the server starts
    // historyApiFallback: true, // Serve index.html for all 404 (not found) routes, useful for single-page applications
    
    proxy: {
      "/auth": {
        target: "http://54.167.52.28:8084",
        changeOrigin: true,
        secure: false,
      },
      "/document": {
        target: "http://54.167.52.28:8084",
        changeOrigin: true,
        secure: false,
      },
      "/folder": {
        target: "http://54.167.52.28:8084",
        changeOrigin: true,
        secure: false,
      },
      "/metadata": {
        target: "http://54.167.52.28:8084",
        changeOrigin: true,
        secure: false,
      },
      "/imageservice": {
        target: "http://54.167.52.28:8084",
        changeOrigin: true,
        secure: false,
      },
      "/userservice": {
        target: "http://54.167.52.28:8084",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})










