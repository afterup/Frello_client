<template>
	<div class="delete-board ">
		<h3 class="delete-board__header">✋</h3>
		<div class="delete-board__body">
			<div>
				보드 <span>{{ title }}</span
				>를 삭제하시겠습니까?
			</div>
		</div>
		<div class="delete-board__footer">
			<BaseBtn @click="$emit('click')" class="ok">확인</BaseBtn>
			<BaseBtn @click="$emit('close')" class="cancel">취소</BaseBtn>
		</div>
	</div>
</template>

<script>
export default {
	name: 'delete-board',
	props: {
		title: {
			type: String,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.delete-board {
	&__header {
		margin-top: 2rem;
		text-align: center;
		font-size: 7rem;
	}

	&__body {
		margin-top: 1.5rem;
		font-size: 1.4rem;
		text-align: center;

		span {
			font-weight: bold;
		}
	}

	&__footer {
		margin-top: 2rem;
		margin-bottom: 0.5rem;
		text-align: center;

		.ok {
			display: inline-block;
		}

		.cancel {
			display: inline-block;
			background-color: grey;
		}
	}
}
</style>
