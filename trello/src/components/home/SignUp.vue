<template>
  <div class="signup">
    <h2>Sign Up</h2>
    <label for="email">Email</label>
    <input type="text" id="email" v-model="email" />
    <label for="username">Username</label>
    <input type="text" id="username" v-model="username" />
    <label for="password">Password</label>
    <input type="password" id="password" v-model="password" />
    <br />
    <button @click="onSubmit">SignIn</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      username: "",
      password: ""
    };
  },
  methods: {
    onSubmit() {
      console.log(this.email, this.username, this.password);
      this.$store.dispatch("signup", {
        email: this.email,
        username: this.username,
        password: this.password
      });
    }
  }
};
</script>

<style lang="scss">
.signup {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  width: 400px;
}
</style>
