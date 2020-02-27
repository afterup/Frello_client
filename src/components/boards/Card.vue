<template>
	<div class="card" @click="clickEvent" :class="board.background">
		<div class="card__title">{{ board.title }}</div>
	</div>
</template>

<script>
export default {
	name: 'boards-card',
	props: {
		board: {
			type: Object,
			required: true,
		},
	},
	methods: {
		clickEvent() {
			this.$emit('clickCard');
		},
	},
};
</script>

<style lang="scss" scoped>
@import '@/lib/styles/_boardPalette';
.card {
	background-position: center;
	border-radius: 3px;
	width: 19rem;
	height: 9.5rem;
	margin: 4.5px 4.5px;
	position: relative;

	@media screen and (max-width: $bp-smallest) {
		width: 30rem;
		height: 15rem;
	}

	&:after {
		content: '\A';
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.137);
		opacity: 0;
	}

	&:hover {
		cursor: pointer;
	}

	&:hover:after {
		opacity: 1;
	}

	&__title {
		position: absolute;
		color: white;
		font-size: 1.6rem;
		font-weight: bold;
		margin: 10px 0 0 5px;
	}
}
</style>
