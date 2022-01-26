import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://kitsu.io/api/edge',
    timeout:3000,
})
export default instance

