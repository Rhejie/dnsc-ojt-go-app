<template>
    <span>User  &nbsp;</span>
    <el-select v-model="role_id" size="medium" placeholder="Select Role">
        <el-option :label="'All'" :value="'all'" />
        <el-option v-for="role in roles" :key="role.id" :label="role.name" :value="role.id" />
    </el-select>
</template>
<script>
import { getRoles } from "@/composables/admin_data";
import { useEmitter } from "@/composables/useEmitter";
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
    name: 'RoleSelect',
    setup() {
        const role_id = ref('all');
        const emitter = useEmitter;
        const { loadingRoles, loadRoles, roles } = getRoles();
        loadRoles()

        watch(role_id, () => {
            console.log('role ->', role_id.value)
            emitter.emit("SELECTED_ROLE", role_id.value);
        })
        return {
            roles,
            loadingRoles,
            role_id,
        }
    }
})
</script>