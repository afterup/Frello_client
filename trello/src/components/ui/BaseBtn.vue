<template>
	<div @click="onClick" class="base-btn" :class="className">
		<slot></slot>
	</div>
</template>

<script>
export default {
	props: {
		onClick: {
			type: Function,
			required: true,
		},
		className: {
			type: String,
			required: false,
		},
	},
};
</script>

<style lang="scss" scoped>
.base-btn {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: $color-second;
	border-radius: 3px;
	margin-right: 5px;

	width: 30px;
	height: 30px;

	:hover {
		cursor: pointer;
	}
}
</style>
