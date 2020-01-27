<template>
    <div class="card" @click="clickEvent" :class="board.background">
        <div class="card__title">{{ board.title }}</div>
    </div>
</template>

<script>
export default {
    props: {
        board: {
            type: Object,
            required: true
        }
    },
    methods: {
        clickEvent() {
            this.$emit('clickCard');
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/lib/styles/_boardPalette';
.card {
    background-position: center;
    border-radius: 3px;
    width: 190px;
    height: 95px;
    margin: 4.5px 9px;
    position: relative;

    &:hover {
        cursor: pointer;
    }

    &__title {
        position: absolute;
        color: white;
        font-size: 1.6rem;
        font-weight: bold;
        margin: 10px 0 0 5px;
    }
}
</style>
