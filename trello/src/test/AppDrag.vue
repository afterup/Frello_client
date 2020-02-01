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
	props: {
		transferData: {
			type: Object,
			required: true,
		},
	},
	methods: {
		onDrag(e) {
			console.log(this.transferData);
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.dropEffect = 'move';
			e.dataTransfer.setData('payload', JSON.stringify(this.transferData));
		},
	},
};
</script>

<style></style>
