<template> 
    <div class="px-5 pt-2 pb-5 shadow-md">
        <div>
            <nav class="sm:hidden" aria-label="Back">
                <a href="#" class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
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
                            <router-link to="/courses" class="text-sm font-medium text-gray-500 hover:text-gray-700">Courses
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
                <button type="button"
                    @click="handleClickNewCourse"
                    class="ml-3 inline-flex 
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
          <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <!-- Replace with your content -->
            <div class="py-4">
              <div class=" shadow-xl rounded-lg h-96" >
                <el-table :data="users" style="width: 100%">
                    <el-table-column prop="date" label="Date" width="180" />
                    <el-table-column prop="name" label="Name" width="180" />
                    <el-table-column prop="address" label="Address" />
                </el-table>
              </div>
            </div>
            <!-- /End replace -->
          </div>
        </div>
      </main>
</template>
<script>
import { setActiveNav } from "@/composables/setActiveNavigation";
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '@heroicons/vue/solid'
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";

    export default defineComponent({
        name: 'CoursesView',
        components: {
            ChevronLeftIcon,
            ChevronRightIcon,
            PlusIcon
        },
        setup() {
            const store = useStore();

            const handleClickNewCourse = () => {
                store.push({name: 'Create Course'})
            }
            
            onMounted(() => {
                setActiveNav('Courses')
            });

            return {
                handleClickNewCourse
            }
        }
    })
</script>