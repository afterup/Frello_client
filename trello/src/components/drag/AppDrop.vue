<template>
	<div @drop.stop="onDrop($event)" @dragover.prevent @dragenter.prevent>
		<slot />
	</div>
</template>

<script>
export default {
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

<style lang="scss">
.placeholder {
	background: rgb(255, 240, 120);
	content: 'Drop here';
	height: 38px;
}
</style>
