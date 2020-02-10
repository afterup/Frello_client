<template>
	<div class="wrapper" @click.self="$emit('close')">
		<slot></slot>
	</div>
</template>
<style>
.wrapper {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
}
</style>
