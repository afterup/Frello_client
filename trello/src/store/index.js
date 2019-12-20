import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {},
  actions: {
    signup({ commit, dispatch }, authData) {
      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD7cBLEt_0og_yaXqTr01GcTveiuh6Mbas",
          {
            email: authData.email,
            username: authData.username,
            password: authData.password,
            returnSecureToken: true
          }
        )
        .then(res => {
          console.log(res);
        });
    }
  },
  modules: {}
});
