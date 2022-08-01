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
                            <router-link to="/courses" class="text-sm font-medium text-gray-500 hover:text-gray-700">
                                Courses
                            </router-link>

                        </div>
                    </li>
                </ol>
            </nav>
        </div>
        <div class="mt-2 md:flex md:items-center md:justify-between">
            <div class="flex-1 min-w-0">
                <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Manage Courses</h2>
            </div>
            <div class="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
                <button type="button" @click="handleClickNewCourse" class="ml-3 inline-flex 
                        items-center 
                        px-4 py-2 
                        border border-transparent 
                        rounded-md shadow-sm 
                        text-sm font-medium 
                        text-white bg-emerald-400 
                        hover:bg-emerald-700 
                        focus:outline-none 
                        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <PlusIcon class="flex-shrink-0 h-5 w-5 text-white" aria-hidden="true" />
                    New
                </button>
            </div>
        </div>
    </div>
    <main>
        <div class="py-6">
            <div class="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
                <!-- Replace with your content -->
                <div class="py-4">
                    <div class="shadow-xl rounded-lg p-5 border">
                        <div class="w-2/5">
                            <input type="text" v-model="search" @keyup.enter="handleEnterSearch"
                                placeholder="Search Courses..." autocomplete="given-name"
                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <el-table v-loading="loadingCourse" :data="courses" size="large" style="width: 100%">
                            <el-table-column prop="name" label="Name" sortable/>
                            <el-table-column prop="abbreviation" label="Abbreviation" sortable width="150"/>
                            <el-table-column label="Institute" sortable >
                                <template #default="scope">
                                    <div>
                                        {{institute(scope.row)}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="Majors" sortable >
                                <template #default="scope">
                                    <div>
                                        <el-tag class="ml-2" type="info" v-for="major in scope.row.majors" :key="major.id">{{major.name}}</el-tag>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right" label="Actions" width="120">
                                <template #default="scope">
                                    <el-button link type="primary" @click="handleClickEdit(scope.row)" size="small">
                                        <PencilAltIcon class="flex-shrink-0 h-5 w-5 text-emerald-800" />
                                    </el-button>
                                    <el-button link type="primary" size="small"
                                        @click="handleClickDelete(scope.row.id, scope.$index)">
                                        <TrashIcon class="flex-shrink-0 h-5 w-5 text-red-400" />
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <g-pagination :page_size="currentPageSize" :current_size="total" :current_page="currentPage" />
                    </div>
                </div>
                <!-- /End replace -->
            </div>
        </div>
    </main>
</template>
<script>
import { setActiveNav } from "@/composables/setActiveNavigation";
import { getCourses } from "@/composables/settings/courses_service";
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, PencilAltIcon, TrashIcon } from '@heroicons/vue/solid'
import { defineComponent, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import GPagination from "@/components/GPagination.vue";
import { useEmitter } from "@/composables/useEmitter";

export default defineComponent({
    name: 'CoursesView',
    components: {
        ChevronLeftIcon,
        ChevronRightIcon,
        PlusIcon,
        GPagination,
        PencilAltIcon,
        TrashIcon
    },
    setup() {
        const router = useRouter();
        const emitter = useEmitter;
        const search = ref("")
        const currentPage = ref(1);
        const courses = ref([])
        const currentPageSize = ref(10);
        const loadingCourse = ref(false)
        const total = ref(0)

        const handleClickNewCourse = () => {
            router.push({ name: 'Create Course' })
        }
        const handleClickBack = () => {
            router.go(-1)
        }

        const getCoursesData = async () => {
            let params = {
                current_size: currentPageSize.value,
                current_page: currentPage.value,
                search: search.value,
            }
            loadingCourse.value = true
            await getCourses(params).then(res => {
                loadingCourse.value = false
                courses.value = res.data.data
                total.value = res.data.total
            }).catch(error => {
                console.log('Error ing getting courses --> ', error)
            })
        }

        const institute = (scope) => {
            if(scope.institute && scope.institute.abbreviation) {
                return `${scope.institute.name} - ${scope.institute.abbreviation}`
            }
            else if (scope.institute) {
                return scope.institute.name
            }

            else {
                return ''
            }
            
        }

        const handleClickEdit = (course) => {
            router.push({name: 'Update Course', params: {id: course.id }})
        } 

        const handleClickDelete = (id, index) => {
            console.log(id, index)
        }

        const handleEnterSearch = async () => {
            await getCoursesData()
        }

        onMounted(async () => {
            await getCoursesData()
            setActiveNav('Courses')
            emitter.on('CHANGE_SIZE', data => {
                currentPageSize.value = data
                getCoursesData()
            })

            emitter.on('CHANGE_PAGE', data => {
                currentPage.value = data
                getCoursesData()
            })
        });

        watch(search, () => {
            if (search.value == "") {
                getCoursesData();
            }
        })

        return {
            handleClickNewCourse,
            handleClickBack,
            courses,
            loadingCourse,
            search,
            institute,
            handleClickEdit,
            handleClickDelete,
            handleEnterSearch,
            //for pagination below
            total,
            currentPage,
            currentPageSize,
        }
    }
})
</script>