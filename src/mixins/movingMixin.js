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
			} else if (transferData.type === 'list') {
				this.moveList(transferData);
			} else {
				return;
			}
		},
		moveCard({ fromListIndex, fromCardIndex }) {
			const toListIndex = this.listIndex;
			const toCardIndex = this.cardIndex;

			this.$store.dispatch('MOVE_CARD', {
				fromListIndex,
				fromCardIndex,
				toListIndex,
				toCardIndex,
			});
		},
		moveList({ fromListIndex }) {
			this.$store.dispatch('MOVE_LIST', {
				fromListIndex,
				toListIndex: this.listIndex,
			});
		},
	},
};
