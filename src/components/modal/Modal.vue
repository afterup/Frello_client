<template>
	<BackDrop class="backdrop" @close="$emit('close')">
		<div class="modal-base" v-if="type === 'base'">
			<div>
				<slot></slot>
			</div>
		</div>
		<div class="modal" :style="typeCardStyle" v-else>
			<div class="modal__close" v-if="close" @click="$emit('close')">
				<i class="material-icons">close</i>
			</div>
			<div class="modal__body">
				<slot></slot>
			</div>
		</div>
	</BackDrop>
</template>

<script>
export default {
	name: 'modal',
	components: {
		BackDrop: () => import('@/components/ui/BackDrop'),
	},
	computed: {
		typeCardStyle() {
			return this.type === 'card' ? { width: '45rem', height: '40rem' } : '';
		},
	},
	props: {
		type: {
			type: String,
			required: false,
		},
		close: {
			type: Boolean,
			default: true,
			required: false,
		},
	},
};
</script>

<style lang="scss" scoped>
.backdrop {
	background-color: rgba(0, 0, 0, 0.5);
}
.modal {
	width: 36rem;
	margin: 13rem auto;
	padding: 2rem 3rem;
	border-radius: 2px;
	background-color: #fff;
	box-shadow: 0 20px 35px rgba(0, 0, 0, 0.33);

	&__body {
		height: auto;
	}

	&__close {
		float: right;
		&:hover {
			cursor: pointer;
		}
	}

	.card {
		width: 40rem;
		height: 50rem;
	}
}
</style>
