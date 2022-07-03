<template>
    <div class="px-5  bg-green-100 pt-2  pb-5  shadow-md">
        <div>
            <nav class="sm:hidden" aria-label="Back">
                <a href="#" @click="handleClickCancel"
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
                            <router-link to="/institutes" class="text-sm font-medium text-gray-500 hover:text-gray-700">
                                Institutes
                            </router-link>

                        </div>
                    </li>
                    <li>
                        <div class="flex items-center">
                            <ChevronRightIcon class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <router-link :to="{ name: 'Create Institute' }"
                                class="text-sm font-medium text-gray-500 hover:text-gray-700">Create
                            </router-link>

                        </div>
                    </li>
                </ol>
            </nav>
        </div>
        <div class="mt-2 md:flex md:items-center md:justify-between">
            <div class="flex-1 min-w-0">
                <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">{{ id ? "Update" :
                        "Create"
                }} Institute</h2>
            </div>
            <div class="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
            </div>
        </div>
    </div>
    <main>
        <div class="py-6">
            <div class="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
                <!-- Replace with your content -->
                <div class="py-4">
                    <div v-if="loadingInstitute" class="shadow-md h-96 rounded-md p-4 w-full mx-auto">
                        <div class="animate-pulse flex space-x-4">
                            <div class="rounded-full bg-slate-700 h-10 w-10"></div>
                            <div class="flex-1 space-y-6 py-1">
                                <div class="h-2 bg-slate-700 rounded"></div>
                                <div class="space-y-3">
                                    <div class="grid grid-cols-3 gap-4">
                                        <div class="h-2 bg-slate-700 rounded col-span-2"></div>
                                        <div class="h-2 bg-slate-700 rounded col-span-1"></div>
                                    </div>
                                    <div class="h-2 bg-slate-700 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class=" shadow-xl rounded-lg">
                        <form @submit.prevent="handleClickSubmit">
                            <div class="shadow sm:rounded-md sm:overflow-hidden">
                                <div class="bg-white py-6 px-4 space-y-6 sm:p-6">
                                    <div>
                                        <h3 class="text-lg leading-6 font-medium text-gray-900">Institute Information
                                        </h3>
                                    </div>

                                    <div class="grid grid-cols-6 gap-6">
                                        <div class="col-span-6 sm:col-span-6">
                                            <label for="name"
                                                class="block text-sm font-medium text-gray-700">Name</label>
                                            <input type="text" name="name" v-model="institute.name" id="name"
                                                autocomplete="given-name" placeholder="Institute Name..."
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>

                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="name"
                                                class="block text-sm font-medium text-gray-700">Abbreviation</label>
                                            <input type="text" v-model="institute.abbreviation" name="name" id="name"
                                                placeholder="Institute Abbreviation..." autocomplete="family-name"
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
import { setActiveNav } from "@/composables/setActiveNavigation";
import { defineComponent, onMounted, ref } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid'
import { useRouter } from "vue-router";
import { getInstituteById, storeInstitute } from '@/composables/settings/institute_service'
import { useEmitter } from "@/composables/useEmitter";

export default defineComponent({
    name: 'CreateInstitute',
    components: {
        ChevronLeftIcon,
        ChevronRightIcon
    },
    props: {
        id: null,
        model: {}
    },
    setup(props) {
        const router = useRouter()
        const emitter = useEmitter

        const institute = ref({
            id: '',
            name: '',
            abbreviation: ''
        })

        const handleClickCancel = () => {
            router.go(-1)
        }

        const handleClickSubmit = async () => {
            const { instituteRes, instituteError, loadingInstitute } = await storeInstitute(institute.value)

            if (!loadingInstitute.value) {
                emitter.emit('NEW_INSTITUTE', instituteRes.value)
            }

            console.log(instituteError.value)
        }

        const { instituteRes, loadingInstitute, loadInstitute } = getInstituteById(props.id)

        onMounted(async () => {
            setActiveNav('Institutes')

            if (props.id) {
                await loadInstitute()
                institute.value = instituteRes.value
            }
        });

        return {
            handleClickCancel,
            handleClickSubmit,
            institute,
            loadingInstitute
        }
    }
})
</script>