<template>
  <div id="app">
    <TheHeader />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    TheHeader: () => import("@/components/common/TheHeader.vue")
  }
};
</script>

<style lang="scss">
.container {
  max-width: 120rem;
  margin: 0 6rem auto;
  background-color: #ffffff;

  min-height: 50rem;
}
</style>
