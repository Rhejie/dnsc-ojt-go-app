<template>
    <div class="px-5 bg-green-100  pb-5  shadow-md pt-2">
        <div>
            <nav class="sm:hidden" aria-label="Back">
                <a href="#" class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
                    <ChevronLeftIcon class="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    Back
                </a>
            </nav>
            <nav class="hidden sm:flex" aria-label="Breadcrumb">
                <ol role="list" class="flex items-center space-x-4">
                    <li>
                        <div class="flex">
                            <router-link to="/" class="text-sm font-medium text-gray-500 hover:text-gray-700">Dashboard
                            </router-link>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center">
                            <ChevronRightIcon class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <router-link to="/users" class="text-sm font-medium text-gray-500 hover:text-gray-700">Users
                            </router-link>

                        </div>
                    </li>
                    <li>
                        <div class="flex items-center">
                            <ChevronRightIcon class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <router-link :to="{ name: 'Create User' }"
                                class="text-sm font-medium text-gray-500 hover:text-gray-700">Create
                            </router-link>

                        </div>
                    </li>
                </ol>
            </nav>
        </div>
        <div class="mt-2 md:flex md:items-center md:justify-between">
            <div class="flex-1 min-w-0">
                <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Create User</h2>
            </div>
            <div class="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
            </div>
        </div>
    </div>
    <main>
        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <!-- Replace with your content -->
                <div class="">
                    <el-card shadow="always">
                        <div class="pb-4">
                            <h3 class="text-lg leading-6 font-medium text-gray-900">User Information</h3>
                        </div>
                        <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="120px"
                            class="demo-ruleForm" :size="formSize" status-icon>
                            <el-row>
                                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                    <el-row>
                                        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                                            <el-form-item label="Role" prop="role_id">
                                                <el-select v-model="form.role_id" :disabled="formType != 'new'"
                                                    placeholder="Role">
                                                    <el-option v-for="role in roles" :key="role.id" :label="role.name"
                                                        :value="role.id" />
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <!-- <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10"
                                            v-if="form.role_id == 3 || form.role_id == 5">
                                            <el-form-item label="Course" prop="course_id">
                                                <el-select-v2 size="large" v-model="form.course_id" style="width: 100%"
                                                    filterable remote :remote-method="searchCourse" clearable
                                                    :options="coursesData" :loading="loadingCourse"
                                                    placeholder="Please course" />
                                            </el-form-item>
                                        </el-col> -->
                                        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" v-if="form.role_id == 5">
                                            <el-form-item label="Student ID" prop="student_id">
                                                <el-input v-model="form.student_id" size="large" />
                                            </el-form-item>
                                        </el-col>
                                        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" v-if="form.role_id == 2">
                                            <el-form-item label="Institute" prop="institute_id">
                                                <el-select-v2 size="large" v-model="form.institute_id"
                                                    style="width: 400px" filterable remote
                                                    :remote-method="searchInstitute" clearable :options="institutesData"
                                                    :loading="loading" placeholder="Please course" />
                                            </el-form-item>
                                        </el-col>
                                        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" v-if="form.role_id == 4">
                                            <el-form-item label="Department" prop="agency_department_id">
                                                <el-select-v2 size="large" v-model="form.agency_deparment_id"
                                                    style="width: 400px" filterable remote
                                                    :remote-method="searchDepartment" clearable
                                                    :options="departmentsData" :loading="loadingDepartments"
                                                    placeholder="Please course" />
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                                    <el-form-item label="First Name" prop="firstname">
                                        <el-input v-model="form.firstname" size="large" />
                                    </el-form-item>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                                    <el-form-item label="Middle Name" prop="middlename">
                                        <el-input v-model="form.middlename" size="large" />
                                    </el-form-item>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                                    <el-form-item label="Last Name" prop="lastname">
                                        <el-input v-model="form.lastname" size="large" />
                                    </el-form-item>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="8" :lg="4" :xl="4">
                                    <el-form-item label="Suffix" prop="suffix">
                                        <el-input v-model="form.suffix" size="large" />
                                    </el-form-item>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                                    <el-form-item label="Gender" prop="gender">
                                        <el-select v-model="form.gender" placeholder="Gender">
                                            <el-option label="Female" value="female" />
                                            <el-option label="Male" value="male" />
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                                    <el-form-item label="Phone Number" prop="phone_number">
                                        <el-input v-model="form.phone_number" size="large" />
                                    </el-form-item>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                    <el-form-item label="Address" prop="address">
                                        <el-input v-model="form.address" type="textarea" size="large" />
                                    </el-form-item>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                    <el-form-item label="Email" prop="email">
                                        <el-input v-model="form.email" size="large" />
                                    </el-form-item>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                                    <el-form-item label="Password" prop="password">
                                        <el-input v-model="form.password" type="password" size="large" />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm(ruleFormRef)">Create</el-button>
                                <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </div>
                <!-- /End replace -->
            </div>
        </div>
    </main>
</template>
<script>
import { getInstitutes, getRoles, getCourses, getDepartments } from "@/composables/admin_data";
import { setActiveNav } from "@/composables/setActiveNavigation";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid'
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import {saveUser} from "@/composables/user_service"

export default defineComponent({
    name: 'CreateUserView',
    props: {
        id: null,
        formType: {
            type: String,
            default: null
        }
    },
    components: {
        ChevronLeftIcon,
        ChevronRightIcon
    },
    setup(props) {

        const router = useRouter()

        const formSize = ref('large')
        const ruleFormRef = ref()
        const form = ref({
            firstname: '',
            lastname: '',
            middlename: '',
            suffix: '',
            gender: '',
            role_id: '',
            phone_number: '',
            address: '',
            email: '',
            password: '',
            student_id: '',
            username: '',
            course_id: '',
            institute_id: '',
            agency_department_id: '',
        })

        const rules = reactive({
            firstname: [
                { required: true, message: 'Please input first name', trigger: 'blur' },
            ],
            lastname: [
                { required: true, message: 'Please input last name', trigger: 'blur' },
            ],
            middlename: [
                { required: true, message: 'Please input middle name', trigger: 'blur' },
            ],
            role_id: [
                { required: true, message: 'Please select role', trigger: 'blur' },
            ],
            gender: [
                { required: true, message: 'Please select gender', trigger: 'blur' },
            ],
            phone_number: [
                { required: true, message: 'Please input phone number', trigger: 'blur' },
            ],
            address: [
                { required: true, message: 'Please input address', trigger: 'blur' },
            ],
            email: [
                {
                    required: true, message: 'Please input email', trigger: 'blur'
                },
                {
                    type: 'email',
                    message: 'Please input correct email address',
                    trigger: ['blur', 'change'],
                },
            ],
            password: [ 
                {required: true, message: 'Please input password', trigger: 'blur'},
                { min: 6, max: 10, message: 'Length should be 6 to 10', trigger: 'blur' },
            ],
            
            student_id: [ 
                {required: true, message: 'Please input student id', trigger: 'blur'},
            ],
            institute_id: [ 
                {required: true, message: 'Please select institute', trigger: 'blur'},
            ],
            course_id: [ 
                {required: true, message: 'Please select course', trigger: 'blur'},
            ],
            agency_department_id: [
                {required: true, message: 'Please select department', trigger: 'blur'},
            ]
        })

        const { loadingRoles, loadRoles, roles } = getRoles();

        loadRoles();

        const loadingIns = ref(false);

        const institutesData = ref([])

        const coursesData = ref([])

        const departmentsData = ref([])

        const loading = ref(false);


        const handleClickCancel = () => {
            router.go(-1)
        }

        const changeRole = async (event) => {
            let role = event.target.value;
            console.log(role)
        }

        const submitForm = async (formEl) => {
            if (!formEl) return
            await formEl.validate((valid, fields) => {
                if (valid) {
                    handleSave()
                } else {
                    console.log('error submit!', fields)
                }
            })
        }

        const handleSave = async () => {
            loading.value = true
            const {save, response, errorUser, loadingUser} = saveUser(form.value);
            await save()
            if(errorUser.value) {
                return
            }
            loading.value = loadingUser.value
            form.value = response.value
            router.push('/users')
        }

        const resetForm = (formEl) => {
            if (!formEl) return
            formEl.resetFields()
        }


        const loadingCourse = ref(true)
        const loadingInstitute = ref(true)
        const loadingDepartments = ref(true)

        const searchInstitute = async (query) => {
            if (query !== '') {
                loadingInstitute.value = true
                const { loadInstitutes, institutes } = getInstitutes(query)
                await loadInstitutes()
                institutesData.value = institutes.value.map(institute => {
                    institute.label = institute.name;
                    institute.value = institute.id
                    return institute
                })
                loadingInstitute.value = false
            } else {
                institutesData.value = []
            }
        }

        const searchDepartment = async (query) => {
            if (query !== '') {
                loadingDepartments.value = true
                const { loadDepartmentsData, departments } = getDepartments(query)
                await loadDepartmentsData()
                departmentsData.value = departments.value.map(department => {
                    department.label = department.name + ` - ( ${department.agency.name})`;
                    department.value = department.id
                    return department
                })
                loadingDepartments.value = false
            } else {
                departmentsData.value = []
            }
        }

        const searchCourse = async (query) => {
            if (query !== '') {
                loadingCourse.value = true
                const { loadCourses, courses } = getCourses(query)
                await loadCourses()
                coursesData.value = courses.value.map(course => {
                    course.label = course.name + ` - ( ${course.institute.abbreviation} )`;
                    course.value = course.id
                    return course
                })
                loadingCourse.value = false
            } else {
                coursesData.value = []
            }
        }


        onMounted(async () => {
            setActiveNav('Users')
            if (props.formType && typeof props.formType != undefined) {
                if (props.formType == 'institute') {
                    form.value.role_id = 2
                }
                if (props.formType == 'course') {
                    form.value.role_id = 3
                }
                if (props.formType == 'student') {
                    form.value.role_id = 5
                }
                if (props.formType == 'supervisor') {
                    form.value.role_id = 4
                }
            }

        });

        return {
            roles,
            loadingRoles,
            handleClickCancel,
            loadingIns,
            institutesData,
            changeRole,
            coursesData,
            formSize,
            ruleFormRef,
            form,
            rules,
            submitForm,
            resetForm,
            searchCourse,
            loadingCourse,
            searchInstitute,
            searchDepartment,
            loadingDepartments,
            departmentsData
        }
    }
});

</script>