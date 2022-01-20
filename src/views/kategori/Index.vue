<template>
    <div class="container-fluid mb-5 mt-4">
        <div class="row">
            <div v-for="kategori in kategoris" :key="kategori.id" class="col-md-2 col-4 mb-3">
                <router-link :to="{name: 'detail_kategori', params:{slug: kategori.slug}}">
                    <div class="card h-100 border-0 rounded shadow">
                        <div class="card-body text-center">
                            <img :src="kategori.foto" style="width: 100px;">
                            <hr>
                            <label class="font-weight-bold">{{ kategori.nama }}</label>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        computed,
        onMounted
    } from 'vue'

import {
        useStore
    } from 'vuex'
    export default {
        setup() {
            //store vuex
            const store = useStore()
            //onMounted akan menjalankan action "getCategories" di module "category"
            onMounted(() => {
                store.dispatch('kategori/getCategories')
            })
            //computed properti digunakan untuk mendapatkan data dari state "categories" di module "category"
            const kategoris = computed(() => {
                return store.state.kategori.kategoris
            })
            return {
                store,
                kategoris
            }
        }
    }
</script>