import axios from 'axios'

export default {
    state: {
        friends: [],
        loading: false
    },
    getters: {
        getFriends: ({ friends }) => friends,
        getLoading: ({ loading }) => loading
    },
    mutations: {
        updateFriends(state, payload) {
            state.friends = [...payload];
        },
        updateLoading(state, bool) {
            state.loading = bool;
        },
    },
    actions: {
        async setFriends({ commit }, id) {
            commit('updateLoading', true);
            await axios.get(
                "https://pure-hollows-15090.herokuapp.com/api/".concat(
                    `page/friends/${id}`)
            ).then(res => {
                commit('updateFriends', res.data.friends);
            });
            commit('updateLoading', false);
        }
    }
}