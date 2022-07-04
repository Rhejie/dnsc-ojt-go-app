import { ElNotification } from 'element-plus';
import { ref } from 'vue';
import {http} from '../http_service'

export const getInstitutes = async (params) => {
    return await http().get(`/user/setting/institutes?page=${params.current_page}&count=${params.current_size}&search=${params.search}`)
} 

export const storeInstitute = async (data) => {
    const instituteRes = ref({})
    const instituteError = ref();
    const loadingInstitute = ref(false)

    loadingInstitute.value = true
    await http().post('/user/setting/institutes', data).then(res => {
        instituteRes.value = res.data
        loadingInstitute.value = false
        ElNotification({
            title: 'Success',
            message: 'Successfully Added!',
            type: 'success',
          })
    }).catch(error => {
        instituteError.value = error.response.data
    });
    
    return { instituteRes , instituteError, loadingInstitute}
}

export const updateInstitute = async (id, data) => {
    const instituteRes = ref({})
    const instituteError = ref();
    const loadingInstitute = ref(false)

    loadingInstitute.value = true
    await http().patch(`/user/setting/institutes/${id}`, data).then(res => {
        instituteRes.value = res.data
        loadingInstitute.value = false
        ElNotification({
            title: 'Success',
            message: 'Successfully Updated!',
            type: 'success',
          })
    }).catch(error => {
        instituteError.value = error.response.data
    })

    return {
        instituteRes,
        loadingInstitute,
        instituteError
    }
}

export const deleteInstitute = async (id) => {
    return await http().delete(`/user/setting/institutes/${id}`).then(() => {
        ElNotification({
            title: 'Success',
            message: 'Successfully Delete!',
            type: 'success',
          })
    }).catch(error => {
        console.log('Error in deleting institute -->', error)
    })
}

export const getInstituteById = (id) => {
    const instituteRes = ref({});
    const loadingInstitute = ref(false)
    const loadInstitute = async () => {
        loadingInstitute.value = true
        await http().get(`/user/setting/institutes/${id}`).then(res => {
            instituteRes.value = res.data
            loadingInstitute.value = false
        }).catch(error => {
            console.log('error in getting institute by id --->', error)
        });
    }

    return {
        instituteRes,
        loadInstitute,
        loadingInstitute
    }
}