<template>
    <div id="carousel" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item" v-for="(sliders, id) in sliders" :class="{ active: id==0 }" :key='sliders.id'>
                <img :src="'http://127.0.0.1:8000/storage/sliders/'+sliders.foto" class="d-block w-100 rounded-lg">
            </div>
        </div>
        <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" ariahidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
            <span class="carousel-control-next-icon" ariahidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
    <div class="row mt-3">
    <div class="col-sm-6">
        <div class="card">
        <div class="card-body">
            <h5 class="card-title">Special gift for someone you love</h5>
            <p class="card-text">Kami menyediakan banyak paket hadiah untuk orang tercinta</p>
        </div>
        </div>
    </div>
    <div class="col-sm-6">
        <div class="card">
        <div class="card-body">
            <h5 class="card-title">Special Flower for gift</h5>
            <p class="card-text">Berbagai macam bunga untuk menyampaikan ungkapan kami sediakan</p>
        </div>
        </div>
    </div>
    </div>
    <div class="card text-center mt-3">
    <div class="card-body">
        <h5 class="card-title">Hana Flower Story</h5>
        <p class="card-text">Hana Flower Story merupakan sebuah florist atau toko bunga milik Amelia yang cukup besar dan terkenal di daerah Seturan, Yogyakarta yang berdiri sejak tahun 2015. Hana Flower Story menjual berbagai macam bouquet bunga mulai dari untuk keperluan wisuda, birthday party, wedding, karangan bunga besar, dry flower, serta seasonal flower. </p>
        <blockquote class="blockquote mb-0">
      <p>because every flower has its story</p>
      '<footer class="blockquote-footer"><cite title="Source Title">Hana Flower Story</cite></footer>
    </blockquote>
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
            //onMounted akan menjalankan action "getSliders" di module "slider"
            onMounted(() => {
                store.dispatch('slider/getSliders')
            })
            //computed properti digunakan untuk mendapatkan data dari state "sliders" di module "slider"
            const sliders = computed(() => {
                return store.state.slider.sliders
            })
            return {
                store,
                sliders
            }
        }
    }
</script>