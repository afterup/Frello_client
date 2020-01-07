import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

/* NavigationDuplicated 오류 방지*/
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
	if (onResolve || onReject)
		return originalPush.call(this, location, onResolve, onReject);
	return originalPush.call(this, location).catch(err => err);
};

const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import('@/views/HomePage.vue'),
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/components/home/Login.vue'),
	},
	{
		path: '/signup',
		name: 'signup',
		component: () => import('@/components/home/SignUp.vue'),
	},
	{
		path: '/:username',
		name: 'boards',
		component: () => import('@/views/BoardsPage.vue'),
	},
	{
		path: '/board/:id',
		name: 'board',
		component: () => import('@/views/BoardPage.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
