<template>
    <div class="card border-0 shadow rounded">
        <div class="card-body">
            <h5 class="font-weight-bold"><i class="fa fa-shopping-bag"></i> KATEGORI</h5>
            <hr>
            <ul class="list-group">
                <router-link :to="{name: 'detail_kategori', params:{slug: kategori.slug}}" v-for="kategori in kategoris" :key="kategori.id" class="list-group-item shadow-sm font-weight-bold text-decoration-none text-dark">
                    <img :src="kategori.foto" style="width:35px"> {{ kategori.nama }}
                </router-link>
                <router-link :to="{name: 'kategoris'}" class="list-group-item textcenter active shadow-sm font-weight-bold text-decoration-none">LIHAT KATEGORI LAINNYA <i class="fa fa-long-arrow-alt-right"></i></router-link>
            </ul>
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
            //onMounted akan menjalankan action getCategories di module category, sebelum computed di atas dijalankan
            onMounted(() => {
                store.dispatch('kategori/getCategories')
            })
            //computed properti digunakan untuk get data categories dari state di module category
            const kategoris = computed(() => {
                return store.state.kategori.kategoris
            })
            return {
                kategoris
            }
        }
    }
</script>