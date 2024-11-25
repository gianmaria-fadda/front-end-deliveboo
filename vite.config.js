import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          // @use 'src/assets/scss/partials/reset' as *;
          @use 'src/assets/scss/partials/variables' as *;
          @use 'src/assets/scss/partials/mixins' as *;
        `
      }
    }
  }
})
