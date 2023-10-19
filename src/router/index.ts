import {createMemoryHistory, createRouter, createWebHistory} from 'vue-router';

const history = process.env.SSR ? createMemoryHistory() : createWebHistory();

const router = createRouter({
	history,
	routes: [
		{
			name: 'room',
			path: '/',
			component: () => import('../views/Room.vue'),
		}
	],
})

export default router;
