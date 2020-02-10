<template>
	<div class="home">
		<div class="home__banner">
			<div>
				<h1>Trello Clone Web</h1>
			</div>
			<svg width="500px" height="500px" class="home__banner__image">
				<image href="@/assets/image/hero-a.svg" width="500" height="500" />
			</svg>
		</div>
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
		display: flex;
		justify-content: space-around;
		align-items: center;
		background: rgb(6, 119, 191);
		background: linear-gradient(
			90deg,
			rgba(6, 119, 191, 1) 0%,
			rgba(6, 119, 191, 1) 35%,
			rgba(71, 105, 196, 1) 100%
		);
		height: 50rem;

		h1 {
			font-size: 2.5rem;
			color: white;
		}
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
