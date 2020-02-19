<template>
	<div @drop.stop="onDrop($event)" @dragover.prevent @dragenter.prevent>
		<slot />
	</div>
</template>

<script>
export default {
	name: 'app-drop',
	computed: {
		dragged() {
			return this.$store.getters.dragged;
		},
	},
	methods: {
		onDrop(e) {
			const transferData = JSON.parse(e.dataTransfer.getData('payload'));
			this.$emit('drop', transferData);
		},
	},
};
</script>

<style lang="scss"></style>
