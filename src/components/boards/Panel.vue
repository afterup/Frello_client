<template>
	<div class="panel">
		<h3 class="panel__title">
			<i v-if="badge" class="material-icons badge">{{ badge }}</i>
			<slot name="title"></slot>
		</h3>
		<div class="panel__cards">
			<slot name="card"></slot>
			<div
				class="panel__cards__add"
				v-if="type === 'personal'"
				@click="openModal"
			>
				Create new board
			</div>
		</div>
	</div>
</template>

<script>
import { OPEN_MODAL } from '@/store/mutations.type';

export default {
	name: 'boards-panel',
	props: {
		type: {
			type: String,
			required: false,
		},
		badge: {
			type: String,
			required: false,
		},
	},
	methods: {
		openModal() {
			this.$store.commit(OPEN_MODAL);
		},
	},
};
</script>

<style lang="scss" scoped>
.panel {
	height: 80%;
	width: 90rem;
	margin: auto;

	@media screen and (max-width: $bp-medium) {
		width: 70rem;
	}
	@media screen and (max-width: $bp-smallest) {
		margin: 3.5rem;
		width: 38rem;
	}

	&__title {
		display: flex;
		align-items: center;
		font-size: 1.6rem;
		font-weight: bold;
		margin-bottom: 10px;

		.badge {
			margin-right: 0.5rem;
		}
	}

	&__cards {
		display: flex;
		flex-wrap: wrap;
	}

	&__cards__add {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 3px;
		background-color: #f0f2f5;
		width: 190px;
		height: 95px;
		margin: 4.5px 4.5px;
		font-size: 1.6rem;

		@media screen and (max-width: $bp-smallest) {
			width: 30rem;
			height: 15rem;
		}
	}

	&__cards__add:hover {
		cursor: pointer;
		background-color: #e6e8eb;
	}
}
</style>
