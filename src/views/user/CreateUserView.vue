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
                <div class="py-4">
                    <div class=" shadow-xl rounded-lg h-96">
                        <form action="#" method="POST">
                            <div class="shadow sm:rounded-md sm:overflow-hidden">
                                <div class="bg-white py-6 px-4 space-y-6 sm:p-6">
                                    <div>
                                        <h3 class="text-lg leading-6 font-medium text-gray-900">Personal Information
                                        </h3>
                                        <p class="mt-1 text-sm text-gray-500">Use a permanent address where you can
                                            recieve mail.</p>
                                    </div>

                                    <div class="grid grid-cols-6 gap-6">
                                        <div class="col-span-6">
                                            <label for="Role"
                                                class="block text-sm font-medium text-gray-700">Role</label>
                                            <select id="role" :disabled="formType != 'new' ? true : false" @change="changeRole"
                                                v-model="user.role_id" name="role" autocomplete="role-name"
                                                class="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <option v-for="role in roles" :key="role.id" :value="role.id">
                                                    {{ role.name }}</option>
                                            </select>
                                        </div>
                                        <div class="col-span-6 sm:col-span-2">
                                            <label for="first-name"
                                                class="block text-sm font-medium text-gray-700">First name</label>
                                            <input type="text" name="first-name" v-model = "user.firstname" id="first-name"
                                                autocomplete="given-name"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>

                                        <div class="col-span-6 sm:col-span-2">
                                            <label for="last-name"
                                                class="block text-sm font-medium text-gray-700">Middle
                                                name</label>
                                            <input type="text" name="last-name" v-model = "user.middlename" id="last-name"
                                                autocomplete="family-name"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>
                                        <div class="col-span-6 sm:col-span-2">
                                            <label for="last-name" class="block text-sm font-medium text-gray-700">Last
                                                name</label>
                                            <input type="text" v-model = "user.lastname" name="last-name" id="last-name"
                                                autocomplete="family-name"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>
                                        <div class="col-span-1 sm:col-span-1">
                                            <label for="last-name" class="block text-sm font-medium text-gray-700">Suffix</label>
                                            <input type="text" name="last-name" v-model = "user.suffix" id="last-name"
                                                autocomplete="family-name"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>

                                        <div class="col-span-2 sm:col-span-2">
                                            <label for="gender"
                                                class="block text-sm font-medium text-gray-700">Gender</label>
                                            <select id="gender" v-model="user.gender" name="gender" autocomplete="gender-name" class="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <option value="female">Female</option>
                                                <option value="male">Male</option>
                                            </select>
                                        </div>
                                        <div class="col-span-2 sm:col-span-2">
                                            <label for="phone_number" class="block text-sm font-medium text-gray-700">Phone Number</label>
                                            <input type="text" v-model="user.phone_number" name="phone_number" id="phone_number"
                                                autocomplete="phone_number"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>
                                        <div class="col-span-6 sm:col-span-6">
                                            <label for="last-name" class="block text-sm font-medium text-gray-700">Address</label>
                                            <textarea type="textarea" v-model = "user.address" name="last-name" id="last-name"
                                                autocomplete="family-name"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>

                                        <div class="col-span-2 sm:col-span-2">
                                            <label for="email-address"
                                                class="block text-sm font-medium text-gray-700">Email address</label>
                                            <input type="text" v-model = "user.email" name="email-address" id="email-address"
                                                autocomplete="email"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>
                                        <div class="col-span-2 sm:col-span-2">
                                            <label for="password"
                                                class="block text-sm font-medium text-gray-700">Password</label>
                                            <input type="password" v-model = "user.password" name="password" id="password"
                                                autocomplete="password"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>

                                        <div class="col-span-6 sm:col-span-3" v-if="user.role_id == 2">
                                            <label for="institute"
                                                class="block text-sm font-medium text-gray-700">Institute</label>
                                            <select id="institute" v-model="user.institute_id" v-loading="loadingIns" name="institute"
                                                autocomplete="institute-name"
                                                class="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <option v-for="institute in institutesData" :key="institute.id" :value="institute.id">
                                                    {{ institute.name }} - {{ institute.abbreviation }}</option>
                                            </select>
                                        </div>
                                        <div class="col-span-6 sm:col-span-3" v-if="user.role_id == 3 || user.role_id == 5">
                                            <label for="course"
                                                class="block text-sm font-medium text-gray-700">Course</label>
                                            <select id="course" v-model="user.institute_id" v-loading="loadingIns" name="course"
                                                autocomplete="course-name"
                                                class="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <option v-for="course in coursesData" :key="course.id" :value="course.id">
                                                    {{ course.name }} - {{ course.abbreviation }}</option>
                                            </select>
                                        </div>
                                        <div class="col-span-2 sm:col-span-2" v-if="user.role_id == 5">
                                            <label for="password"
                                                class="block text-sm font-medium text-gray-700">Student ID</label>
                                            <input type="text" name="password" id="password"
                                                autocomplete="password"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>
                                    </div>
                                </div>
                                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button type="button" @click="handleClickCancel"
                                        class="bg-indigo-600 mr-2 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</button>
                                    <button type="submit"
                                        class="bg-emerald-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- /End replace -->
            </div>
        </div>
    </main>
</template>
<script>
import { getInstitutes, getRoles, getCourses } from "@/composables/admin_data";
import { setActiveNav } from "@/composables/setActiveNavigation";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid'
import {  defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

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

        const user = ref({
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

        const { loadingRoles, loadRoles, roles } = getRoles();

        loadRoles();

        const loadingIns = ref(false);

        const institutesData = ref([])

        const coursesData = ref([])
        

        const handleClickCancel = () => {
            router.go(-1)
        }

        const changeRole = async (event) => {
            let role = event.target.value; 
            if(role == 2) {
                const { loadInstitutes, institutes } = getInstitutes()
                await loadInstitutes()
                institutesData.value = institutes.value
            }
            else if (role == 3 || role == 5) {
                const {loadCourses, courses} = getCourses()
                await loadCourses()
                coursesData.value = courses.value
            }
        }
        

        onMounted(async () => {
            setActiveNav('Users')
            if (props.formType && typeof props.formType != undefined) {
                if (props.formType == 'institute') {
                    user.value.role_id = 2
                }

            }

        });

        return {
            roles,
            loadingRoles,
            handleClickCancel,
            user,
            loadingIns,
            institutesData,
            changeRole,
            coursesData
        }
    }
});

</script>