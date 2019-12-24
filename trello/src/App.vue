<template>
	<div id="app">
		<TheHeader />
		<router-view />
	</div>
</template>

<script>
export default {
	components: {
		TheHeader: () => import('@/components/common/TheHeader.vue'),
	},
};
</script>

<style lang="scss"></style>
