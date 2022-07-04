<template>
    <div class="p-2 ">
        <el-pagination v-model:currentPage="currentPage1" :page-size="page_size" :page-sizes="page_sizes"
         layout="total, sizes, prev, pager, next" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
</template>
<script>
import { useEmitter } from "@/composables/useEmitter";
import { computed } from "@vue/reactivity";
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
    name: 'GPagination',
    props: [
        "current_size",
        "current_page",
        "pagination",
        "layout",
        "page_size"
    ],
    setup(props) {
        const emitter = useEmitter
        const currentPage1 = ref(0)

        const page_sizes = ref([10, 25, 50, 100, 200])

        const total = computed(() => props.current_size)

        const handleSizeChange = (val) => {
            console.log(`${val} items per page`)
            emitter.emit('CHANGE_SIZE', val)
        }
        const handleCurrentChange = (val) => {
            emitter.emit('CHANGE_PAGE', val)
        }

        onMounted(() => {
            console.log('current_size ',props.current_size);
            // total.value = props.current_size;
            currentPage1.value = props.current_page
        })


        return {
            currentPage1,
            handleSizeChange,
            handleCurrentChange,
            total,
            page_sizes
        }
    }
})
</script>