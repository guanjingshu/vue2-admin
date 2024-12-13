<template>
  <div class="bcwhite">
    <el-table
      ref="titleTable"
      class="customTableTitle"
      :class="{ 'el-table--scrollable-x': scrollX }"
      :data="tableData"
    >
      <template v-for="(item, index) in tableColumns">
        <template>
          <el-table-column
            v-if="!item.render"
            :prop="item.prop"
            :label="item.label"
            :type="item.type"
            :key="index"
          ></el-table-column>
          <template v-else>
            <el-table-column
              v-bind="item"
              :prop="item.prop"
              :label="item.label"
              :key="index + item.prop"
            >
              <template slot-scope="scope">
                <Item :render="item.render" :scope="scope" :title="item.prop" />
              </template>
            </el-table-column>
          </template>
        </template>
      </template>
      <template slot="empty">
        <div class="no_data" :style="`height:${noDataHeight}`">
            <img :src="nodata" alt="" />
          <!-- <span>暂无数据</span> -->
        </div>
      </template>
    </el-table>
  </div>
</template>
<script>
import Item from "@/components/Table/Item";
import nodata from "@/images/zz.png"
export default {
  name: "DateTable",
  components: {
    Item,
  },
  props: {
    scrollX: {
      type: Boolean,
      default: false,
    },
    tableData: Array,
    tableColumns: Array,
    noDataHeight: {
      type: String,
      default: "60vh",
    },
  },
  data() {
    return {nodata};
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: scroll;
}
::v-deep .el-table__fixed {
  bottom: 0px !important;
  height: auto !important;
}
.no_data {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>
