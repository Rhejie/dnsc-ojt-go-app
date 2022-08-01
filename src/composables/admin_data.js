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

export const getInstitutes = (query = '') => {
    const loadingInstitutes = ref(false);
    const institutes = ref([])

    const loadInstitutes = async () => {
        loadingInstitutes.value = true;
        await http().get(`/user/setting/get-institutes?search=${query}`).then(res => {
            institutes.value = res.data
            loadingInstitutes.value = false;
            console.log('load institutes')
        })
    }

    return {
        loadingInstitutes,
        institutes,
        loadInstitutes
    }
}

export const getCourses = (query = '') => {
    const loadingCourses = ref(false);
    const courses = ref([])

    const loadCourses = async () => {
        loadingCourses.value = true;
        await http().get(`/user/setting/get-courses?search=${query}`).then(res => {
            courses.value = res.data
            loadingCourses.value = false;
            console.log('load courses')
        })
    }

    return {
        loadingCourses,
        courses,
        loadCourses
    }
}

export const getAgencies = () => {
    const loadingAgencies = ref(true)
    const agencies = ref([])
    const loadAgenciesData = async () => {
        await http().get('/user/setting/get-agencies').then(res => {
            agencies.value = res.data
            loadingAgencies.value = false;
        })
    }

    return {
        loadingAgencies,
        agencies,
        loadAgenciesData
    }
}


export const getDepartments = (query = '') => {
    const loadingDepartments = ref(true)
    const departments = ref([])
    const loadDepartmentsData = async () => {
        await http().get(`/user/setting/get-departments?search=${query}`).then(res => {
            departments.value = res.data
            loadingDepartments.value = false;
        })
    }

    return {
        loadingDepartments,
        departments,
        loadDepartmentsData
    }
}