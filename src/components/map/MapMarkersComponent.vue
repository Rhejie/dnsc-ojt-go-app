<template>
    <l-marker 
        @l-add="$event.target.openPopup()"
        @mouseover="$event.target.openPopup()"
        :lat-lng="[buyCenter.latitude, buyCenter.longitude]" 
        >
            <l-popup class="w-full h-1/4 place-content-center">
                <div class="w-full p-2 space-y-2">
                    <div class="w-full">
                        <h2 class="text-lg tracking-tight md:text-lg">
                            <span class="">{{buyCenter.name}}</span>
                        </h2>
                    </div>
                    <div class="w-full">
                        <h2 class="text-md tracking-tight text-gray md:text-md">
                            <span class="">{{ buyCenter.address }}</span>
                        </h2>
                    </div>
                    <!-- <div class="w-full flex">
                        <div class="w-1/2 mx-auto">
                            <button type="submit"
                                @click="handleClickGetDirections(buyCenter)"
                                class="block w-full rounded-md px-2 py-2 text-base text-gray shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 bg-orange font-bold">
                                DIRECTIONS
                            </button>
                        </div>
                    </div> -->
                </div>
            </l-popup>
    </l-marker>
</template>
<script>
import { useEmitter } from '@/composables/useEmitter';
import { LMarker, LPopup} from '@vue-leaflet/vue-leaflet';
import { computed, defineComponent } from "vue";
export default defineComponent({
    name: 'MapMarkersComponent',
    props: {
        buyCenter: {
            type: Object
        }
    },
    components: { 
        LMarker,
        LPopup
    },  
    setup(props) {
        
        const emitter = useEmitter;
        const location  = computed(() => {
            if(props.buyCenter.address2) {
                return props.buyCenter.address1 + " " + props.buyCenter.address2
            }
            
            return props.buyCenter.address1
        })
        const handleClickGetDirections = (buyCenter) => {
            // redirect to the buyCenterMap Component
            emitter.emit('GET_DIRECTIONS', buyCenter)
        }
        return {
            location,
            handleClickGetDirections
        }
    }
})
</script>