<template>
  <BaseContainer>
    <Panel v-if="favorites.length > 0">
      <h3 slot="title">
        <i class="material-icons">star_border</i>
        Starred Boards
      </h3>
      <Card
        slot="card"
        v-for="favorite in favorites"
        :key="favorite.board_id"
        :board="favorite"
        @clickCard="toBoard(favorite.board_id)"
      ></Card>
    </Panel>
    <Panel :type="'personal'">
      <h3 slot="title">
        <i class="material-icons">person</i>
        Personal Boards
      </h3>
      <Card
        slot="card"
        v-for="board in boards"
        :key="board.board_id"
        :board="board"
        @clickCard="toBoard(board.board_id)"
      ></Card>
    </Panel>
    <Modal v-if="showModal" :type="'general'" @close="closeModal">
      <Post @close="closeModal" />
    </Modal>
  </BaseContainer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
    Panel: () => import('@/components/boards/Panel.vue'),
    Card: () => import('@/components/boards/Card.vue'),
    Post: () => import('@/components/boards/Post.vue')
  },
  created() {
    this.$store.dispatch('FETCH_BOARDS');
  },
  computed: {
    ...mapGetters(['boards', 'showModal']),
    favorites() {
      let favorites = [];
      this.boards.find(board => {
        if (board.favorite) favorites.push(board);
      });
      return favorites;
    }
  },
  methods: {
    toBoard(id) {
      this.$router.push({ name: 'board', params: { id: id } });
    },
    closeModal() {
      this.$store.commit('CLOSE_MODAL');
    }
  }
};
</script>

<style lang="scss" scoped></style>
