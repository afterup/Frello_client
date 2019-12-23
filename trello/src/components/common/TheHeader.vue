<template>
  <header class="header">
    <div class="header__home">
      <button class="header__home__button">
        <i class="material-icons">home</i>
      </button>
      <div class="header__home__search">
        <input type="text" class="header__home__search__input" />
      </div>
    </div>
    <div class="header__logo">
      <svg width="200" height="40">
        <image href="@/assets/image/Trello_logo.svg" width="90" height="40" />
      </svg>
    </div>
    <NavigationItems />
  </header>
</template>

<script>
export default {
  components: {
    NavigationItems: () => import("@/components/common/NavigationItems.vue")
  }
};
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 15px;
  background-color: #0269a7;
  font-size: 1.5rem;
  color: white;

  &__logo {
    align-self: flex-start;
  }

  &__home {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  &__home__button {
    border: 1px solid white;
    border-radius: 3px;
    margin-right: 5px;

    width: 30px;
    height: 30px;
  }

  &__home__button:hover {
    cursor: pointer;
    border: 1px solid white;
    border-radius: 3px;
    margin-right: 5px;

    width: 30px;
    height: 30px;
  }

  &__home__search__input {
    border: none;
    border-radius: 3px;
    width: 180px;
    height: 30px;
    background-color: #6ea5ca;
  }

  &__user {
    position: relative;
  }

  &__user:hover .header__user__content {
    display: flex;
    flex-direction: column;
  }

  &__user__button {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
    background-color: #dfe1e6;
    color: black;
    height: 30px;
    width: 30px;
    font-size: 1.6rem;
    font-weight: bolder;
  }

  &__user__content {
    /* 임시 드롭다운 */
    display: none;
    position: absolute;
    background-color: white;
    color: black;
    min-width: 200px;
    padding: 12px 16px;
    z-index: 1;

    left: auto;
    right: 0;
    margin-right: -10px;
  }

  &__user__content ul {
    list-style: none;
  }
}
</style>