<template>
    <div>
        
        <side-bar-layout/>
        
        <div class="md:pl-64 flex  flex-col flex-1">
            <header-layout/>

            <main>
                <router-view/>
            </main>
        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue'

import SideBarLayout from '@/components/layout/SideBarLayout.vue'
import HeaderLayout from '@/components/layout/HeaderLayout.vue'
export default defineComponent({
    name: 'WelcomeView',
    components: {
        SideBarLayout,
        HeaderLayout
    },
    setup() {

        console.log('welcome')
    },
})
</script>
