<template>
    <div class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <button type="button"
            class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            @click="handleClick">
            <span class="sr-only">Open sidebar</span>
            <menu-alt2-icon class="h-6 w-6" aria-hidden="true" />
        </button>
        <div class="flex-1 xs:bg-white bg-emerald-600 px-4 flex justify-between">
            <div class="flex-1 flex ">
                <!-- <form class="w-full flex md:ml-0" action="#" method="GET">
                            <label for="search-field" class="sr-only">Search</label>
                            <div class="relative w-full text-gray-400 focus-within:text-gray-600">
                                <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                                    <search-icon class="h-5 w-5" aria-hidden="true" />
                                </div>
                                <input id="search-field"
                                    class="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                                    placeholder="Search" type="search" name="search" />
                            </div>
                        </form> -->
                <!-- <p class="text-md text-semibold text-gray-100 my-auto">Logged in as </p> -->
            </div>
            <div class="ml-4 flex items-center md:ml-6">
                <button type="button"
                    class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span class="sr-only">View notifications</span>
                    <bell-icon class="h-6 w-6" aria-hidden="true" />
                </button>

                <!-- Profile dropdown -->
                <Menu as="div" class="ml-3 relative">
                    <div>
                        <menu-button
                            class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span class="sr-only">Open user menu</span>
                            <img class="h-8 w-8 rounded-full" src="@/assets/profile-icon.jpg" alt="" />
                        </menu-button>
                    </div>
                    <transition enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95">
                        <MenuItems
                            class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                            <a :href="item.href"
                                :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">{{
                                        item.name
                                }}</a>
                            </MenuItem>
                        </MenuItems>
                    </transition>
                </Menu>
            </div>
        </div>
    </div>
</template>
<script>
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/vue'

import {
    BellIcon,
    MenuAlt2Icon,
} from '@heroicons/vue/outline'
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import {useEmitter} from '@/composables/useEmitter'

export default defineComponent({
    name: 'HeaderLayout',
    components: {
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        BellIcon,
        MenuAlt2Icon
    },
    setup() {

        const store = useStore();
        const emitter = useEmitter;
        const userNavigation = [
            { name: 'Your Profile', href: '#' },
            { name: 'Settings', href: '#' },
            { name: 'Sign out', href: '#' },
        ]
        const user = ref(store.state.userProfile)

        const handleClick = () => {
            emitter.emit('CLOSE_SIDEBAR', true)
        }

        return { 
            userNavigation,
            user,
            handleClick
        }
    },
})
</script>
