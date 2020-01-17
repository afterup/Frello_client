<template>
	<div class="home">
		<div class="banner"></div>
		<div class="home-about"></div>
		<div class="home-content"></div>
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
.banner {
	background-color: $color-primary-light;
	height: 50rem;
}

.home-about {
	height: 70rem;
}

.home-content {
	background-color: $color-grey-light-2;
	height: 30rem;
}
footer {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 5rem;

	&__text {
		font-size: 1.3rem;
	}
}
</style>
