import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
	routes: [
		{
			path: '/',
			component: () => import('./pages/home.vue'),
		},
		{
			path: '/shop',
			component: () => import('./pages/shop.vue'),
		},
		{
			path: '/data/:id',
			component: () => import('./pages/data.vue'),
		},
	],
	history: createWebHistory(),
});
