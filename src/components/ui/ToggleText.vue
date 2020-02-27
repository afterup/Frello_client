<template>
	<input
		type="text"
		:placeholder="placeholder"
		:value="value"
		:maxlength="maxlength"
		v-autowidth="{ maxWidth: '700px', minWidth: '20px', comfortZone: 0 }"
		@mousedown="updateValue($event.target.value)"
		@input="updateValue($event.target.value)"
		@blur="onBlur"
		@keyup.enter="$event.target.blur()"
	/>
</template>

<script>
import inputMixin from '@/mixins/inputMixin';

export default {
	name: 'toggle-text',
	data() {
		return {
			previousValue: '',
		};
	},
	mixins: [inputMixin],
	methods: {
		onBlur(e) {
			if (e.target.value === '') {
				return;
			}
			this.$emit('enter');
		},
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
