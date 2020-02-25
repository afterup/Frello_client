<template>
	<div
		draggable
		@dragstart.self="onDrag($event)"
		@dragover.prevent
		@dragenter.prevent
	>
		<slot />
	</div>
</template>

<script>
export default {
	name: 'app-drag',
	props: {
		transferData: {
			type: Object,
			required: true,
		},
	},
	computed: {
		dragged() {
			return this.$store.getters.dragged;
		},
	},
	methods: {
		onDrag(e) {
			const dragged = e.currentTarget;
			e.dataTransfer.effectAllowed = 'copyMove';
			e.dataTransfer.dropEffect = 'move';
			e.dataTransfer.setData('payload', JSON.stringify(this.transferData));
		},
	},
};
</script>
