import axios from 'axios';

const api = axios.create({
    // Substitui-se o localhost pelo IP fornecido no expo
    baseURL: 'http://192.168.0.105:3333'
})

export default api;