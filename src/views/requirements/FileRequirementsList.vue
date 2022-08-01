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
                    <li>
                        <div class="flex items-center">
                            <ChevronRightIcon class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <router-link to="/file-requirements/view"
                                class="text-sm font-medium text-gray-500 hover:text-gray-700">View
                            </router-link>
                        </div>
                    </li>
                </ol>
            </nav>
        </div>
        <div class="mt-2 md:flex md:items-center md:justify-between">
            <div class="flex-1 min-w-0">
                <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Manage File Requirements
                    of {{ requirement.name }}
                </h2>
            </div>

        </div>
    </div>
    <main>
        <div class="py-6">
            <div class="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
                <el-card shadow="always">
                    <el-upload ref="uploadRef" :key="refreshKey" class="upload-demo" action="" :file-list="fileList" limit="1"
                        :auto-upload="false" :on-change="handleUploadChange" :on-progress="handleProgress" :on-success="handleSuccess">
                        <template #trigger>
                            <el-button type="primary">select file</el-button>
                        </template>

                        <el-button class="ml-3" type="success" @click="submitUpload">
                            upload to server
                        </el-button>

                        <template #tip>
                            <div class="el-upload__tip">
                                jpg/png files with a size less than 500kb
                            </div>
                        </template>
                    </el-upload>
                </el-card>
                <div class="mt-8 flex flex-col">
                    <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"  v-loading="loadingFiles">
                                <table class="min-w-full divide-y divide-gray-300">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th scope="col"
                                                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                File</th>
                                            <th scope="col"
                                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name
                                            </th>
                                            <th scope="col"
                                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email
                                            </th>
                                            <th scope="col"
                                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">View
                                            </th>
                                            <th scope="col"
                                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status
                                            </th>
                                            <th scope="col"
                                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Rejected / Accepted
                                            </th>
                                            <th scope="col"
                                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Comment
                                            </th>
                                            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span class="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200 bg-white">
                                        <tr v-for="file in files" :key="file.id">
                                            <td
                                                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {{ file.file_name }}</td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {{ file.profile.lastname }}, {{file.profile.firstname}}</td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{
                                                    file.profile.email
                                            }}</td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <span :class="`inline-flex items-center shadow-sm px-2.5 py-0.5 text-sm leading-5 font-medium rounded-full bg-white ${file.view == 'Pending' ? 'bg-amber-600 text-white' : ''} ${file.view == 'Viewed' ? 'bg-green-600 text-white' : ''}`"> {{ file.view}}</span>
                        
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <span :class="`inline-flex items-center shadow-sm px-2.5 py-0.5 text-sm leading-5 font-medium rounded-full bg-white 
                                                    ${file.is_status == 'Pending' ? 'bg-amber-600 text-white' : ''} 
                                                    ${file.is_status == 'Accepted' ? 'bg-green-600 text-white' : ''} 
                                                    ${file.is_status == 'Rejected' ? 'bg-red-600 text-white' : ''}`"> {{ file.is_status}}</span>
                        
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{
                                                    file.date_rejected
                                            }}</td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{
                                                    file.comment
                                            }}</td>
                                            <td
                                                class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <button class="text-indigo-600 hover:text-indigo-900" @click="handleClickDownbload(file)">
                                                    download
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
import { getRequirementById } from "@/composables/courses/requirement_service";
import { setActiveNav } from "@/composables/setActiveNavigation";
import { defineComponent, onMounted, ref } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid'
import { fileUpload, getFiles, downloadFile } from '@/composables/courses/file_requirement_service'
// import { CloudUploadIcon } from '@heroicons/vue/outline'

export default defineComponent({
    name: 'FileRequirementsList',
    props: {
        id: null
    },
    components: {
        ChevronLeftIcon,
        ChevronRightIcon,
        // CloudUploadIcon
    },
    setup(props) {

        const { load, loadingRequirement, requirement } = getRequirementById(props.id);

        const { loadFiles, loadingFiles, files} = getFiles(props.id)

        const people = [
            { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
            // More people...
        ]

        const fileData = ref();
        const fileName = ref();

        const fileList = ref([])
        const uploadRef = ref()
        const progress = ref(0)
        const refreshKey = ref(0)

        const submitUpload = async () => {
            let formData = new FormData();
            formData.append('file', fileData.value);
            formData.append('file_requirement_id', props.id);
            const { uploadProgress, loadingUploading, fileres } = await fileUpload(formData);
            progress.value = uploadProgress.value
            if(!loadingUploading.value) {
                refreshKey.value++;
                files.value.unshift(fileres.value)
            }
            fileList.value = []
        }

        const handleProgress = (ev, file) => {
            file.raw['status'] = "uploading";
        }
        const handleSuccess = (res, file) => {
            file.raw['status'] = "success";
        }

        const handleClickDownbload = (file) => {
            downloadFile(file.id).then(res => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute('download',  `${file.file_name}`);
                document.body.appendChild(link)
                link.click();
            })
        }

        const handleUploadChange = (file) => {
            console.log(file)
            fileData.value = file.raw
            fileName.value = file.name
        }

        onMounted(async () => {
            await load();
            await loadFiles();
            setActiveNav('File Requirements')
        })
        return {
            loadingRequirement,
            requirement,
            people,
            submitUpload,
            handleProgress,
            handleSuccess,
            fileList,
            uploadRef,
            handleUploadChange,
            handleClickDownbload,
            fileData,
            progress,
            fileName,
            refreshKey,
            loadingFiles,
            files
        }
    }
})
</script>