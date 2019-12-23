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
    },
    SET_ERROR(state,error){
      state.error = error;
    }
  },
  actions: {
    async signup({ commit }, authData) {
      try{
        const user = await axios.post("/signup",
          authData
        )
        return user;
      }catch(error){
        commit('SET_ERROR',error.response.data.error);
        return error;
      }
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
    },
    error(state){
      return state.error;
    }
  },
  modules: {}
});
