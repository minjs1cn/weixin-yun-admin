import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	base: 'https://prod-4gi3v8l421dd2dd2-1257367018.tcloudbaseapp.com/',
	plugins: [vue()],
});
