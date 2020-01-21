import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth.module.js';
import board from './board.module.js';
import modal from './modal.module.js';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		auth,
		board,
		modal,
	},
});
