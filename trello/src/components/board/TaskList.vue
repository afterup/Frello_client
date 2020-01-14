<template>
	<div class="list__items">
		<div class="list__items__item" v-for="card in cards" :key="card.id">
			<div class="list__items__item__title">
				{{ card.title }}
			</div>
		</div>

		<input
			type="text"
			class="add-list__input"
			plceholder="Enter a title for this card..."
			v-model="cardTitle"
			v-if="showCardCreateInput"
			@keyup.enter="createCard"
		/>
		<div class="list__items__add" @click="handleCardCreateInput" v-else>
			<i class="material-icons">
				add
			</i>
			<div class="list__items__add__text">Add another card</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showCardCreateInput: false,
			cardTitle: '',
		};
	},
	props: {
		cards: {
			type: Array,
			required: false,
		},
		listId: {
			type: Number,
			required: true,
		},
	},
	methods: {
		createCard() {
			this.$store
				.dispatch('PUBLISH_CARD', {
					list_id: this.listId,
					title: this.cardTitle,
					position: 1,
				})
				.then(() => {
					this.handleCardCreateInput();
					this.cardTitle = '';
				});
		},
		handleCardCreateInput() {
			this.showCardCreateInput = !this.showCardCreateInput;
		},
	},
};
</script>

<style lang="scss" scoped>
.list__items__item {
	display: flex;
	align-items: center;
	background-color: white;
	width: 250px;
	height: 30px;
	margin-bottom: 8px;
	border-radius: 2px;
	box-shadow: 0px 1.3px rgb(182, 182, 182);
}

.list__items__item:hover {
	background-color: rgb(240, 240, 240);
	cursor: pointer;
}

.list__items__item__title {
	margin-left: 8px;
	font-size: 1.4rem;
}

.list__items__add {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-top: 10px;
	width: 250px;
	height: 30px;
	border-radius: 3px;
}

.list__items__add:hover {
	background-color: rgb(218, 218, 218);
	cursor: pointer;
}

.list__items__add__text {
	color: gray;
	font-size: 1.3rem;
}

.list__items__add i {
	color: gray;
	font-size: 18px;
}

.add-list {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	background-color: rgba(187, 187, 187, 0.74);
	border-radius: 2px;
	width: 250px;
	height: 30px;
}

.add-list i {
	color: gray;
	font-size: 18px;
}

.add-list__text {
	color: gray;
	font-size: 1.3rem;
}
</style>
