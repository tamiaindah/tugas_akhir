<template>
    <div class="container-fluid mb-5 mt-4">
        <div class="row">
            <div v-for="produk in produks" :key="produk.id" class="col-md-3 col-6 mb-3">
                <div class="card h-100 border-0 shadow rounded-md">
                    <div class="card-img">
                        <img :src="'http://127.0.0.1:8000/storage/produks/'+produk.foto" class="w-100"
                            style="height: 15em;object-fit:cover; border-top-left-radius: .25rem;border-top-right-radius: .25rem;">
                    </div>
                    <div class="card-body">
                        <router-link :to="{name: 'detail_produk', params:{slug: produk.slug }}" class="card-title font-weight-bold" style="font-size:20px">
                            {{ produk.nama }}
                        </router-link>
                        <div class="discount mt-2" style="color: #999"><s>Rp. {{ moneyFormat(produk.harga) }}</s>
                            <span style="background-color: darkorange" class="badge badge-pill badge-success text-white">DISKON
                                {{ produk.diskon }} %</span>
                        </div>
                        <div class="price font-weight-bold mt-3" style="color: #47b04b;font-size:20px">
                            Rp. {{ moneyFormat(calculateDiscount(produk)) }}</div>
                        <router-link :to="{name: 'detail_produk', params:{slug: produk.slug}}" class="btn btn-primary btn-md mt-3 btn-block shadow-md">LIHAT PRODUK</router-link>
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
        useRoute
    } from 'vue-router' // vue router
    export default {
        setup() {
            //store vuex
            const store = useStore()
            //vue route
            const route = useRoute()
            //onMounted akan menjalankan action "getProductInCategory" di module "category" Vuex
            onMounted(() => {
                store.dispatch('kategori/getProductInCategory',
                    route.params.slug)
            })
            //computed properti digunakan untuk mendapatkan data products dari state "productInCategory" di module "category"
            const produks = computed(() => {
                return store.state.kategori.productInCategory
            })
            return {
                store,
                route,
                produks
            }
        }
    }
</script>