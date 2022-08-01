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
                            <router-link to="/school-year"
                                class="text-sm font-medium text-gray-500 hover:text-gray-700">
                                School Year
                            </router-link>

                        </div>
                    </li>
                </ol>
            </nav>
        </div>
        <div class="mt-2 md:flex md:items-center md:justify-between">
            <div class="flex-1 min-w-0">
                <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Manage School Year</h2>
            </div>
            <div class="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
                <button type="button" @click="handleClickNewSchoolYear" class="ml-3 inline-flex 
                        items-center 
                        px-4 py-2 
                        border border-transparent 
                        rounded-md shadow-sm 
                        text-sm font-medium 
                        text-white bg-blue-700 
                        hover:bg-blue-400 
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
            <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <!-- Replace with your content -->
                <div class="py-4">
                    <div class=" shadow-xl rounded-lg p-5 border">
                        <div class="w-2/5">
                            <input type="text" v-model="search" @keyup.enter="handleEnterSearch"
                                placeholder="Search Institute..." autocomplete="given-name"
                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <el-table :data="years" v-loading="loadingYears" size="large" style="width: 100%">
                            <el-table-column prop="year" label="Year" sortable />
                            <el-table-column label="Status" sortable>
                                <template #default="scope">
                                    <span class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800" v-if="scope.row.is_active == 1">Active</span>
                                    <span class="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800" v-else>In Active</span>
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
    <el-dialog v-model="centerDialogVisible" :title="`Add School Year`" width="30%" destroy-on-close center>
        <div class="py-6" v-loading="loading">
            <form @submit.prevent="handleClickSubmit">
                <label for="name" class="block text-sm font-medium text-gray-700">SY</label>
                <input type="text" v-model="form.year" name="name" id="name" autocomplete="given-name" placeholder="Institute Name..."
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                <fieldset class="mt-6">
                    <legend class="contents text-base font-medium text-gray-900">Status</legend><br/>
                    <el-radio-group v-model="form.is_active" size="large">
                        <el-radio-button :label="1" >Active</el-radio-button>
                        <el-radio-button :label="0" >In Active</el-radio-button>
                    </el-radio-group>

                </fieldset>
            </form>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="centerDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="handleClickSubmit">Save</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script>
import { setActiveNav } from "@/composables/setActiveNavigation";
import { defineComponent, onMounted, ref } from "vue";
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, PencilAltIcon, TrashIcon} from '@heroicons/vue/solid'
import { storeSchoolYear, getSchoolYears, getSchoolYearById , updateSchoolYear} from '@/composables/settings/school_year_service'
import GPagination from "@/components/GPagination.vue";

export default defineComponent({
    name: 'SchoolYearView',
    components: {
        ChevronLeftIcon,
        ChevronRightIcon,
        PlusIcon,
        PencilAltIcon,
        TrashIcon,
        GPagination
    },
    setup() {

        const centerDialogVisible = ref(false)

        const form = ref({
            year: '',
            is_active: 0
        })

        const loading = ref(false)
        const currentPage = ref(1);
        const currentPageSize = ref(10);
        const search = ref('')
        const total = ref(0);

        const params = ref({
            current_page: currentPage.value,
            current_size : currentPageSize.value,
            search: search.value
        })
        
        const {loadYears, loadingYears, totalYear, years} = getSchoolYears(params.value)

        const handleClickNewSchoolYear = () => {
            form.value = {
                year: '',
                is_active: 0
            }
            centerDialogVisible.value = true;
        }

        const handleClickSubmit = async () => {
            loading.value = true;
            if(form.value.id) {
                console.log('asd')
                const {updateYear, year, loadingYear} = updateSchoolYear(form.value, form.value.id);
                await updateYear();
                console.log(year.value)
                years.value.forEach(y => {
                    if(y.id == year.value.id) {
                        for(let key in year.value) {
                            y[key] = year.value[key];
                        }
                    }
                });

                loading.value = loadingYear.value
                if(!loading.value) {
                    centerDialogVisible.value = false;
                }
                return ;
            }
            const { storeYear, year, loadingYear} = storeSchoolYear(form.value);
            await storeYear();
            loading.value = loadingYear.value;
            console.log(loading.value,)
            if(!loading.value) {
                years.value.unshift(year.value)
                centerDialogVisible.value = false;
            }
        }

        const handleEnterSearch = () => {

        }

        const handleClickEdit = async (data) => {
            loading.value = true;
            const {loadingYear, getYear, year} = getSchoolYearById(data.id);
            await getYear();
            loading.value = loadingYear.value;
            form.value = year.value
            centerDialogVisible.value = true;
        }


        onMounted( async () => {

            await loadYears()
            total.value = totalYear.value

            setActiveNav('School Year')
        })

        return {
            handleClickNewSchoolYear,
            handleClickSubmit,
            handleEnterSearch,
            handleClickEdit,
            centerDialogVisible,
            form,
            loadingYears,
            years,
            currentPage,
            currentPageSize,
            total,
            search,
            loading
        }
    }
})
</script>
<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>