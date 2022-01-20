//import global API
import Api from '../../api/Api'

const keranjang = {
    //set namespace true
    namespaced: true,

    //state
    state: {

        //cart
        keranjang: [],

        //total cart
        cartTotal: 0,

        //cart weight
        cartWeight: 0
    },

    //mutations
    mutations: {

        //get data cart
        GET_CART(state, produk) {
            state.keranjang = produk
        },
        //get total cart
        TOTAL_CART(state, total) {
            state.cartTotal = total
        },
        //get cart weight
        CART_WEIGHT(state, berat) {
            state.cartWeight = berat
        },
        //clear all cart
        CLEAR_CART(state) {
            state.keranjang = []
            state.cartTotal = 0
            state.cartWeight = 0
        }
    },
    //actions
    actions: {
        //action addToCart
        addToCart({
            commit
        }, {
            produk_id,
            harga,
            qty,
            berat
        }) {
            //get data token dan user
            const token = localStorage.getItem('token')
            const user = JSON.parse(localStorage.getItem('user'))

            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer " + token

            //send data cart ke server
            Api.post('/keranjang', {
                    produk_id: produk_id,
                    harga: harga,
                    qty: qty,
                    berat: berat,
                    customer_id: user.id
                })

                .then(() => {

                    //get dat cart
                    Api.get('/keranjang')
                        .then(response => {

                            //commit mutation GET_CART
                            commit('GET_CART', response.data.keranjang)
                        })

                    //get total cart
                    Api.get('/keranjang/total')
                        .then(response => {

                            //commit mutation TOTAL_CART
                            commit('TOTAL_CART', response.data.total)
                        })
                })
        },
        //cart count
        cartCount({ commit }) {

            //get data token dan user
            const token = localStorage.getItem('token')

            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer " + token

            //get dat cart
            Api.get('/keranjang')
                .then(response => {

                    //commit mutation GET_CART
                    commit('GET_CART', response.data.keranjang)
                })
        },

        //cart total
        cartTotal({
            commit
        }) {

            //get data token dan user
            const token = localStorage.getItem('token')
             
            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer " + token

            //get dat cart
            Api.get('/keranjang/total')
                .then(response => {

                    //commit mutation GET_CART
                    commit('TOTAL_CART', response.data.total)
                })
        },

        //cart weight
        cartWeight({
            commit
        }) {
            //get data token dan user
            const token = localStorage.getItem('token')
            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer " + token
            Api.get('/keranjang/totalWeight')
                .then(response => {

                    //commit mutation CART_WEIGHT
                    commit('CART_WEIGHT', response.data.total)
                })
        },
        //remove cart
        removeCart({
            commit
        }, keranjang_id) {

            //get data token dan user
            const token = localStorage.getItem('token')

            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = "Bearer " + token
            Api.post('/keranjang/remove', {
                    keranjang_id: keranjang_id
                })
                .then(() => {
                    //get cart
                    Api.get('/keranjang')
                        .then(response => {
                            commit('GET_CART', response.data.keranjang)
                        })

                    //get total cart
                    Api.get('/keranjang/total')
                        .then(response => {
                            commit('TOTAL_CART', response.data.total)
                        })

                    //get total cart weight
                    Api.get('/keranjang/totalWeight')
                        .then(response => {
                            commit('CART_WEIGHT', response.data.total)
                        })
                })
        },

        //checkout
        checkout({
            commit
        }, data) {
            return new Promise((resolve, reject) => {
                Api.post('/checkout', {
                        courier: data.courier_type,
                        service: data.courier_service,
                        cost: data.courier_cost,
                        weight: data.weight,
                        name: data.name,
                        phone: data.phone,
                        province: data.province_id,
                        city: data.city_id,
                        address: data.address,
                        grand_total: data.grandTotal
                    })
                    .then(response => {
                        resolve(response.data)
                        //remove all Cart on database
                        Api.post('/keranjangm/removeSemua')
                            .then(() => {
                                //clear cart
                                commit('CLEAR_CART')
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    },

    //getters
    getters: {
        //get cart
        getCart(state) {
            return state.keranjang
        },

        //count cart
        cartCount(state) {
            return state.keranjang.length
        },

        //cart total
        cartTotal(state) {
            return state.cartTotal
        }
    }
}
export default keranjang