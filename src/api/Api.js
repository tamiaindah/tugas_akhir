//import axios
import axios from 'axios'
const Api = axios.create({
    //set default endpoint API
    baseURL: 'https://hanaflowerstory.com/api'
})
export default Api