<template>
	<div class="post">
		<div class="post__field" :class="background">
			<div>
				<BaseInput
					class="post__field__input"
					v-model="title"
					:type="'text'"
					:placeholder="'Add board title'"
					:maxlength="30"
				/>
				<BaseBtn @click="onSubmit">Create Board</BaseBtn>
			</div>
			<div class="post__field__close" @click="$emit('close')">
				<i class="material-icons">close</i>
			</div>
		</div>
		<div class="post__colors">
			<div
				class="post__colors__item"
				:class="background === color ? `${color} choice` : `${color}`"
				v-for="(color, i) in colors"
				:key="i"
				@click="chooseBackground(color)"
			>
				<i v-if="background === color" class="material-icons">check</i>
			</div>
		</div>
	</div>
</template>

<script>
import { PUBLISH_BOARD, FETCH_BOARDS } from '@/store/actions.type';

export default {
	name: 'boards-post',
	data() {
		return {
			title: '',
			background: 'blue',
			colors: ['blue', 'red', 'orange', 'yellow', 'green', 'purple'],
		};
	},
	methods: {
		onSubmit() {
			const boardData = {
				title: this.title,
				background: this.background,
			};

			this.$store.dispatch(PUBLISH_BOARD, boardData).then(() => {
				this.$store.dispatch(FETCH_BOARDS, this.$route.params.username);
				this.$emit('close');
			});
		},
		chooseBackground(color) {
			this.background = color;
		},
	},
};
</script>

<style lang="scss" scoped>
@import '@/lib/styles/_boardPalette';

.post {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 12rem auto;

	&__field {
		display: flex;
		align-content: space-between;
		padding: 1.5rem 1.3rem;
		border-radius: 2px;

		&__input {
			margin-bottom: 1.5rem;
		}

		&__close {
			margin-left: 3rem;

			&:hover {
				cursor: pointer;
			}
		}
	}

	&__colors {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		width: 10rem;

		&__item {
			width: 25px;
			height: 25px;
			margin-right: 5px;
			margin-bottom: 1rem;
			border-radius: 3px;
			position: relative;

			&:after {
				content: '\A';
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				background: rgba(0, 0, 0, 0.137);
				opacity: 0;
			}

			&:hover {
				cursor: pointer;
			}
			&:hover:after {
				opacity: 1;
			}
		}
	}
}
</style>
