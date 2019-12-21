import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import JwtService from '@/common/jwt.service.js'
import { ApiService } from "../common/api.service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: "",
      email: "",
      username: "",
      photo: "",
      created_at: ""
    },
    isAuthenticated: null,
    error: null
  },
  mutations: {
    SET_USER_DATA(state, user){
      state.isAuthenticated = true;
      state.user = user;
      ApiService.setHeader(user.idToken);
      JwtService.saveToken(user.idToken);
      localStorage.setItem('expiresIn',user.expiresIn);
    }
  },
  actions: {
    async signup({ commit, dispatch }, authData) {
      const { data } = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+process.env.VUE_APP_API_KEY,
          authData
        )
        console.log(data);
        const currentDate = new Date().getTime();
        dispatch('storeUser', {
            localId: authData.localId,
            email: authData.email,
            username: authData.username,
            photo: "",
            created_at: currentDate
        });
    },
    storeUser({commit, state}, user){
      axios.post("/users.json",user)
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
    },
    login({commit, state},user){
      console.log(user);
      axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+process.env.VUE_APP_API_KEY,
      user)
        .then(({data})=> {
          axios.get('/users.json'+'?auth='+data.idToken)
            .then(({data})=>{
              commit('SET_USER_DATA', data);
            })
            .catch(err=>{
              console.log(err);
            })
        })
    }

  },
  getters: {
    isAuthenticated({state}){
      return state.isAuthenticated;
    },
    currentUser(state){
      return state.user;
    }
  },
  modules: {}
});
