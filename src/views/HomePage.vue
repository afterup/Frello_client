<template>
	<div class="home">
		<section class="home__banner">
			<div>
				<h1>Frello</h1>
				<h3>Trello Clone Web</h3>
			</div>
			<svg width="500px" height="500px" class="home__banner__image">
				<image href="@/assets/image/hero-a.svg" width="100%" height="100%" />
			</svg>
		</section>
		<section class="home__about"></section>
		<section class="home__content"></section>
		<footer class="footer">
			<div class="footer__text">©Reference to trello</div>
		</footer>
		<transition name="fade">
			<Modal v-if="showModal" @close="closeModal">
				<router-view></router-view>
			</Modal>
		</transition>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { CLOSE_MODAL } from '@/store/mutations.type.js';

export default {
	name: 'home-page',
	computed: {
		...mapGetters(['showModal']),
	},
	components: {
		Modal: () => import('@/components/modal/Modal'),
	},
	methods: {
		closeModal() {
			this.$store.commit(CLOSE_MODAL);
			this.$router.push({ name: 'home' });
		},
	},
};
</script>

<style lang="scss" scoped>
.home {
	width: 100%;
	&__banner {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		height: 50rem;
		background: rgb(6, 119, 191);
		background: linear-gradient(
			90deg,
			rgba(6, 119, 191, 1) 0%,
			rgba(6, 119, 191, 1) 35%,
			rgba(71, 105, 196, 1) 100%
		);

		@media screen and (max-width: $bp-small) {
			flex-direction: column;
			height: 70rem;
		}

		h1 {
			text-align: center;
			font-size: 4rem;
			color: white;

			@media screen and (max-width: $bp-small) {
				margin-top: 8rem;
			}
		}

		h3 {
			font-size: 2rem;
			color: white;
		}

		svg {
			@media screen and (max-width: $bp-small) {
				width: 90%;
				height: 90%;
			}
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

.fade-enter-active {
	transition: all 0.3s ease;
}
.fade-leave-active {
	transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
