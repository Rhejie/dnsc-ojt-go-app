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
                            <router-link to="/agencies" class="text-sm font-medium text-gray-500 hover:text-gray-700">
                                Agencies
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
                }} Agency</h2>
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
                    <div v-loading="loadingInstitute" class=" shadow-xl rounded-lg">
                        <form @submit.prevent="handleClickSubmit">
                            <div class="shadow sm:rounded-md sm:overflow-hidden">
                                <div class="bg-white py-6 px-4 space-y-6 sm:p-6">
                                    <div>
                                        <h3 class="text-lg leading-6 font-medium text-gray-900">Agency Information
                                        </h3>
                                    </div>

                                    <div class="grid grid-cols-6 gap-6">
                                        <div class="col-span-6 sm:col-span-6">
                                            <label for="name"
                                                class="block text-sm font-medium text-gray-700">Name</label>
                                            <input type="text" name="name" v-model="agency.name" id="name"
                                                autocomplete="given-name" placeholder="Name..."
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>

                                        <div class="col-span-6 sm:col-span-6">
                                            <label for="name"
                                                class="block text-sm font-medium text-gray-700">Address</label>
                                            <textarea type="text" v-model="agency.address" name="name" id="name"
                                                placeholder="Address..." autocomplete="family-name"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>
                                        <div class="col-span-3 sm:col-span-3">
                                            <label for="name"
                                                class="block text-sm font-medium text-gray-700">Latitude</label>
                                            <input type="text" name="name" v-model="agency.latitude" id="name"
                                                autocomplete="given-name" placeholder="Latitude..."
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>
                                        <div class="col-span-3 sm:col-span-3">
                                            <label for="name"
                                                class="block text-sm font-medium text-gray-700">Longitude</label>
                                            <input type="text" name="name" v-model="agency.longitude" id="name"
                                                autocomplete="given-name" placeholder="Longitude..."
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>
                                    </div>
                                </div>
                                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button type="button" @click="handleClickCancel"
                                        class="bg-red-600 mr-2 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Cancel</button>
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
import { storeAgencyData } from '@/composables/agency_service'

export default defineComponent({
    name: 'AgencyForm',
    props: {
        id: null
    },
    components: {
        ChevronLeftIcon,
        ChevronRightIcon
    },
    setup(props) {
        const router = useRouter()
        const agency = ref({
            name: '',
            address: '',
            latitude: '',
            longitude: '',
        })
        const error = ref()
        const loading = ref(false)

        const handleClickCancel = () => {
            router.go(-1)
        }

        

        const handleClickSubmit = async () => {
            if (props.id && typeof props.id != undefined) {
                return;
            }
            const {storeAgency, response, errorAgency, loadingAgency} = storeAgencyData(agency.value)
            await storeAgency()
            agency.value = response.value,
            error.value = errorAgency.value
            loading.value = loadingAgency.value
            if(response.value && !loading.value) {
                router.push('/agencies')
            }
        }

        onMounted(() => {
            setActiveNav('Agencies')

            if(props.id && typeof props.id != undefined) {
                console.log('has id')
            }
        })

        return {
            handleClickCancel,
            handleClickSubmit,
            agency
        }
    }
})
</script>