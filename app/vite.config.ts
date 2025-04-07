import { defineConfig } from 'vite'
import { meteor } from 'meteor-vite/plugin'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    meteor({
      clientEntry: 'client/entry-vite.tsx', // Ensure this entry is TypeScript (tsx)
    }),
    react({
      jsxRuntime: 'automatic', // Use the new JSX runtime (recommended for TypeScript)
    }),
  ],
  optimizeDeps: {
    exclude: ['@meteor-vite/react-meteor-data'],
  },
})
