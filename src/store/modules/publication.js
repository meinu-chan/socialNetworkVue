import axios from 'axios'

export default {
    state: {
        publication: null
    },
    getters: {
        publication: state => {
            return state.publication;
        }
    },
    mutations: {
        updatePublication(state, payload) {
            state.publication = payload;
        }
    },
    actions: {
        async getPublication({ commit }, publicId) {

            const { data } = await axios.get("https://pure-hollows-15090.herokuapp.com/api/".concat(`publication/${publicId}`))

            // await data.comments.forEach(async (c, index) => {
            //     const { data: comment } = await axios.get("https://pure-hollows-15090.herokuapp.com/api/".concat(`comment/getComment/${c._id}`))
            //     data.comments[index] = comment
            // })

            commit('updatePublication', data);
        }
    }
};