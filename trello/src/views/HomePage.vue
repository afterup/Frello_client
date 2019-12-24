<template>
	<div class="home">
		<Banner>
			<h1>HOME PAGE</h1>
		</Banner>
		<HomeAbout />
		<HomeContent />
		<Footer />
	</div>
</template>

<script>
export default {
	name: 'home',
	components: {
		Banner: () => import('@/components/home/Banner.vue'),
		HomeAbout: () => import('@/components/home/HomeAbout.vue'),
		HomeContent: () => import('@/components/home/HomeContent.vue'),
		Footer: () => import('@/components/common/TheFooter.vue'),
	},
};
</script>
