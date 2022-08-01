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
                <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Manage Requirements</h2>
            </div>
            <div class="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
                <el-button type="primary" @click="handleCreate">Add Requirements</el-button>
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
                        <el-table :data="requirements" v-loading="loadingRequirements" size="large" style="width: 100%">
                            <el-table-column prop="name" label="Name" sortable />
                            <el-table-column prop="description" label="Description" sortable/>
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
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { ChevronLeftIcon, ChevronRightIcon, PencilAltIcon, TrashIcon} from '@heroicons/vue/solid'
import { getRequirements } from "@/composables/courses/requirement_service";
import GPagination from "@/components/GPagination.vue";

export default defineComponent({
    name: 'RequirementView',
    components: {
        ChevronLeftIcon,
        ChevronRightIcon,
        PencilAltIcon,
        TrashIcon,
        GPagination
    },
    setup() {

        const router = useRouter();
        const currentPage = ref(1);
        const currentPageSize = ref(10);
        const search = ref('')
        const total = ref(0);

        
        const params = ref({
            current_page: currentPage.value,
            current_size : currentPageSize.value,
            search: search.value
        })

        const {loadRequirements, requirements, loadingRequirements} = getRequirements(params.value);

        const handleCreate = () => {
            router.push({name: 'Create Requirement Form'})
        }

        const handleEnterSearch = () => {

        }

        const handleClickEdit = (requirement) => {
            router.push({name: 'Update Requirement Form', params: {id: requirement.id}})
        }

        onMounted( async () => {
            await loadRequirements();
            setActiveNav('Requiremnets')
        })

        return {
            handleCreate,
            requirements,
            loadingRequirements,
            currentPage,
            currentPageSize,
            total,
            search,
            handleEnterSearch,
            handleClickEdit
        }
    }
})
</script>