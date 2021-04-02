import axios from "axios";

export default {
    state: {
        token: '',
        user: null,
        error: null
    },
    getters: {
        getToken: ({ token }) => token,
        getUser: ({ user }) => user,
        getError: ({ error }) => error
    },
    mutations: {
        updateTokenAndUser(state, payload) {
            state.token = payload.token;
            state.user = payload.user;
            state.error = null;

        },
        setError(state, error) {
            state.error = error
        }
    },
    actions: {
        async setTokenAndUser({ commit }, { field, nickname, password }) {
            if (nickname.trim() && password.trim()) {
                await axios
                    .post(
                        "https://pure-hollows-15090.herokuapp.com/api/".concat(
                            `auth/${field}`
                        ),
                        {
                            nickname,
                            password
                        }
                    )
                    .then(res => {
                        const {
                            data: { token, friends, nickname, publications, requests, userId, waitingForResponse }
                        } = res;
                        commit("updateTokenAndUser", { token, user: { friends, nickname, publications, requests, userId, waitingForResponse } })
                    }).catch(err => {
                        if (err.response) {
                            commit("setError", err.response.data.message)
                        }
                    })
            }
            else {
                commit("setError", "Enter login and password for registration")
            }
        },
        setCustomError({ commit }, errorMsg) {
            commit("setError", errorMsg)
        },
    }
}
