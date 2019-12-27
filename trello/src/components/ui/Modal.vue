<template>
	<div class="modal">
		<div class="modal__wrapper">
			<div class="modal__container">
				<div class="modal__header">
					<slot name="header">
						default header
					</slot>
				</div>

				<div class="modal__body">
					<slot name="body">
						default body
					</slot>
				</div>

				<div class="modal__footer">
					<slot name="footer">
						<button class="modal-close-button" @click="$emit('close')">
							CLOSE
						</button>
					</slot>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {};
</script>

<style lang="scss">
.modal {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.3);
	display: table;
	transition: opacity 0.3s ease;

	&__wrapper {
		display: table-cell;
		vertical-align: middle;
	}

	&__container {
		width: 300px;
		margin: 0px auto;
		padding: 20px 30px;
		background-color: #fff;
		border-radius: 2px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
		transition: all 0.3s ease;
		font-family: Helvetica, Arial, sans-serif;
	}

	&__header h3 {
		margin-top: 0;
		color: #42b983;
	}

	&__body {
		margin: 20px 0;
		color: black;
	}

	&__footer {
		margin-bottom: 4rem;
	}
}
.modal-close-button {
	float: right;
	border-radius: 3px;
	border: none;
	padding: 5px;
	background-color: $color-grey-light-4;
	color: black;
}
</style>
