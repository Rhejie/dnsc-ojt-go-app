<template>
    <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <img class="mx-auto h-52 w-auto" src="@/assets/dnsc-logo.png"
                alt="Workflow" />
            <h2 class="mt-6 text-center text-stone-700 text-4xl font-extrabold ">Sign in to your account</h2>
        </div>

        <div class="mt-8 opacity-75 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form class="space-y-6" @submit.prevent="handleClickLogin">
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700"> Email address </label>
                        <div class="mt-1">
                            <input id="email" v-model="user.email" name="email" placeholder="Enter your email address" autocomplete="email" 
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
                        <div class="mt-1">
                            <input id="password" v-model="user.password" name="password" placeholder="Enter your password" type="password" autocomplete="current-password"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox"
                                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                            <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            class="w-full bg-emerald-800 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign
                            in</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
    name: 'LoginView',
    setup() {
        const router = useRouter()
        const store = useStore()
        const user = ref({
            email: '',
            password: '',
        })

        const errors = ref(null)
        document.body.style.backgroundImage = "url('./bg-1.webp')";
        const handleClickLogin = async () => {
            await store.dispatch('loginUser', user.value).then(() => {
                router.push('/')
            }).catch(errs => {
                // switch (errs.response.status) {
                //     case 422:
                //         errors.value = errs.response.data.errors
                //         break;
                //     case 401:
                //         errors.value = errs.response.data.errors
                //         break;
                //     case 500:
                //         errors.value = errs.response.data.message
                //         break;
                //     default:
                //         break;
                //     }
                console.log(errs)
            })
            if(!errors.value) {
                document.body.style.backgroundImage = "";
            }
        }
        return { 
            handleClickLogin,
            user,
            errors
        }
    }
})
</script>