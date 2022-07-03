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