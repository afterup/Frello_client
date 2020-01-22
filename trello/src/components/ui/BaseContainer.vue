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
	height: 100vh;
	// background-color: blue;
}

.base-container {
	max-width: 120rem;
	margin: auto;
	background-color: #ffffff;
}
.board {
	height: 89vh;
}
</style>
