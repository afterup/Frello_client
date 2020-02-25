<template>
	<div id="app">
		<TheHeader />
		<router-view />
	</div>
</template>

<script>
import { CHECK_AUTH } from '@/store/actions.type.js';

export default {
	components: {
		TheHeader: () => import('@/components/common/TheHeader.vue'),
	},
	created() {
		this.$store.dispatch(CHECK_AUTH);
	},
};
</script>

<style lang="scss">
// @import '@/lib/styles/main';
</style>
