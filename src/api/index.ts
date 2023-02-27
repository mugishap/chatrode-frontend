import axios from 'axios'

const api = axios.create({
    baseURL: "https://localhost:3000"
})

const socketUrl = "https://localhost:3000"

export {
    api,
    socketUrl
}