<template>
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-md-4">
                <div class="card border-0 rounded shadow">
                    <div class="card-body p-2">
                        <img :src="produk.foto" class="w-100 border">
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <label class="font-weight-bold" style="fontsize: 20px;"> {{ produk.nama }} </label>
                        <hr>
                        <div class="price-product" id="price-product" style="font-size: 1.35rem"><span class="font-weight-bold mr-4" style="color: green">Rp. {{ calculateDiscount(produk) }}</span>
                            <s class="font-weight-bold" style="textdecoration-color:red">Rp. {{ produk.harga }}</s>
                        </div>
                        <table class="table table-borderless mt-3">
                            <tbody>
                                <tr>
                                    <td class="font-weight-bold">DISKON</td>
                                    <td>:</td>
                                    <td>
                                        <button class="btn btn-sm" style="color: #ff2f00;border-color: #ff2f00;">
                                            DISKON {{ produk.diskon }} %
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="font-weightbold">BERAT</td>
                                    <td>:</td>
                                    <td>
                                        <span class="badge badge-pill badge-success" style="font-size: 14px;border-radius: .3rem;padding: .25em .5em .2em;"> {{ produk.berat }} gram </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button @click.prevent="addToCart(produk.id, calculateDiscount(produk), produk.berat)" class="btn btn-primary btnlg btn-block"><i class="fa fa-shopping-cart"></i> TAMBAH KE KERANJANG</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <label class="font-weight-bold" style="fontsize: 20px;">KETERANGAN</label>
                        <hr>
                        <div v-html="produk.konten"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        computed,
        onMounted
    } from 'vue' // computed dan onMounted
    import {
        useStore
    } from 'vuex' // store Vuex
    import {
        useRoute,
        useRouter
    } from 'vue-router' // vue router
    export default {
        setup() {
            //vue route
            const route = useRoute()
            //vue router
            const router = useRouter()
            //store vuex
            const store = useStore()
            //onMounted akan menjalankan action "getDetailProduct" di module "produk"
            Vuex
            onMounted(() => {
                store.dispatch('produk/getDetailProduct', route.params.slug)
            })
            //computed properti digunakan untuk mendapatkan data detail product dari state "product" di module "produk"
            Vuex
            const produk = computed(() => {
                return store.state.produk.produk
            })
            /**
             * function addToCart
             */
            function addToCart(produk_id, price, weight) {
                //check token terlebih dahulu
                const token = store.state.auth.token
                if (!token) {
                    return router.push({
                        nama: 'login'
                    })
                }
                //panggil action addToCart di module cart
                store.dispatch('keranjang/addToCart', {
                    produk_id: produk_id,
                    harga: harga,
                    berat: berat,
                    qty: 1
                })
            }
            return {
                route,
                router,
                store,
                produk,
                addToCart
            }
        }
    }
</script>