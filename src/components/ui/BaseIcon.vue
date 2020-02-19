<template>
	<div class="icon" @click="$emit('click')" :style="style">
		{{ username.substring(0, 1).toUpperCase() }}
	</div>
</template>

<script>
export default {
	props: {
		username: {
			type: String,
			required: true,
		},
		size: {
			type: Number,
			required: true,
		},
	},
	computed: {
		style() {
			return {
				'--size': this.size + 'px',
			};
		},
	},
};
</script>

<style lang="scss" scoped>
.icon {
	display: flex;
	justify-content: center;
	align-items: center;
	width: var(--size);
	height: var(--size);
	border-radius: 25px;
	background-color: #dfe1e6;
	color: black;
	font-size: 1.6rem;
	font-weight: bolder;
}
</style>
