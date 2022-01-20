//import vuex
import { createStore } from 'vuex'

//import module auth
import auth from './module/auth'

//import module order
import order from './module/order'

//import module category
import kategori from './module/kategori'

//import module slider
import slider from './module/slider'

//import module product
import produk from './module/produk'

//import module cart
import keranjang from './module/keranjang'

//create store vuex
export default createStore({
    modules: {
        auth, // <-- module auth
        order, // <-- module order
        kategori, // <-- module category
        slider, // <-- module slider
        produk, // <-- module product
        keranjang, // <-- module cart
    }
})