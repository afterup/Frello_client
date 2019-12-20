<template>
  <div class="home">
    <Footer />
  </div>
</template>

<script>
export default {
  name: "home",
  components: {
    Footer: () => import("@/components/common/TheFooter.vue")
  }
};
</script>
