<script>
export default {
	name: 'ResizeAuto',
	methods: {
		resize(event) {
			event.target.style.height = 'auto';
			event.target.style.height = `${event.target.scrollHeight - 1}px`;
		},
	},
	mounted() {
		this.$nextTick(() => {
			this.$el.setAttribute(
				'style',
				'height',
				`${this.$el.scrollHeight - 1}px; overflow-y:hidden;`,
			);
		});
	},
	render() {
		return this.$scopedSlots.default({
			resize: this.resize,
		});
	},
};
</script>
