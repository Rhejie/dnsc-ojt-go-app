import { ElNotification } from "element-plus";
import { ref } from "vue";
import { http } from "../http_service";


export const getSchoolYears = (params) => {
    const years = ref([]);
    const errorYears = ref();
    const loadingYears = ref(false);
    const totalYear = ref(0)

    const loadYears = async  () => {
        loadingYears.value = true;
        await http().get(`/user/setting/school-year?page=${params.current_page}&count=${params.current_size}&search=${params.search}`)
            .then( res => {
                years.value = res.data.data
                totalYear.value = res.data.total
                loadingYears.value = false;
            }).catch(error => {
                errorYears.value = error.response.data
                console.log('error in getting years -->', error)
            })
    }

    return {
        years,
        errorYears,
        loadingYears,
        loadYears,
        totalYear
    }
}

export const storeSchoolYear = (data) => {
    const year = ref({
        year: '',
        is_active: false
    })
    const loadingYear = ref(false)
    const errorYear = ref();

    const  storeYear = async () => {
        loadingYear.value = true;
        await http().post('/user/setting/school-year', data).then(res => {
            year.value = res.data
            loadingYear.value = false;
            ElNotification({
                title: 'Success',
                message: 'Successfully Added!',
                type: 'success',
              })
        }).catch(error => {
            loadingYear.value = false;
            errorYear.value = error.response.data
            console.log('error in storing year -->', error)
        })
    }

    return {
        storeYear,
        loadingYear,
        errorYear,
        year
    }

}

export const getSchoolYearById = (id) => {
    const year = ref({
        id: '',
        year: '',
        is_active: false
    })
    const loadingYear = ref(false)
    const errorYear = ref();

    const getYear = async () => {
        loadingYear.value = true;
        await http().get(`/user/setting/school-year/${id}`).then(res => {
            year.value = res.data
            loadingYear.value = false;
        }).catch(error => {
            errorYear.value = error.response.data
            console.log('error in getting year -->', error)
        })
    }

    return {
        year,
        loadingYear,
        errorYear,
        getYear
    }
}

export const updateSchoolYear = (data, id) => {
    const year = ref({
        id: '',
        year: '',
        is_active: false
    });
    const loadingYear = ref(false)
    const errorYear = ref();

    const updateYear = async () => {
        loadingYear.value = true;
        await http().put(`/user/setting/school-year/${id}`, data).then( res => {
            year.value = res.data
            loadingYear.value = false;
            ElNotification({
                title: 'Success',
                message: 'Successfully Update!',
                type: 'success',
              })

              console.log('year', year.value)
        }).catch(error => {
            errorYear.value = error.response.data,
            loadingYear.value = false;
            console.log('error in updating year -->', error)
        })
    }

    return {
        year,
        loadingYear,
        errorYear,
        updateYear
    }
}

export const deleteSchoolYear = (id) => {
    return http().delete(`/user/setting/school-year/${id}`)
}