<template>
	<div class="boards__favorited__cards__item">
		<slot></slot>
	</div>
</template>

<script>
export default {
	props: {
		boardId: {
			type: Number,
			required: true,
		},
		background: {
			type: String,
			required: false,
		},
	},
};
</script>

<style></style>
