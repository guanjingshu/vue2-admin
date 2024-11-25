<template>
    <div class="table-product">
        <el-table
            ref="elTable"
            class=""
            border
            :header-cell-style="headerCellStyle"
            :data="tableData"
            row-key="id"
            :expand-row-keys="expandRowKeys"
            :tree-props="{children: 'children'}"
            height="510"
        >
            <el-table-column
            label="产品分类"
            prop="SALE_DISTRIBUTOR"
            align="center"
            :show-overflow-tooltip="true"
            >
             <template slot-scope="scope">
                <Cube  class="size12" :color="scope.row.color"/>{{ scope.row.test }}
             </template>
                
            </el-table-column>
            <el-table-column
                label="数量(万)"
                prop="SALE_CHANNEL"
                align="center"
                :show-overflow-tooltip="false"
            >
                <template slot-scope="scope">
                    {{ scope.row.test }}
                </template>
            
            </el-table-column>
            <el-table-column
                label="规模(亿)"
                prop="PERFOR_RATIO"
                align="center"
                :show-overflow-tooltip="false"
            >
                <template slot-scope="scope">
                    {{ scope.row.test }}
                </template>
            </el-table-column>
            <el-table-column
                label="规模(亿)"
                prop="PERFOR_RATIO"
                align="center"
                :show-overflow-tooltip="false"
            >
                <template slot-scope="scope">
                    {{ scope.row.test }}
                </template>
            </el-table-column>
            <el-table-column
                label="占比"
                prop="PERFOR_RATIO"
                align="center"
                :show-overflow-tooltip="false"
            >
                <template slot-scope="scope">
                    {{ scope.row.test }}
                </template>
            </el-table-column>
            <el-table-column
                label="较上一工作日"
                prop="PERFOR_RATIO"
                align="center"
                :show-overflow-tooltip="false"
            >
                <template slot-scope="scope">
                    {{ scope.row.test }}
                </template>
            </el-table-column>
            <el-table-column
                label="较上一工作日2"
                prop="PERFOR_RATIO"
                align="center"
                :show-overflow-tooltip="false"
            >
                <template slot-scope="scope">
                    {{ scope.row.test }}
                </template>
            </el-table-column>
            <el-table-column
                label="较上一工作日3"
                prop="PERFOR_RATIO"
                align="center"
                :show-overflow-tooltip="false"
            >
                <template slot-scope="scope">
                    {{ scope.row.test }}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import Cube from '@/components/Item/Cube.vue'
export default {
    name: 'TableProduct',
    components: {
        Cube
    },
    props: {
        tableData: {
            type: Array,

        },
        expandRowKeys: {
            type: Array,

        },
        headerCellStyle: {
            type: Function,
        }
    },
    watch: {
        expandRowKeys: {
            handler: function(newVal, oldVal){
                if(Array.isArray(oldVal) && oldVal.length > 0){
                    oldVal.forEach(id => {
                        const row = this.tableData.find(row => row.id.toString()===id.toString())
                        this.$refs.elTable.toggleRowExpansion(row, false)
                    })
                }
            },
            immediate: true
        }
    }
}
</script>
<style lang="scss" scoped>
.table-product{
    ::v-deep .el-table--medium th{
        background-color: #f8f9fc;
        color: #323233;
        font-weight: 550;
    }
}
</style>