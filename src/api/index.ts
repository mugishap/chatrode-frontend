import axios from 'axios'
import { apiUrl } from './url'

const api = axios.create({
    baseURL: apiUrl
})

export {
    api
}