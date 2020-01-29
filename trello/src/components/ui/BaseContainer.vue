<template>
	<div class="base-wrap">
		<div class="base-container" :class="type">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			required: false,
		},
	},
};
</script>

<style lang="scss" scoped>
.base-wrap {
	height: 95vh;
	// z-index: 0;
}

.base-container {
	max-width: 120rem;
	margin: auto;
}
.board-wrap {
	max-width: 180rem;
	margin: 1rem 2rem;
}

.scroll {
	background-color: rgb(151, 172, 201);
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
