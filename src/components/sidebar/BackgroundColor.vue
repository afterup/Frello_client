<template>
	<div class="colors">
		<div
			class="colors__item"
			:class="color"
			v-for="(color, i) in colors"
			:key="i"
			@click="chooseBackground(color)"
		></div>
	</div>
</template>

<script>
export default {
	name: 'background-color',
	data() {
		return {
			colors: ['blue', 'red', 'orange', 'yellow', 'green', 'purple'],
		};
	},
	methods: {
		chooseBackground(color) {
			this.$store.dispatch('UPDATE_BOARD', {
				board_id: this.$route.params.id,
				background: color,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
@import '@/lib/styles/_boardPalette';

.colors {
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: center;
	padding: 1rem;

	&__item {
		width: 75px;
		height: 75px;
		margin-right: 5px;
		margin-bottom: 1rem;
		border-radius: 3px;

		&:hover {
			cursor: pointer;
		}
	}
}
</style>
