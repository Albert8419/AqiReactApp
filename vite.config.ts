import { defineConfig } from 'vite'; // Importing the defineConfig function from Vite
import react from '@vitejs/plugin-react'; // Importing the React plugin for Vite

// Configuration for Vite
export default defineConfig({
  plugins: [react()], // Using the React plugin
});
