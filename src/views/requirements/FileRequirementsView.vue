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
                            <router-link to="/file-requirements"
                                class="text-sm font-medium text-gray-500 hover:text-gray-700">File Requirements
                            </router-link>
                        </div>
                    </li>
                </ol>
            </nav>
        </div>
        <div class="mt-2 md:flex md:items-center md:justify-between">
            <div class="flex-1 min-w-0">
                <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Manage File Requirements
                </h2>
            </div>
        </div>
    </div>
    <main>
        <div class="py-6">
            <div class="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
                <!-- Replace with your content -->
                <div class="">
                        <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            <li v-for="requirement in requirements" :key="requirement.id"
                                class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
                                <div class="flex-1 flex flex-col p-8">
                                    <FolderOpenIcon class="w-32 h-32 text-green-400 flex-shrink-0 mx-auto rounded-full" :src="requirement.imageUrl"
                                        alt="" />
                                    <h3 class="mt-6 text-gray-900 text-sm font-medium">{{ requirement.name }}</h3>
                                    <dl class="mt-1 flex-grow flex flex-col justify-between">
                                        <dt class="sr-only">Title</dt>
                                        <dd class="text-gray-500 text-sm">{{ requirement.description }}</dd>
                                    </dl>
                                </div>
                                <div>
                                    <div class="-mt-px flex divide-x divide-gray-200">
                                        <div class="w-0 flex-1 flex">
                                            <button @click="handleClickAddFile"
                                                class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                                                <FolderAddIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
                                                <span class="ml-3">Add</span>
                                            </button>
                                        </div>
                                        <div class="-ml-px w-0 flex-1 flex">
                                            <button 
                                                @click="handleClickViewFiles(requirement.id)"
                                                class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
                                                <EyeIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
                                                <span class="ml-3">View</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
import { setActiveNav } from "@/composables/setActiveNavigation";
import { defineComponent, onMounted } from "vue";
import { ChevronLeftIcon, ChevronRightIcon, FolderAddIcon, EyeIcon, FolderOpenIcon } from '@heroicons/vue/solid'
import { getFileRequirements } from '@/composables/courses/file_requirement_service'
import { useRouter } from "vue-router";

export default defineComponent({
    name: 'FileRequirementsView',
    components: {
        ChevronLeftIcon,
        ChevronRightIcon,
        FolderAddIcon,
        EyeIcon,
        FolderOpenIcon
    },
    setup() {

        const router = useRouter();

        const { loadRequirements, loadingRequirements, requirements } = getFileRequirements();

        const handleClickViewFiles = (id) => {
            router.push({name: 'View File Requirements', params: {id}});
        }

        onMounted(async () => {
            await loadRequirements();
            setActiveNav('File Requirements')
        })
        return {
            loadingRequirements,
            requirements,
            handleClickViewFiles
        }
    }
})
</script>