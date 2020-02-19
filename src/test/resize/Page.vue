<template>
	<ResizeAuto>
		<template v-slot:default="{ resize }">
			<textarea
				rows="2"
				class="textarea"
				placeholder="Write something for renderless component"
				@input="resize"
			></textarea>
		</template>
	</ResizeAuto>
</template>

<script>
export default {
	components: {
		ResizeAuto: () => import('@/test/resize/ResizeAuto'),
	},
};
</script>

<style></style>
