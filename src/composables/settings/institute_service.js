import {http} from '../http_service'

export const getInstitutes = async (data) => {
    return await http().get('/user/setting/institutes', data);
} 

export const storeInstitute = async (data) => {
    return await http().post('/user/setting/institutes', data);
}

export const getInstituteById = async (id) => {
    
}