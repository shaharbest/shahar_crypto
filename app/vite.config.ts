// vite.config.ts
import { defineConfig } from 'vite'
import { meteor } from 'meteor-vite/plugin';
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        meteor({
          clientEntry: 'client/entry-vite.jsx',
        }),
        react({
            jsxRuntime: 'classic',
        }),
    ],
    optimizeDeps: {
        exclude: ['@meteor-vite/react-meteor-data'], 
    }
})
