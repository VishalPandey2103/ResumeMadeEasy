import axios from 'axios'

const apiBaseUrl =
    import.meta.env.VITE_BACKEND_URL ||
    import.meta.env.VITE_BASE_URL ||
    'http://localhost:3000'

const api = axios.create({
    baseURL: apiBaseUrl
})

export default api