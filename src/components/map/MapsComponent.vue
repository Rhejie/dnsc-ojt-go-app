<template>
    <div>
        <div class="w-full p-2" style="height: 500px; ">
            <l-map :zoom="setting.zoom" :tileSize="512" :zoomOffset="-1" style="z-index:1" :center="getCenter"
                :options="setting.mapOptions">
                <l-tile-layer :url="setting.url" :attribution="setting.attribution" />
                <map-markers-component v-for="branch in locations" :buy-center="branch" :key="branch.id"/>
            </l-map>
        </div>
    </div>
</template>
<script>
import { computed, defineComponent, ref } from "vue";
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'
import MapMarkersComponent from '@/components/map/MapMarkersComponent.vue'

export default defineComponent({
    name: 'MapsComponent',
    components: {
        LMap,
        LTileLayer,
        MapMarkersComponent
    },
    props: {
        areas: {
            type: Array,
            default: null
        },
    },
    setup(props) {

        const setting = ref({
            zoom: 13,
            zoomControl: true,
            url: 'https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=cac1c63e746741a79462820881e7f2c6',
            attribution: 'Carvendee',
            showParagraph: true,
            mapOptions: {
                zoomSnap: 0.5,
                scrollWheelZoom: false,
                popupOpen: true,
            },
            center: {
                lat: 0,
                lng: 0
            },
            radius: 0.0015696
        })


        const locations = computed(() => props.areas)

        const getCenter = computed(() => {
            if (props.areas.length > 0) {
                return [props.areas[0].latitude, props.areas[0].longitude]
            }
            else {
                return []
            }
        })

        return {
            locations,
            setting,
            getCenter
        }
    }
})
</script>