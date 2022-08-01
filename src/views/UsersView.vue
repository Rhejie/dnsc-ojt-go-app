<template>
    <div class="px-5 pt-2 bg-green-100 pb-5 shadow-md">
        <div>
            <nav class="sm:hidden" aria-label="Back">
                <a href="#" @click="handleClickBack"
                    class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
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
                </ol>
            </nav>
        </div>
        <div class="mt-2 md:flex md:items-center md:justify-between">
            <div class="flex-1 min-w-0">
                <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Manage Users</h2>
            </div>
            <div class="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
                <!-- <button type="button"
                    @click="handleClickNewUser"
                    class="ml-3 inline-flex 
                        items-center 
                        px-4 py-2 
                        border border-transparent 
                        rounded-md shadow-sm 
                        text-sm font-medium 
                        text-white bg-indigo-600 
                        hover:bg-indigo-700 
                        focus:outline-none 
                        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <PlusIcon class="flex-shrink-0 h-5 w-5 text-white" aria-hidden="true" />
                            New
                </button> -->

                <el-dropdown split-button @click="handleClickNewUser('new')" type="primary">
                    Create
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item v-if="user.role_id == 1" @click="handleClickNewUser('institute')">New Institute Administrator
                            </el-dropdown-item>
                            <el-dropdown-item v-if="user.role_id == 1 || user.role_id == 2" @click="handleClickNewUser('course')">New Course Administrator
                            </el-dropdown-item>
                            <el-dropdown-item @click="handleClickNewUser('supervisor')">New Supervisor
                            </el-dropdown-item>
                            <el-dropdown-item @click="handleClickNewUser('student')">New Students</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
    <main>
        <div class="py-6">
            <div class="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
                <!-- Replace with your content -->
                <div class="py-4">

                    <el-card shadow="always">

                        <el-row>
                            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <el-row>
                                    <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                                        <role-select/>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6" v-if="params.role_id == 2 || params.role_id == 3">
                                        <institute-select/>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-table :data="users" v-loading="loadingUsers" style="width: 100%">
                            <el-table-column prop="firstname" label="First Name" />
                            <el-table-column prop="middlename" label="Middle Name" />
                            <el-table-column prop="lastname" label="Last Name" />
                            <el-table-column prop="suffix" label="Suffix" />
                            <el-table-column prop="gender" label="Gender" />
                            <el-table-column prop="phone_number" label="Phone" />
                            <el-table-column prop="role.name" label="Role" />
                            <el-table-column prop="institute.name" label="Institute" />
                            <el-table-column prop="course.name" label="Course" />
                            <el-table-column prop="department.name" label="Department" />
                        </el-table>
                    </el-card>

                </div>
                <!-- /End replace -->
            </div>
        </div>
    </main>
</template>
<script>
import { defineComponent, onMounted, reactive, ref} from "vue";
import { setActiveNav } from '@/composables/setActiveNavigation'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid'
import { useRouter } from "vue-router";
import RoleSelect from "@/components/categories/RoleSelect.vue"
import InstituteSelect from "@/components/categories/InstituteSelect.vue"
import { getUsers } from "@/composables/user_service";
import { useEmitter } from "@/composables/useEmitter";
import { useStore } from "vuex";

export default defineComponent({
    name: 'UserView',
    components: {
        ChevronLeftIcon,
        ChevronRightIcon,
        RoleSelect,
        InstituteSelect
    },
    setup() {
        const router = useRouter()
        const store = useStore();
        const user = reactive(store.state.userProfile);
        const emitter  = useEmitter;
        const currentPage = ref(1);
        const currentPageSize = ref(10);
        const total = ref(0);
        const search = ref('')
        const params = ref({
            current_size: currentPageSize.value,
            current_page: currentPage.value,
            search: search.value,
            role_id: 'all',
            institute_id: 'all',
        })

        
        const {load, users, loadingUsers} = getUsers(params.value)
        
        const getUsersData = async () => {
            await load()
        }
        onMounted(() => {
            setActiveNav('Users')
            getUsersData()

            emitter.on('SELECTED_ROLE', role => {
                params.value.role_id = role
                getUsersData()
            })

            emitter.on('SELECTED_INSTITUTE',institute => {
                params.value.institute_id = institute
                getUsersData()
            })
        });
        

        const handleClickNewUser = (type) => {
            router.push({ name: 'Create User', params: { formType: type } })
        }
        const handleClickBack = () => {
            router.go(-1)
        }
        return {
            users,
            loadingUsers,
            params,
            handleClickNewUser,
            handleClickBack,
            currentPage,
            currentPageSize,
            total,
            user
        }
    }
})
</script>