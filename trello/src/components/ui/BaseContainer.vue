<template>
	<div v-if="board">
		<div class="base-wrap" :class="background">
			<div class="meta">
				<slot name="meta"></slot>
			</div>
			<div class="board-container scroll">
				<slot></slot>
			</div>
		</div>
	</div>
	<div v-else>
		<div class="base-container">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		board: {
			type: Boolean,
			required: false,
		},
		background: {
			type: String,
			required: false,
		},
	},
};
</script>

<style lang="scss" scoped>
@import '@/lib/styles/_boardPalette';

.base-wrap {
	height: calc(100vh - #{$header-height});
}

.base-container {
	max-width: 120rem;
	margin: auto;
}

.meta {
	margin: 0 2rem;
}

.board-container {
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
</style>
