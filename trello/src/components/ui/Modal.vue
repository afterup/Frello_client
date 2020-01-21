<template>
	<div class="modal" @click.self="$emit('close')">
		<div class="modal__container">
			<div class="modal__close" @click="$emit('close')">
				<i class="material-icons">close</i>
			</div>
			<div class="modal__body">
				<slot></slot>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		title: {
			type: String,
			require: false,
		},
	},
};
</script>

<style lang="scss">
.modal {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.22);

	&__close {
		float: right;

		&:hover {
			cursor: pointer;
		}
	}

	&__container {
		width: 36rem;
		margin: 12rem auto;
		padding: 2rem 3rem;
		background-color: #fff;
		border-radius: 2px;
		box-shadow: 0 20px 35px rgba(0, 0, 0, 0.33);
	}

	&__header h3 {
		text-align: center;
		font-size: 1.5rem;
		margin-top: 4rem;
		color: $color-grey-dark-1;
	}
}
</style>
