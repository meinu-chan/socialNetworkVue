import Vue from 'vue';
import Vuex from 'vuex';

import userData from "./modules/tokenAndUser"
import friends from "./modules/friends"
import publications from "./modules/publications"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        userData,
        friends,
        publications
    }
});