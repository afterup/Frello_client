import Vue from "vue";
import axios from "axios";
import { API_URL } from "@/common/config";
import JwtService from "@/common/jwt.service";

export const ApiService = {
  init() {
    Vue.use(axios);
    axios.defaults.baseURL = API_URL;
  },

  setHeader() {
    axios.defaults.headers.common["Authorization"] = `Bearer ${JwtService.getToken()}`;
  },

};