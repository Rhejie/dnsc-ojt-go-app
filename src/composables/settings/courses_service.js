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

export const updateCourse = async (id, course) => {
    const responsedUpdate = ref();
    const errorCourseUpdate = ref();
    const loadingCourseUpdate = ref(false)

    loadingCourseUpdate.value = true;

    await http().patch(`/user/setting/courses/${id}`, course).then(res => {
        responsedUpdate.value = res.data
        loadingCourseUpdate.value = false;
        ElNotification({
            title: 'Success',
            message: 'Successfully Updated!',
            type: 'success',
          })
    }).catch(error => {
        errorCourseUpdate.value = error.response.data
    })

    return {
        responsedUpdate,
        errorCourseUpdate,
        loadingCourseUpdate
    }

}

export const getCourseById = (id) => {
    const response = ref();
    const errorCourse = ref();
    const loadingCourse = ref(false);

    const loadCourse = async () => {
        loadingCourse.value = true
        await http().get(`/user/setting/courses/${id}`).then(res => {
            response.value = res.data
        }).catch(error => {
            errorCourse.value = error
        }).finally(() => loadingCourse.value = false)
    }

    return {
        loadCourse,
        errorCourse,
        loadingCourse,
        response
    }
}