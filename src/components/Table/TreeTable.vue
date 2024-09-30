<template>
  <div id="image">
    <el-table
      ref="treeTable"
      class="tree-table"
      row-key="id"
      :tree-props="{ children: 'children' }"
      border
      :data="tableData"
      :cellStyle="cellStyle"
    >
      <template v-for="(item, index) in tableColumn">
        <template v-if="item.type == 'left'">
          <el-table-column
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :align="item.align"
            :sortable="item.sortable"
            :fixed="item.fixed"
            :show-overflow-tooltip="item.showOverflowTooltip"
          >
          </el-table-column>
        </template>
        <template v-else-if="item.type == 'right'">
          <el-table-column
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :align="item.align"
            :sortable="item.sortable"
            :fixed="item.fixed"
            :show-overflow-tooltip="item.showOverflowTooltip"
          >
          </el-table-column>
        </template>
      </template>
    </el-table>
  </div>
</template>
<script>
import { getWaterMark, fixPercent } from "@/utils";
export default {
  name: "TreeTable",
  props: {
    // tableData: {
    //   type: Array,
    //   default: () => [],
    // },
    tableColumn: {
      type: Array,
      default: () => [],
    },
    cellStyle: {
      default: () => ({}),
    },
  },
  data() {
    return {
      userName: "111",
      tableColumns: [
        {
          prop: "date",
          label: "日期",
          width: "180",
          align: "center",
          sortable: true,
          fixed: false,
          showOverflowTooltip: true,
          type: "left",
        },
        {
          prop: "name",
          label: "姓名",
          width: "180",
          align: "center",
          sortable: true,
          fixed: false,
          showOverflowTooltip: true,
          type: "left",
        },
        {
          prop: "address",
          label: "地址",
          width: "180",
          align: "center",
          sortable: true,
          fixed: false,
          showOverflowTooltip: true,
          type: "left",
        },
        {
          prop: "left",
          label: "左侧",
          width: "180",
          align: "center",
          sortable: true,
          fixed: false,
          showOverflowTooltip: true,
          type: "left",
        },
        {
          prop: "right",
          label: "右侧",
          width: "180",
          align: "center",
          sortable: true,
          fixed: false,
          showOverflowTooltip: true,
          type: "left",
        },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",

          left: -1,
          right: 123,
          amount5: 12.5,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          left: "123",
          right: "123",
          amount5: 12.5,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          left: "123",
          right: "123",
          amount5: 69.5,
        },
      ],
      fixedList: [],
    };
  },
  mounted() {
    this.getCheckedNodes();
  },
  methods: {
    // 获取选中行数据
    getCheckedNodes() {
      this.fixedList = fixPercent(this.tableData, "amount5");
      console.log(this.fixedList);
    },
    async getImage() {
      const dom = document.getElementById("image");
      if (document.getElementById("image")) {
        console.log("image");
        dom.appendChild(getWaterMark(dom, this.userName));
      }
    },
  },
};
</script>
