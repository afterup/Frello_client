<template>
	<Panel :type="type" :badge="badge">
		<h3 slot="title">{{ boardListTitle }}</h3>
		<Card
			slot="card"
			v-for="board in boards"
			:key="board.board_id"
			:board="board"
			@clickCard="toBoard(board.board_id)"
		></Card>
	</Panel>
</template>

<script>
export default {
	name: 'boards-list',
	components: {
		Panel: () => import('@/components/boards/Panel.vue'),
		Card: () => import('@/components/boards/Card.vue'),
	},
	props: {
		boards: {
			type: Array,
			required: true,
		},
		badge: {
			type: String,
			required: false,
		},
		type: {
			type: String,
			required: false,
		},
	},
	computed: {
		boardListTitle() {
			return this.type === 'personal' ? 'Personal Boards' : 'Starred Boards';
		},
	},
	methods: {
		toBoard(id) {
			this.$router.push({ name: 'board', params: { id } });
		},
	},
};
</script>
