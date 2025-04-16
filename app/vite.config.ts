import { defineConfig } from 'vite'
import { meteor } from 'meteor-vite/plugin'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    meteor({
      clientEntry: 'client/entry-vite.tsx',
      stubValidation: { warnOnly: true },
      meteorStubs: { debug: false },
    }),
    react({
      jsxRuntime: 'automatic',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'imports'),
    },
  },
  optimizeDeps: {
    exclude: [
      '@meteor-vite/react-meteor-data',
      'meteor/meteor',
      'meteor/mongo',
      'meteor/tracker',
    ],
  },
})
