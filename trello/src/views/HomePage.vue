<template>
	<div class="home">
		<div class="home__banner"></div>
		<div class="home__about"></div>
		<div class="home__content"></div>
		<footer class="footer">
			<div class="footer__text">©Reference to trello</div>
		</footer>
		<Modal v-if="showModal" @close="closeModal">
			<router-view></router-view>
		</Modal>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'home',
	computed: {
		...mapGetters(['showModal']),
	},
	methods: {
		closeModal() {
			this.$store.commit('CLOSE_MODAL');
			this.$router.push({ name: 'home' });
		},
	},
};
</script>

<style lang="scss" scoped>
.home {
	&__banner {
		background-color: $color-primary-light;
		height: 50rem;
	}

	&__about {
		height: 70rem;
	}

	&__content {
		background-color: $color-grey-light-2;
		height: 30rem;
	}
}
.footer {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 5rem;

	&__text {
		font-size: 1.3rem;
	}
}
</style>
