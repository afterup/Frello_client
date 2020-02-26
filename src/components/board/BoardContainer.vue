<template>
	<div class="wrap" :class="background">
		<div class="board-container">
			<div class="meta-wrap">
				<slot name="meta"></slot>
			</div>
			<div class="board-wrap scroll">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'board-container',
	props: {
		background: {
			type: String,
			required: false,
		},
	},
};
</script>

<style lang="scss" scoped>
@import '@/lib/styles/_boardPalette';

.wrap {
	height: calc(100vh - #{$header-height});
	margin-top: $header-height;
}

.board-container {
	margin: 0 2rem;

	.board-wrap {
		// max-width: 180rem;
		height: calc(100vh - #{$header-height} - #{$meta-height} - 2rem);
		margin: 1rem 0;
	}

	.scroll {
		overflow-y: hidden;
		overflow-x: scroll;

		&::-webkit-scrollbar {
			width: 3px;
			height: 10px;
		}

		&::-webkit-scrollbar-track {
			border-radius: 10px;
			background-color: rgba(131, 131, 131, 0.37);
		}

		&::-webkit-scrollbar-thumb {
			border-radius: 9px;
			background-color: rgb(231, 231, 231);
		}
	}
}
</style>
