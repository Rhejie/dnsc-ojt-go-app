import { ElNotification } from 'element-plus'
import { ref } from 'vue'
import {http} from './http_service'

export const storeDepartmentData = (department) => {
    const response = ref()
    const errorDepartment = ref()
    const loadingDepartment = ref(false)
    
    const storeDepartment = async () => {
        loadingDepartment.value = true;
        await http().post('/user/agency/departments', department).then(res => {
            response.value = res.data
            loadingDepartment.value = false
            ElNotification({
                title: 'Success',
                message: 'Successfully Added!',
                type: 'success',
              })
        }).catch(err => {
            errorDepartment.value = err.response.data
        })
    }

    return {
        storeDepartment,
        loadingDepartment,
        response,
        errorDepartment
    }
}

export const updateDepartmentData = (department, id) => {
    const responseUpdate = ref()
    const errorDepartment = ref()
    const loadingDepartment = ref(false)
    const hasError = ref(false)

    const updateDepartment = async () => {
        loadingDepartment.value = true
        await http().patch(`/user/agency/departments/${id}`, department).then(res => {
            responseUpdate.value = res.data
            loadingDepartment.value = false
            ElNotification({
                title: 'Success',
                message: 'Successfully Updated!',
                type: 'success',
              })
        }).catch(err => {
            errorDepartment.value = err.response.data
            hasError.value = true
        })
    }

    return {
        responseUpdate,
        errorDepartment,
        loadingDepartment,
        updateDepartment,
        hasError
    }
}

export const getDeparments = (params) => {
    const departments = ref([])
    const errorDepartments = ref()
    const loadingDepartments = ref(false)
    const totalDepartments = ref(0)

    const loadDepartments = async () => {
        loadingDepartments.value = true;
        await http().get(`/user/agency/departments?page=${params.current_page}&count=${params.current_size}&search=${params.search}`)
            .then(res => {
                departments.value = res.data.data
                loadingDepartments.value = false
                totalDepartments.value = res.data.total
            }).catch(err => {
                errorDepartments.value = err.response.data
            })
    }

    return {
        departments,
        loadingDepartments,
        loadDepartments,
        errorDepartments,
        totalDepartments
    }
}

export const getdepartmentById = (id) => {
    const response = ref()
    const errorDepartment = ref()
    const loadingDepartment = ref(false)

    const loadDepartment = async () => {
        loadingDepartment.value = true
        await http().get(`/user/agency/departments/${id}`).then(res => {
            response.value = res.data
            loadingDepartment.value = false
        })
    }

    return {
        loadDepartment,
        response,
        errorDepartment,
        loadingDepartment
    }
}
