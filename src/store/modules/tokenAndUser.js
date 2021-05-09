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
        updateUser(state, user) {
            state.user = { ...user }
        },
        setError(state, error) {
            state.error = error
        },
        updateToken(state, token) {
            state.token = token
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
                        sessionStorage.setItem("userId", userId);
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
        async setUserById({ commit }, id) {
            await axios
                .get(
                    "https://pure-hollows-15090.herokuapp.com/api/".concat(
                        `page/find/${id}`
                    )
                ).then(res => {
                    commit('updateUser', { ...res.data.user })
                }
                ).catch(error => commit("setError", error))
        },
        async searchUserByName({ commit }, { name, token }) {
            await axios
                .get(
                    "https://pure-hollows-15090.herokuapp.com/api/".concat(
                        `page/find/nickname=${name}`
                    ), {
                    headers: {
                        Authorization: token
                    }
                }

                ).then(res => {
                    commit("updateUser", res.data.user)
                })
                .catch(error => commit("setError", error))
        },
        setCustomError({ commit }, errorMsg) {
            commit("setError", errorMsg)
        },
        setToken({ commit }, token) {
            commit("updateToken", token)
        }
    }
}
