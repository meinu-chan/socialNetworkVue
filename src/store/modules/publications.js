import axios from "axios";

export default {
    state: {
        publications: [],
    },
    getters: {
        getPublications: state => {
            return state.publications;
        },
    },
    mutations: {
        updatePublications(state, payload) {
            state.publications = payload;
        },
        updatePublication(state, payload) {
            for (const i in state.publications) {
                if (state.publications[i]._id === payload._id)
                    state.publications[i] = payload
            }
        }
    },
    actions: {
        async getAllPublications({ commit }, id) {
            try {
                const { data: { publications } } = await axios.get("https://pure-hollows-15090.herokuapp.com/api/".concat(`publication/getAll/${id}`))
                commit("updatePublications", publications)
            } catch (error) {
                console.log(error)
            }
        },
        async ratePublication({ commit }, publicId) {
            try {
                const { data: { publication } } = await axios.put("https://pure-hollows-15090.herokuapp.com/api/".concat(`publication/rate`),
                    { publicId },
                    {
                        headers: {
                            Authorization: sessionStorage.getItem("token")
                        }
                    })
                commit("updatePublication", publication)
            } catch (error) {
                console.log(error)
            }
        }
    }
};