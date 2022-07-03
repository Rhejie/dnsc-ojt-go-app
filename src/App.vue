<template>
  <router-view/>
</template>
<script>
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import { isloggedIn } from '@/composables/auth_service'

export default defineComponent({
    name: 'App',
    setup() {
      const store = useStore();
      onMounted( async () => {
        if(isloggedIn()) {
          console.log("adsdsd")
          await store.dispatch('getUserProfile').then(res => {
            console.log('get profile -->' , res)
          });
        }
      })
    }
})
</script>
<style>

</style>
