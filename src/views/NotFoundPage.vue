<template>
	<div class="not-found-page">
		<h2>Page Not Found</h2>
		<p>
			페이지를 찾을 수 없거나 비공개 되어있습니다. <br />
			로그인 후 다른 경로로 다시 시도해주세요.
		</p>
	</div>
</template>

<script>
export default {
	name: 'not-found-page',
};
</script>

<style lang="scss" scoped>
.not-found-page {
	width: 30rem;
	margin: auto;
	margin-top: 20rem;
	text-align: center;
}

h2 {
	margin-bottom: 2rem;
	color: grey;
	font-size: 2rem;
}
p {
	color: grey;
	font-size: 1.5rem;
}
</style>
