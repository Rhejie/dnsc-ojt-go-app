import { ref } from 'vue';
import {http} from '../http_service'

export const getInstitutes = (data) => {
    const institutes = ref([])
    const loadingInstitutes = ref(false)

    const loadInstitutes = async () => {
        loadingInstitutes.value = true
        await http().get('/user/setting/institutes', data).then(res => {
            institutes.value = res.data.data,
            loadingInstitutes.value = false
        }).catch(error => {
            console.log('error in getting institutes -->', error)
        });
    }

    return {
        institutes, 
        loadingInstitutes, 
        loadInstitutes
    }
} 

export const storeInstitute = async (data) => {
    const instituteRes = ref({})
    const instituteError = ref();
    const loadingInstitute = ref(false)

    loadingInstitute.value = true
    await http().post('/user/setting/institutes', data).then(res => {
        instituteRes.value = res.data
        loadingInstitute.value = false
    }).catch(error => {
        instituteError.value = error
        console.log(error);
    });
    
    return { instituteRes , instituteError, loadingInstitute}
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