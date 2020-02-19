<template>
	<div class="wrapper" @click.self="$emit('close')">
		<slot></slot>
	</div>
</template>
<script>
export default {
	name: 'backdrop',
};
</script>
<style>
.wrapper {
	position: absolute;
	z-index: 1;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>
