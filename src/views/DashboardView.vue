<template>
    <div class="">
        <!-- Header -->
        <div class="h-48 bg-gradient-to-r from-emerald-500 to-green-500">
            <img class=" w-full object-cover lg:h-48" src="@/assets/bg-1.webp" alt="" />
        </div>
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                <div class="flex">
                    <img class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                        src="@/assets/profile-icon.jpg" alt="" />
                </div>
                <div class="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                    <div class="sm:hidden md:block mt-6 min-w-0 flex-1">
                        <h1 class="text-2xl font-bold text-gray-500 truncate">
                            DASHBOARD
                        </h1>
                    </div>
                    <div class="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                        <button type="button"
                            class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                            <MailIcon class="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span>Message</span>
                        </button>
                        <button type="button"
                            class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                            <PhoneIcon class="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span>Call</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Header -->
        <div class="w-full h-full px-4 sm:px-6 md:px-8">
            <!-- Replace with your content -->
            <div class="py-4 ">
                <div class="w-full rounded-lg h-96">
                    <el-tabs v-model="activeName" type="border-card" class="demo-tabs" @tab-click="handleClick">
                        <el-tab-pane label="User" name="first">User</el-tab-pane>
                        <el-tab-pane label="Config" name="second">Config</el-tab-pane>
                        <el-tab-pane label="Role" name="third">Role</el-tab-pane>
                        <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <!-- /End replace -->
        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue'
import { ref } from 'vue'
import { MailIcon, PhoneIcon } from '@heroicons/vue/solid'

export default defineComponent({
    name: 'DashboardView',
    components: {
        MailIcon,
        PhoneIcon,
    },
    setup() {
        const activeName = ref('first')

        const handleClick = (tab, event) => {
            console.log(tab, event)
        }
        return {
            handleClick,
            activeName,
        }
    },
})
</script>
