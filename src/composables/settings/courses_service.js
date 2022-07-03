import {http} from '../http_service'

export const getCourses = async (data) => {
    return await http().get('/user/setting/courses', data);
} 

export const storeCourse = async (data) => {
    return await http().post('/user/setting/courses', data);
}

export const getCourseById = async (id) => {
    
}