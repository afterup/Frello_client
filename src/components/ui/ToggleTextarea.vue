<template>
	<textarea
		:placeholder="
			handlePlaceholder === '' ? placeholder.blur : handlePlaceholder
		"
		:class="isTitle ? 'is-title' : 'add'"
		:value="value"
		:maxlength="maxlength"
		@focus="handleFocus"
		@blur="handleBlur"
		@input="updateValueAndResize($event, 'height')"
		@keydown.enter="enterToggle"
	/>
</template>

<script>
import inputMixin from '@/mixins/inputMixin';

export default {
	name: 'toggle-textarea',
	data() {
		return {
			dataPlaceholder: '',
		};
	},
	mixins: [inputMixin],
	props: {
		resize: {
			type: Boolean,
			required: false,
		},
		submitButton: {
			type: Boolean,
			required: false,
		},
		isTitle: {
			type: Boolean,
			required: false,
		},
	},
	computed: {
		handlePlaceholder() {
			if (this.placeholder === undefined) return;
			else return this.dataPlaceholder;
		},
	},
	mounted() {
		this.$nextTick(() => {
			if (this.resize === true) {
				this.$el.setAttribute('style', `height: ${this.$el.scrollHeight}px`);
			}
		});
	},
	methods: {
		handleFocus(event) {
			if (this.placeholder === undefined) {
			} else {
				this.dataPlaceholder = this.placeholder.focus;
			}
		},
		handleBlur(event) {
			if (this.placeholder === undefined) {
			} else {
				this.dataPlaceholder = this.placeholder.blur;
			}
		},
		resizeHeight(event) {
			event.target.style.height = 'auto';
			event.target.style.height = `${event.target.scrollHeight}px`;
			console.log(event.target.style.height);
		},
		enterToggle(event) {
			event.preventDefault();
			event.target.blur();
			console.log(event.target);
			// event.target.style.height = 'auto';
			// event.target.style.height = '50px';
			this.$emit('enter');
		},
		updateValueAndResize(event, line) {
			this.resizeHeight(event);
			this.$emit('input', event.target.value);
		},
	},
	render() {
		return this.$slots.default[0];
	},
};
</script>

<style lang="scss" scoped>
textarea {
	width: 24rem;
	padding: 1rem 1rem;
	margin-bottom: 8px;
	border-radius: 2px;
	border: none;

	background-color: rgba(0, 0, 0, 0);
	resize: none;
	overflow: hidden;

	&:hover {
		background-color: #c1c4c95b;
		border-radius: 4px;
		cursor: pointer;
	}
	&:focus {
		background-color: white;
		box-shadow: 0px 1.3px rgb(182, 182, 182);
	}

	&__slot {
		display: flex;
		align-items: center;
	}

	&__button {
		display: flex;
	}
}

.is-title {
	font-size: 1.7rem;
	font-weight: bolder;
}
</style>
