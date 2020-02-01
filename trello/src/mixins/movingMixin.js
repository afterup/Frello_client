export default {
	props: {
		list: {
			type: Object,
			required: true,
		},
		listIndex: {
			type: Number,
			required: true,
		},
	},
	methods: {
		moveCardOrList(transferData) {
			console.log(transferData);
			if (transferData.type === 'card') {
				this.moveCard(transferData);
			} else {
				this.moveList(transferData);
			}
		},
		moveCard({ fromListIndex, fromCardIndex }) {
			const fromCards = this.lists[fromListIndex].Cards;
			const toListIndex = this.listIndex;
			const toCards = this.lists[toListIndex].Cards;

			this.$store.commit('MOVE_TASK_CARD', {
				fromCards,
				fromCardIndex,
				toCards,
				toCardIndex: this.cardIndex,
			});
		},
		moveList({ fromListIndex }) {
			this.$store.commit('MOVE_COLUMN_LIST', {
				fromListIndex,
				toListIndex: this.listIndex,
			});
		},
	},
};
