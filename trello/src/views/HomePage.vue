<template>
	<div class="home">
		<div class="home__banner"></div>
		<div class="home__about"></div>
		<div class="home__content"></div>
		<footer class="footer">
			<div class="footer__text">©Reference to trello</div>
		</footer>
	</div>
</template>

<script>
export default {
	name: 'home',
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
