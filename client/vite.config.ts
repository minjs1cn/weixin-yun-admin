import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	base: 'https://prod-4gi3v8l421dd2dd2-1257367018.tcloudbaseapp.com/',
	plugins: [vue()],
	server: {
		proxy: {
			'/api': {
				target: 'https://koa-tcp4-16914-5-1257367018.sh.run.tcloudbase.com/',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
});
