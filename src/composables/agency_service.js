import { ElNotification } from 'element-plus'
import { ref } from 'vue'
import {http} from './http_service'

export const storeAgencyData = (agency) => {
    const response = ref()
    const errorAgency = ref()
    const loadingAgency = ref(false)
    
    const storeAgency = async () => {
        loadingAgency.value = true;
        await http().post('/user/agency/agencies', agency).then(res => {
            response.value = res.data
            loadingAgency.value = false
            ElNotification({
                title: 'Success',
                message: 'Successfully Added!',
                type: 'success',
              })
        }).catch(err => {
            errorAgency.value = err.response.data
        })
    }

    return {
        storeAgency,
        loadingAgency,
        response,
        errorAgency
    }
}

export const updateAgencyData = (agency, id) => {
    const responseUpdate = ref()
    const errorAgency = ref()
    const loadingAgency = ref(false)

    const updateAgency = async () => {
        loadingAgency.value = true
        await http().patch(`/user/agency/agencies/${id}`, agency).then(res => {
            responseUpdate.value = res.data
            loadingAgency.value = false
            ElNotification({
                title: 'Success',
                message: 'Successfully Updated!',
                type: 'success',
              })
        }).catch(err => {
            errorAgency.value = err.response.data
        })
    }

    return {
        responseUpdate,
        errorAgency,
        loadingAgency,
        updateAgency
    }
}

export const getAgencies = (params) => {
    const agencies = ref([])
    const errorAgencies = ref()
    const loadingAgencies = ref(false)
    const totalAgencies = ref(0)

    const loadAgencies = async () => {
        loadingAgencies.value = true;
        await http().get(`/user/agency/agencies?page=${params.current_page}&count=${params.current_size}&search=${params.search}`)
            .then(res => {
                agencies.value = res.data.data
                loadingAgencies.value = false
                totalAgencies.value = res.data.total
            }).catch(err => {
                errorAgencies.value = err.response.data
            })
    }

    return {
        agencies,
        loadingAgencies,
        loadAgencies,
        errorAgencies,
        totalAgencies
    }
}
