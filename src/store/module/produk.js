//import global API
import Api from '../../api/Api'

const produk = {
    //set namespace true
    namespaced: true,

    //state
    state: {

        //index products
        produks: [],

        //detail product
        produk: {}
    },

    //mutations
    mutations: {

        //set state products dengan data dari response
        GET_PRODUKS(state, produks) {
            state.produks = produks
        },
        //set state product dengan data dari response
        DETAIL_PRODUK(state, produk) {
            state.produk = produk
        }
    },
    //actions
    actions: {
        //action getProducts
        getProducts({ commit }) {
            //get data sliders ke server
            Api.get('/produks')
                .then(response => {
                    //commit ke mutation GET_PRODUCTS dengan response data
                    commit('GET_PRODUKS', response.data.produks)

                }).catch(error => {

                    //show error log dari response
                    console.log(error)

                })
        },
        //action getDetailProducts
        getDetailProduct({ commit }, slug) {
            //get data sliders ke server

            Api.get(`/produks/${slug}`)
                .then(response => {

                    //commit ke mutation GET_PRODUCTS dengan response data
                    commit('DETAIL_PRODUK', response.data.produk)

                }).catch(error => {
                    
                    //show error log dari response
                    console.log(error)
                })
        }
    },
    //getters
    getters: {}
}
export default produk