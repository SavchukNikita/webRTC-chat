import {createRouter, createWebHistory} from 'vue-router';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			name: 'welcome',
			path: '/',
			component: () => import('../views/Welcome.vue'),
		},
		{
			name: 'room',
			path: '/room/:roomId',
			component: () => import('../views/Room.vue'),
		}
	],
})

export default router;
