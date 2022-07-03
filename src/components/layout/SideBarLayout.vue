<template>
    <TransitionRoot as="template" :show="sidebarOpen">
        <Dialog as="div" class="relative z-40 md:hidden" @close="sidebarOpen = false">
            <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
                enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
                leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </TransitionChild>

            <div class="fixed inset-0 flex z-40 ">
                <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                    enter-from="-translate-x-full" enter-to="translate-x-0"
                    leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                    leave-to="-translate-x-full">
                    <dialog-panel class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-emerald-700 bg-gradient-to-r bg-teal-800 bg-emerald-600">
                        <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                            enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100"
                            leave-to="opacity-0">
                            <div class="absolute top-0 right-0 -mr-12 pt-2">
                                <button type="button"
                                    class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    @click="handClick">
                                    <span class="sr-only">Close sidebar</span>
                                    <x-icon class="h-6 w-6 text-white" aria-hidden="true" />
                                </button>
                            </div>
                        </TransitionChild>
                        <div class="flex-shrink-0 flex items-center px-4">
                            <img class="w-12" src="@/assets/dnsc-logo.png" alt="Workflow" />
                            <span class="mx-auto font-sans text-white text-2xl">DNSC OJT GO</span>
                        </div>
                        <div class="mt-5 flex-1 h-0 overflow-y-auto">
                            <nav class="px-2 space-y-1">
                                <router-link v-for="item in navigation" 
                                    @click="handClick"
                                    :class="[item.current ? 'bg-green-900 text-white' : 'text-white hover:text-white hover:bg-green-800', 'group flex items-center px-2 py-2 text-base font-medium rounded-md']"
                                    :key="item.name" :to="item.href">
                                    <component :is="item.icon" class="mr-4 flex-shrink-0 h-6 w-6 text-white"
                                        aria-hidden="true" />
                                    {{ item.name }}
                                </router-link>
                            </nav>
                        </div>
                    </dialog-panel>
                </TransitionChild>
                <div class="flex-shrink-0 w-14" aria-hidden="true">
                    <!-- Dummy element to force sidebar to shrink to fit close icon -->
                </div>
            </div>
        </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 ">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="flex flex-col flex-grow pt-5 bg-emerald-700 bg-gradient-to-r bg-teal-800 bg-emerald-600 overflow-y-auto">
            <div class="flex items-center flex-shrink-0 px-4">
                <img class="w-12" src="@/assets/dnsc-logo.png" alt="Workflow" />
                <span class="mx-auto font-sans font-medium text-white text-2xl">DNSC OJT GO</span>
            </div>
            <div class="mt-5 flex-1 flex flex-col">
                <nav class="flex-1 px-2 pb-4 space-y-1">
                    <router-link v-for="item in navigation" 
                        :class="[item.current ? 'bg-green-900 text-white text-white' : 'text-white hover:text-white hover:bg-green-900', 'group flex items-center px-2 py-2 text-base font-medium rounded-md']"
                        :key="item.name" :to="item.href" @click="handClick">
                        <component :is="item.icon" class="mr-4 flex-shrink-0 h-6 w-6 text-grey-800"
                            aria-hidden="true" />
                        {{ item.name }}
                    </router-link>
                </nav>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue'
import {
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import {
    XIcon,
} from '@heroicons/vue/outline'
import {useEmitter} from '@/composables/useEmitter';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'SideBarLayout',
    components: {
        Dialog,
        DialogPanel,
        TransitionChild,
        TransitionRoot,
        XIcon
    },
    setup() {

        const emitter = useEmitter;
        const store = useStore();

        const navigation = store.state.sideBarNavigation


        const sidebarOpen = ref(false)
        const handClick = () => {
            console.log('asdasd');
            sidebarOpen.value = !sidebarOpen.value
        }

        onMounted(() => {
            emitter.on('CLOSE_SIDEBAR', (data) => {
                sidebarOpen.value = data
            })
        })
        return {
            navigation,
            sidebarOpen,
            handClick
        }
    },
})
</script>
