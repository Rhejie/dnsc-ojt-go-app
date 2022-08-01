import { ElNotification } from "element-plus";
import { ref } from "vue"
import { http } from "../http_service";


export const getRequirements = (params) => {
    const requirements = ref([]);

    const errorRequirements = ref();

    const totalRequirements = ref(0)

    const loadingRequirements = ref(false)

    const loadRequirements = async () => {
        loadingRequirements.value = true;
        await http().get(`/user/requirements?page=${params.current_page}&count=${params.current_size}&search=${params.search}`)
            .then(res => {
                requirements.value = res.data.data
                totalRequirements.value = res.data.total
                loadingRequirements.value = false
            }).catch( error => {
                errorRequirements.value = error.response.data
                console.log('error in getting requirements -->', error)
                loadingRequirements.value = false
            })
    }

    return  {
        loadRequirements,
        errorRequirements,
        requirements,
        loadingRequirements
    }
}

export const storeRequirement = (form) => {
    const requirement = ref();
    const errorRequirement = ref();
    const loadingRequirement = ref(false);

    const store = async () => {
        loadingRequirement.value = true;
        await http().post('/user/requirements', form).then(res => {
            requirement.value = res.data;
            loadingRequirement.value = false;
            ElNotification({
                title: 'Success',
                message: 'Successfully Save!',
                type: 'success',
              })
        }).catch( error => {
            errorRequirement.value = error.response.data;
            loadingRequirement.value = false;
            console.log('Error in storing requirement--->', error)
        })
    }

    return {
        store,
        requirement,
        loadingRequirement,
        errorRequirement
    }
}

export const updateRequirement = (form, id) => {
    const requirement = ref();
    const errorRequirement = ref();
    const loadingRequirement = ref(false);

    const update = async () => {
        loadingRequirement.value = true
        await http().put(`/user/requirements/${id}`, form).then(res => {
            requirement.value = res.data;
            loadingRequirement.value = false;
            ElNotification({
                title: 'Success',
                message: 'Successfully Update!',
                type: 'success',
              })
        }).catch(error => {
            errorRequirement.value = error.response.data;
            loadingRequirement.value = false;
            console.log('Error in updating requirement--->', error)
        })
    }

    return {
        update,
        errorRequirement,
        loadingRequirement,
        requirement
    }
}

export const getRequirementById = (id) => {
    const requirement = ref({});
    const errorRequirement = ref();
    const loadingRequirement = ref(false);

    const load = async () => {
        loadingRequirement.value = true
        await http().get(`/user/requirements/${id}`).then(res => {
            requirement.value = res.data
            loadingRequirement.value = false
        }).catch(error => {
            loadingRequirement.value = false
            errorRequirement.value = error.response.data;
            console.log('Error in getting requirement--->', error)
        })
    }

    return {
        requirement,
        errorRequirement,
        loadingRequirement,
        load
    }
}