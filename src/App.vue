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
          await store.dispatch('getUserProfile');
        }
      })
    }
})
</script>
<style>

</style>
