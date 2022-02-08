<template>
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col-md-3 mb-4">
                <Kategori /> <!-- component Category -->
            </div>
            <div class="col-md-9 mb-4">
                <Slider /> <!-- component Slider -->
            </div>
        </div>
    </div>
    <div class="container-fluid mb-5 mt-4">
        <!-- data produk -->
        <div class="row">
            <div class="col-md-12">
                <h4 class="font-weight-bold"><i class="fa fa-shopping-bag"></i> PRODUK TERBARU</h4>
                <hr style="border-top: 5px solid rgb(154 155 156);border-radius:.5rem">
            </div>
        </div>
        <div class="row">
            <div v-for="produk in produks" :key="produk.id" class="col-md-3 col-6 mb-3">
                <div class="card h-100 border-0 shadow rounded-md">
                    <div class="card-img">
                        <img :src="'http://127.0.0.1:8000/storage/produks/'+produk.foto" class="w-100"
                            style="height: 15em;object-fit:cover;bordertop-left-radius: .25rem;border-top-right-radius: .25rem;">
                    </div>
                    <div class="card-body">
                        <router-link :to="{name: 'detail_produk', params:{slug: produk.slug }}" class="card-title font-weight-bold" style="font-size:20px">
                            {{ produk.nama }}
                        </router-link>
                        <div class="discount mt-2" style="color: #999">
                            <button type="button" class="btn btn-success position-relative">
                            Rp. {{ moneyFormat(produk.harga) }}
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {{ produk.diskon }} % 
                            </span>
                            </button>
                        </div>
                        
                        <router-link :to="{name: 'detail_produk', params:{slug: produk.slug}}" class="btn btn-primary btn-md mt-3 btn-block shadow-md">LIHAT PRODUK</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Kategori from '@/components/Kategori' // <-- component Kategori
    import Slider from '@/components/Slider' // <-- component Slider
    import {
        computed,
        onMounted
    } from 'vue'
    import {
        useStore
    } from 'vuex'
    export default {
        components: {
            Kategori, // <-- register component Kategori
            Slider // <-- register component slider
        },
        setup() {
            //store vuex
            const store = useStore()

            //onMounted akan menjalankan action "getProducts" di module "product"
            onMounted(() => {
                store.dispatch('produk/getProducts')
            })

            //computed properti digunakan untuk get data products dari state di module product
            const produks = computed(() => {
                return store.state.produk.produks
            })
            return {
                store,
                produks
            }
        }
    }
</script>