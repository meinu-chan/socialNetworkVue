import Vue from 'vue';
import Vuex from 'vuex';

import userData from "./modules/tokenAndUser"
import friends from "./modules/friends"
import publications from "./modules/publications"
import publication from "./modules/publication"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        userData,
        friends,
        publications,
        publication
    }
});