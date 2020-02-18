<template>
	<input
		type="text"
		:placeholder="placeholder"
		:value="value"
		:maxlength="maxlength"
		@mousedown="updateValue($event.target.value)"
		@input="updateValueAndResize($event, 'width')"
		@keyup.enter="enterToggle"
	/>
</template>

<script>
import inputMixin from '@/mixins/inputMixin';

export default {
	props: {
		resize: {
			type: Boolean,
			required: false,
		},
	},
	mixins: [inputMixin],
	mounted() {
		this.$nextTick(() => {
			if (this.resize === true) {
				this.$el.setAttribute('style', `width : ${this.$el.scrollWidth}px`);
			}
		});
	},
	methods: {
		enterToggle(e) {
			e.target.blur();
			this.$emit('enter');
		},
		updateValueAndResize(event, line) {
			event.target.style.width = 'auto';
			event.target.style.width = `${event.target.scrollWidth}px`;

			this.$emit('input', event.target.value);
		},
	},
	render() {
		return this.$slots.default[0];
	},
};
</script>

<style lang="scss" scoped>
input {
	min-height: 2rem;
	outline: none;
	border: none;
	border-radius: 4px;

	font-size: 15px;
	font-weight: bolder;
	background-color: rgba(0, 0, 0, 0);
	word-wrap: break-word;
	word-break: keep-all;

	&:hover {
		background-color: #c1c4c95b;
		border-radius: 4px;
		cursor: pointer;
	}
	&:focus {
		background-color: white;
		color: black;
	}
}
</style>
