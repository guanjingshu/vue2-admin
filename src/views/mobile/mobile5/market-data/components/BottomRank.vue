<template>
    <div class="bottom-box mb8">
        <DateTable
            :table-columns="tableColumn"
            :table-data="tableData"
        ></DateTable>
    </div>
</template>
<script>
import DateTable from './DateTable.vue';
export default {
    name: 'BottomRank',
    components: {
        DateTable
    },
    props: {
        tableColumn:{
            type: Array,
            default: () => []
        },
        tableData:{
            type: Array,
            default: () => []
        }
    },
    data() {
        return {}
    },

}
</script>