<template>
	<textarea
		:style="computedStyles"
		v-model="val"
		@input="input"
		@keydown.enter="onEnter"
		@focus="resize"
	></textarea>
</template>

<script>
/* 
  resize 기능 Reference: vue-textarea-autosize 
             https://github.com/devstark-com/vue-textarea-autosize
*/

export default {
	name: 'text-area',
	data() {
		return {
			val: null,
			maxHeightScroll: false,
			height: 'auto',
		};
	},
	props: {
		value: {
			type: [String, Number],
			default: '',
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
			this.$emit('update-description', this.val);
		},
		input() {
			console.log(this.val);
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
		this.val = this.value;
	},
	mounted() {
		this.resize();
	},
};
</script>

<style></style>
