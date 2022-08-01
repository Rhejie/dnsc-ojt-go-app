import { ref } from 'vue';
import {http} from './http_service'

export const getUsers = (params) => {
    const users = ref([])
    const errorUsers= ref()
    const loadingUsers= ref(false)
    const totalUsers= ref(0)

    const load = async () => {
        loadingUsers.value = true
        await http()
          .get(
            `/user/profile/users?page=${params.current_page}
            &count=${params.current_size}
            &search=${params.search}
            &role_id=${params.role_id}
            &institute_id=${params.institute_id}`
          )
          .then((res) => {
            users.value = res.data.data;
            totalUsers.value = res.data.total;
            loadingUsers.value = false;
          })
          .catch((error) => {
            errorUsers.value = error.response.data;
          });
    }

    return {
        users,
        errorUsers,
        loadingUsers,
        totalUsers,
        load
    }
}

export const saveUser = (user) => {
    const response = ref()
    const loadingUser = ref(false)
    const errorUser = ref();

    const save = async () => {
        loadingUser.value = true
        await http().post('/user/profile/users', user).then(res => {
            response.value = res.data
            loadingUser.value = false
        }).catch(error => {
            errorUser.value = error.response.data
        })
    }

    return {
        response,
        loadingUser,
        errorUser,
        save
    }
}

export const updateUser = (user, id) => {
    const response = ref()
    const loadingUser = ref(false)
    const errorUser = ref();

    const update = async () => {
        loadingUser.value = true
        await http().put(`/user/profile/users/${id}`, user).then(res => {
            response.value = res.data
        }).catch(error => {
            errorUser.value = error.response.data
        })
    }

    return {
        update,
        response,
        errorUser,
        loadingUser
    }
}