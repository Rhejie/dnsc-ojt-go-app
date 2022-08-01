<template>
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
import { defineComponent } from "vue";

export default defineComponent({
    name: 'SchoolYearForm',
    setup() {
        return {
            
        }
    }
})
</script>