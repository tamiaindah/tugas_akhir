<template>
    <div class="container-fluid mb-5 mt-4">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card border-0 shadow rounded">
                    <div class="card-body">
                        <h4>REGISTER</h4>
                        <hr>
                        <form @submit.prevent="register">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Full Name</label>
                                        <input type="text" v-model="user.name" class="form-control" placeholder="Full Name">
                                    </div>
                                    <div v-if="validation.name" class="mt-2 alert alert-danger">
                                        {{ validation.name[0] }}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Email address</label>
                                        <input type="email" v-model="user.email" class="form-control" placeholder="Email Address">
                                    </div>
                                    <div v-if="validation.email" class="mt-2 alert alert-danger">
                                        {{ validation.email[0] }}
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Password</label>
                                        <input type="password" v-model="user.password" class="form-control" placeholder="Password">
                                    </div>
                                    <div v-if="validation.password" class="mt-2 alert alert-danger">
                                        {{ validation.password[0] }}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Konfirmasi Password</label>
                                        <input type="password" v-model="user.password_confirmation" class="form-control" placeholder="Konfirmasi Password">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Provinsi</label>
                                        <select class="form-control" v-model="user.provinsi_id" @change="getCities">
                                            <option value="">-- pilih provinsi --</option>
                                            <option v-for="province in user.provinces" :key="province.id" :value="province.provinsi_id">
                                                {{ province.nama }}</option>
                                        </select>
                                        <div v-if="validation.province" class="mt-2 alert alert-danger">
                                            {{ validation.province[0] }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Kota / Kabupaten</label>
                                        <select class="form-control" v-model="user.city_id" @change="getCourier">
                                            <option value="">-- pilih kota --</option>
                                            <option v-for="city in user.cities" :key="city.id" :value="city.kota_id">{{ city.nama }}
                                            </option>
                                        </select>
                                        <div v-if="validation.city" class="mt-2 alert alert-danger">
                                            {{ validation.city[0] }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Alamat</label>
                                        <textarea class="form-control" id="alamat" rows="3" style="resize: none;" v-model="user.address"></textarea>
                                        <div v-if="validation.address" class="mt-2 alert alert-danger">
                                            {{ validation.address[0] }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary btn-block">REGISTER</button>
                        </form>
                    </div>
                </div>
                <div class="register mt-3 text-center" style="color: #AB6D23">
                    <p>
                        Suda punya akun ? <router-link :to="{name: 'login'}" style="color: #AB6D23">Login Disini !</router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { onMounted, ref, reactive } from 'vue'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'
    import Api from '../../api/Api' // <-- global API endpoint

    export default {

        setup() {
            //user state
            const user = reactive({
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                provinces: [], // <-- state provinces
                provinsi_id: '', // <-- state ID province
                cities: [], // <-- state cities
                city_id: '', // <-- state ID City
                address: '', // <-- state address
            })

            //validation state
            const validation = ref([])

            //store vuex
            const store = useStore()

            //route
            const router = useRouter()

            //mounted data provinces
            const provinces = onMounted(() => {
                Api.get('/rajaongkir/provinsi')
                    .then(response => {
                        user.provinces = response.data.data // <-- assign state provinces dengan data hasil response
                    }).catch(error => {
                        console.log(error)
                    })
            })

            //fungsi mendapatkan data kota berdasarkan ID provinsi
            function getCities() {
                Api.get('/rajaongkir/kota', {
                        params: {
                            provinsi_id: user.provinsi_id // ID provinsi
                        }
                    })
                    .then(response => {
                        user.cities = response.data.data // <-- assign state cities dengan data hasil response
                    }).catch(error => {
                        console.log(error)
                    })
            }

            //function register, fungsi ini di jalankan ketika form di submit
            function register() {
                
                //define variable
                let name = user.name
                let email = user.email
                let password = user.password
                let password_confirmation = user.password_confirmation
                let province = user.provinsi_id
                let city = user.city_id
                let address = user.address

                //panggil action "register" di dalam module "auth" vuex
                store.dispatch('auth/register', {
                        name,
                        email,
                        password,
                        password_confirmation,
                        province,
                        city,
                        address
                    })
                    
                    .then(() => {
                        //redirect ke dashboard
                        router.push({ name: 'dashboard'
                        })
                    }).catch(error => {
                        //show validaation message
                        validation.value = error
                    })
            }
            //return a state and function
            return {
                user,
                validation,
                register,
                provinces, // <-- data provinces
                getCities, // <-- data city
            }
        }
    }
</script>