<template>
	<div class="base-container">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'base-container',
};
</script>

<style lang="scss" scoped>
.base-container {
	width: 120rem;
	margin: auto;
}
</style>
