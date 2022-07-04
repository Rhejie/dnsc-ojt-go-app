
import {http} from './http_service'


export const login = (user) => {
    return http().post('/auth/login', user).then( res => {
        if(res.status === 200) {
            setToken(res.data)
        }
        return res
    })
}

export const logout = async () => {
    return await http().get('/auth/logout').then(res => {
        localStorage.removeItem('dnsc')
        return res
    })
} 

export const getProfile = async () => {
    return await http().get('/auth/profile');
}

export const isloggedIn = () => {

    const token = localStorage.getItem('dnsc')

    return token != null;
}

function setToken(user){
    const token = JSON.stringify(user)
    localStorage.setItem('dnsc', token)
}


export const accessToken = () => {

    const t = localStorage.getItem('dnsc');
    if(!t) return null;
    const token = JSON.parse(localStorage.getItem('dnsc') || '');
    if(!token) {
        return ''
    }

    return token.access_token
}