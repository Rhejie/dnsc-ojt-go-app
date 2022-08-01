<template>
    <el-form-item label="Institute" prop="institute_id">
        <el-select v-model="institute_id"  placeholder="Select Institute">
            <el-option :label="'All'" :value="'all'" />
            <el-option
            v-for="item in institutes"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            />
        </el-select>
    </el-form-item>
</template>
<script>
import { getInstitutes } from "@/composables/admin_data";
import { useEmitter } from "@/composables/useEmitter";
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
    name: 'InstituteSelect',
    setup() {
        const emitter = useEmitter;
        const institute_id = ref('all');
        const { loadInstitutes, institutes } = getInstitutes()
        loadInstitutes()

        watch(institute_id, () => {
            console.log('role ->', institute_id.value)
            emitter.emit("SELECTED_INSTITUTE", institute_id.value);
        })
        return {
            institutes,
            institute_id
        }
    }
})
</script>