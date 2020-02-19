<template>
	<div class="home">
		<section class="home__banner">
			<div>
				<h1>Trello Clone Web</h1>
			</div>
			<svg width="500px" height="500px" class="home__banner__image">
				<image href="@/assets/image/hero-a.svg" width="500" height="500" />
			</svg>
		</section>
		<section class="home__about"></section>
		<section class="home__content"></section>
		<footer class="footer">
			<div class="footer__text">©Reference to trello</div>
		</footer>
		<transition name="fade">
			<Modal v-if="showModal" @close="closeModal('home')">
				<router-view></router-view>
			</Modal>
		</transition>
	</div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin.js';

export default {
	name: 'home-page',
	mixins: [modalMixin],
	components: {
		Modal: () => import('@/components/modal/Modal'),
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

.fade-enter-active {
	transition: all 0.3s ease;
}
.fade-leave-active {
	transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter,
.fade-leave-to {
	// transform: translateY(15px);
	opacity: 0;
}
</style>
