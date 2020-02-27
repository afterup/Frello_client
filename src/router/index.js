import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index.js';
import { OPEN_MODAL } from '@/store/mutations.type';

Vue.use(VueRouter);

const checkModal = () => (to, from, next) => {
	store.commit(OPEN_MODAL);
	next();
};

const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import('@/views/HomePage.vue'),
		children: [
			{
				path: 'login',
				name: 'login',
				component: () => import('@/components/home/Login.vue'),
				beforeEnter: checkModal(),
			},
			{
				path: 'signup',
				component: () => import('@/components/home/Signup.vue'),
				beforeEnter: checkModal(),
			},
		],
	},
	{
		path: '/:username/boards',
		name: 'boards',
		component: () => import('@/views/BoardsPage.vue'),
	},
	{
		path: '/board/:id',
		name: 'board',
		component: () => import('@/views/BoardPage.vue'),
		children: [
			{
				path: 'card/:cardId/:cardTitle',
				name: 'card',
				component: () => import('@/views/CardPage.vue'),
				beforeEnter: checkModal(),
			},
		],
	},
	{
		name: 'not-found',
		path: '*',
		alias: '/not-found',
		component: () => import('@/views/NotFoundPage.vue'),
	},
];

/* NavigationDuplicated 오류 방지*/
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
	if (onResolve || onReject)
		return originalPush.call(this, location, onResolve, onReject);
	return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
