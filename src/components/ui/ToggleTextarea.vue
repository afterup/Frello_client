<template>
	<textarea
		:placeholder="dataPlaceholder"
		:style="computedStyles"
		v-model="val"
		:maxlength="maxlength"
		rows="1"
		@focus="onFocus"
		@blur="handleBlur"
		@keydown.enter="onEnter"
	/>
</template>

<script>
import inputMixin from '@/mixins/inputMixin';

// resize 기능 Reference: vue-textarea-autosize (https://github.com/devstark-com/vue-textarea-autosize)

export default {
	name: 'toggle-textarea',
	data() {
		return {
			dataPlaceholder: '',
			val: null,
			maxHeightScroll: false,
			height: 'auto',
		};
	},
	mixins: [inputMixin],
	props: {
		submitButton: {
			type: Boolean,
			required: false,
		},
		autosize: {
			type: Boolean,
			default: true,
		},
		minHeight: {
			type: [Number],
			default: null,
		},
		maxHeight: {
			type: [Number],
			default: null,
		},
		/*
		 * Force !important for style properties
		 */
		important: {
			type: [Boolean, Array],
			default: false,
		},
	},
	computed: {
		computedStyles() {
			if (!this.autosize) return {};
			return {
				resize: !this.isResizeImportant ? 'none' : 'none !important',
				height: this.height,
				overflow: this.maxHeightScroll
					? 'auto'
					: !this.isOverflowImportant
					? 'hidden'
					: 'hidden !important',
				'background-color': this.type === 'description' ? '#f0eeee' : '',
			};
		},
		isResizeImportant() {
			const imp = this.important;
			return imp === true || (Array.isArray(imp) && imp.includes('resize'));
		},
		isOverflowImportant() {
			const imp = this.important;
			return imp === true || (Array.isArray(imp) && imp.includes('overflow'));
		},
		isHeightImportant() {
			const imp = this.important;
			return imp === true || (Array.isArray(imp) && imp.includes('height'));
		},
	},
	watch: {
		value(val) {
			this.val = val;
		},
		val(val) {
			this.$nextTick(this.resize);
			this.$emit('input', val);
		},
		minHeight() {
			this.$nextTick(this.resize);
		},
		maxHeight() {
			this.$nextTick(this.resize);
		},
		autosize(val) {
			if (val) this.resize();
		},
	},
	methods: {
		onEnter(e) {
			e.preventDefault();
			if (this.val.trim() === '') return;
			e.target.blur();
			this.$emit('update', this.val);
		},
		onFocus(e) {
			if (this.val.trim() === '') return;
			this.handleFocus(e);
			this.resize(e);
		},
		handleFocus(event) {
			if (this.placeholder) {
				if (this.placeholder.blur)
					this.dataPlaceholder = this.placeholder.focus;
				else this.dataPlaceholder = this.placeholder;
			}
		},
		handleBlur(event) {
			if (this.placeholder) {
				if (this.placeholder.blur) this.dataPlaceholder = this.placeholder.blur;
				else this.dataPlaceholder = this.placeholder;
			}
		},
		resize() {
			const important = this.isHeightImportant ? 'important' : '';
			this.height = `auto${important ? ' !important' : ''}`;
			this.$nextTick(() => {
				let contentHeight = this.$el.scrollHeight + 1;
				if (this.minHeight) {
					contentHeight =
						contentHeight < this.minHeight ? this.minHeight : contentHeight;
				}
				if (this.maxHeight) {
					if (contentHeight > this.maxHeight) {
						contentHeight = this.maxHeight;
						this.maxHeightScroll = true;
					} else {
						this.maxHeightScroll = false;
					}
				}
				const heightVal = contentHeight + 'px';
				this.height = `${heightVal}${important ? ' !important' : ''}`;
			});
			return this;
		},
	},
	created() {
		if (this.placeholder) {
			if (this.placeholder.blur) this.dataPlaceholder = this.placeholder.blur;
			else this.dataPlaceholder = this.placeholder;
		}
		this.val = this.value;
	},
	mounted() {
		this.resize();
	},
};
</script>

<style lang="scss" scoped>
textarea {
	width: 100%;
	padding: 1rem 1rem;
	margin-bottom: 8px;
	border-radius: 2px;
	border: none;

	background-color: rgba(0, 0, 0, 0);
	resize: none;
	overflow: hidden;

	font-size: 1.6rem;

	&:hover {
		background-color: #c1c4c95b;
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
</style>
