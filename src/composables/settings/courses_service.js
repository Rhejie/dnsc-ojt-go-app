import { ElNotification } from 'element-plus';
import { ref } from 'vue';
import {http} from '../http_service'

export const getCourses = async (params) => {
    return await http().get(`/user/setting/courses?page=${params.current_page}&count=${params.current_size}&search=${params.search}`)
} 

export const storeCourse = async (data) => {
    const response = ref();
    const errorCourse = ref();
    const loadingCourse = ref(false)

    loadingCourse.value = true;
    await http().post('/user/setting/courses', data).then(res => {
        response.value = res.data
        loadingCourse.value = false;
        ElNotification({
            title: 'Success',
            message: 'Successfully Added!',
            type: 'success',
          })
    }).catch(error => {
        errorCourse.value = error.response.data.errors
        loadingCourse.value = false;
    });

    return {
        response, errorCourse, loadingCourse
    }
}

export const getCourseById = async (id) => {
    console.log(id)
}