<template>
  <ul class="header__navigation">
    <router-link class="header__navigation__login" :to="{name: 'login'}">Log In</router-link>
    <router-link class="header__navigation__signup" :to="{name:'signup'}">Sign Up</router-link>
  </ul>
  <!-- <div>
        <div class="header__user">
          <div class="header__user__button">A</div>
          <div class="header__user__content">
            <div class="header__user__content__username">User(id)</div>
            <hr />
            <ul>
              <li>Setting</li>
              <li>Logout</li>
            </ul>
          </div>
        </div>
  </div>-->
</template>

<script>
export default {};
</script>

<style lang="scss">
.header {
  &__navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__login {
      text-decoration-line: none;
      margin-right: 20px;
      color: white;

      &:hover {
        text-decoration-line: underline;
      }

      &:visted {
        color: white;
      }
    }

    &__signup {
      text-decoration-line: none;
      background-color: white;
      color: var(--color-primary);
      font-size: 1.5rem;
      font-weight: bold;
      padding: 5px;
      border-radius: 3px;
    }
  }
}
</style>