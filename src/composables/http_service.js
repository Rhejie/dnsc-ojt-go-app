import axios from 'axios';
import store from '@/store/index'
import {accessToken} from '@/composables/auth_service'

export function http() {
    return axios.create({
        baseURL: store.state.apiURL,
        headers: {
            'Authorization': 'Bearer '+accessToken()
        }
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