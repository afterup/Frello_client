<template>
	<div class="delete-modal ">
		<h3 class="delete-modal__header">✋</h3>
		<div class="delete-modal__body">
			<div>
				보드 <span>{{ title }}</span
				>를 삭제하시겠습니까?
			</div>
		</div>
		<div class="delete-modal__footer">
			<BaseBtn @click="$emit('click')" class="ok">확인</BaseBtn>
			<BaseBtn @click="$emit('close')" class="cancel">취소</BaseBtn>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.delete-modal {
	height: 20rem;

	&__header {
		text-align: center;
		font-size: 7rem;
		margin-top: 2rem;
		margin-left: 3rem;
	}

	&__body {
		font-size: 1.4rem;
		text-align: center;
		margin-top: 1.5rem;

		span {
			font-weight: bold;
		}
	}

	&__footer {
		text-align: center;
		margin-top: 2rem;
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
