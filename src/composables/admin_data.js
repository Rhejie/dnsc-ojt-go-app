import { ref } from 'vue';
import {http} from './http_service'

export const getRoles = () => {

    const loadingRoles = ref(false);
    const roles = ref([])
    const loadRoles = async () => {
        loadingRoles.value = true;
        await http().get('/user/setting/roles').then(res => {
            loadingRoles.value = false;
            roles.value = res.data
        }).catch(error => {
            console.log(error)
        });
    } 

    return {
        loadingRoles,
        loadRoles,
        roles
    }
}

export const getInstitutes = () => {
    const loadingInstitutes = ref(false);
    const institutes = ref([])

    const loadInstitutes = async () => {
        loadingInstitutes.value = true;
        await http().get('/user/setting/get-institutes').then(res => {
            institutes.value = res.data
            loadingInstitutes.value = false;
        })
    }

    return {
        loadingInstitutes,
        institutes,
        loadInstitutes
    }
}