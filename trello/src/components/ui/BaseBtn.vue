<template>
	<button class="base-button" :disabled="disabled" @click="onClick">
		<span class="content">
			<slot />
		</span>

		<div v-if="badge !== null" class="button-badge">
			<span>{{ badge }}</span>
		</div>
	</button>
</template>

<script>
export default {
	inject: {
		buttonGroupChildData: { default: undefined },
		buttonGroupOnChange: { default: undefined },
	},
	props: {
		badge: {
			type: [String, Number],
			default: null,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		value: {
			default: null,
		},
	},
	computed: {
		selected() {
			return (
				this.buttonGroupChildData &&
				this.buttonGroupChildData.value === this.value
			);
		},
	},
	methods: {
		onClick(e) {
			this.$emit('click', e);
			if (typeof this.buttonGroupOnChange === 'function') {
				this.buttonGroupOnChange(this.value);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.base-button {
	padding: 1px;
	border-radius: 3px;
	border: none;
	cursor: pointer;
	position: relative;
	background-color: $color-primary-light;
	color: white;
}

.button-badge {
	position: absolute;
	top: -4px;
	width: 20px;
	height: 20px;
	font-size: 14px;
	font-weight: bold;
	border-radius: 50%;
	letter-spacing: -2px;
}
</style>
