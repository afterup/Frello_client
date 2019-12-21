import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import JwtService from '@/common/jwt.service.js'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    storeUser(state, user){
      state.user = user;
    }
  },
  actions: {
    signup({ commit, dispatch }, authData) {
      console.log(authData);
      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD7cBLEt_0og_yaXqTr01GcTveiuh6Mbas",
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          }
        )
        .then(res => {
          console.log(res);
          JwtService.saveToken(res.data.idToken);
          dispatch('storeUser', authData);
        });
    },
    storeUser({commit, state}, user){
      if(!JwtService.getToken()){
        return;
      }
      axios.post("/users.json",user)
        .then(res => {
          console.log(res);
          commit('storeUser', user);
        })
        .catch(err => console.log(err));
    }
  },
  getters: {

  },
  modules: {}
});
