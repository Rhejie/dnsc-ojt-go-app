import axios from 'axios';
import store from '@/store/index'

export function http() {
    return axios.create({
        baseURL: store.state.apiURL,
    });
}

export function httpServer() {
    return axios.create({
        baseURL: store.state.serverPath,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}