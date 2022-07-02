
import {http} from './http_service'


export const login = (user) => {
    return http().post('/auth/login', user).then( res => {
        if(res.status === 200) {
            setToken(res.data)
        }
        return res
    })
}

export const isloggedIn = () => {

    const token = localStorage.getItem('dnsc')

    return token != null;
}

function setToken(user){
    const tokon = JSON.stringify(user)
    localStorage.setItem('dnsc', tokon)
}
