import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
	routes: [
		{
			path: '/',
			component: () => import('./pages/home.vue'),
		},
		{
			path: '/shop',
			children: [
				{
					path: '',
					component: () => import('./pages/shop.vue'),
				},
				{
					path: ':id/data',
					component: () => import('./pages/data.vue'),
				},
			],
		},
	],
	history: createWebHistory(),
});
