"use strict";

import Vue from "vue";
import Vuex from "vuex";
import createState from "./state";
import getters from "./getter";
import * as mutations from "./mutations";
import actions from "./actions";
import article from "./modules/article";
import general from "./modules/general";
import auth from "./modules/auth";
import market from "./modules/market";
import strategy from "./modules/strategy";
import playcard from "./modules/playcard";
import constants from "./modules/constants";
import shuftipro from "./modules/shufti-pro";
import trade from "./modules/trade";
import size from "./modules/size";


Vue.use(Vuex);

const store = () => {
  const state = createState();
  return new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
      article,
      general,
      auth,
      market,
      strategy,
      playcard,
      constants,
      'shufti-pro': shuftipro,
      trade,
      size
    }
  });
};
export default store;
