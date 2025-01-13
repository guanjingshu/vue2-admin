<template>
  <div class="app-container">
    <SearchPanel
      ref="search"
      :searchData="searchData"
      @actionSearch="actionSearch"
    />
    <div class="relative">
      <div class="btn_edit">
        <el-button type="primary" icon="el-icon-plus" @click="addRule('指数收益率配置')">新建</el-button>
      </div>
    
      <BbTable
        :table-column="tableColumns"
        :table-data="tableData"
        :rowSpans="rowSpans"
        :cellStyle="cellStyle"
        :table-head-style="setTableHeadStyle"
        :noOperation="true"
      >
        <template slot-scope="row">
          <div class="relative fullwidth rowcenter">
            <span class="point" 
            :class="{disabled: checkCanEdit(row.row)}"
            @click="showDialog(row.row, '指数收益配置')"
            >
              编辑
            </span>
            <span class="btn_line"></span>
            <el-popover
              popper-class="del-popover"
              trigger="manual"
              placement="top"
              width="210"
              :ref="`popover-${row.index}`"
            >
              <div class="delete_con">
                <div class="tips tips_te">
                  <i class="el-icon-info" color="#ffab00"></i>
                  确定删除这行数据吗？
                </div>
                <div class="btns">
                  <span class="point" @click="doClose(row.row, row.index)">取消 </span>
                  <span class="point" @click="deleteT(row.row, row.index)">确定 </span>
                </div>
              </div>
              <span
                slot="reference"
                class="reset_btn point"
                :class="{disabled: checkCanDel(row.row)}"
                @click="showDia(row.row, row.index)"
              >删除</span>
            </el-popover>
          </div>
        </template>
      </BbTable>
      <setIndication v-if="setConFlag" :tip_title="tip_title" :setConFlag="setConFlag" @setting="handleClose"></setIndication>
    </div>
  </div>
</template>
<script>
import { productColumns } from "./tableColumn.js";
import setIndication from "./setIndication.vue";
import dayjs from "dayjs";
export default {
  name: "Table1",
  components: {
    setIndication
  },
  data() {
    return {
      searchData: [
        { name: "date", inputType: "date" },
        {
          id: 1002,
          label: "产品分类",
          inputType: "tree",
          defaultValue: [
            {
              id: 3016,
              label: "固定收益类",
              name: "jg_fourth_type",
              value: "",
            },
          ],
          list: [
            {
              id: 2001,
              label: "监管四分类",
              list: [
                {
                  id: 3016,
                  label: "固定收益类",
                  name: "jg_fourth_type",
                  value: "",
                },
              ],
            },
            {
              id: 2002,
              label: "监管四分类2",
              list: [
                {
                  id: 3017,
                  label: "固定收益类2",
                  name: "jg_fourth_type2",
                  value: "",
                },
              ],
            },
          ],
        },
        // { name: "start_at--end_at", content: "test", inputType: "daterange" },
      ],
      columns: "sta_type,type2,six_track,amount1,amount4,amount3,amount2",
      columns_desc: "分类,分类,分类,DATEXX,较上年末, 较上季度,较上个月",
      tableData: [
        {
          sta_type: "aaa",
          type2: "bbb",
          six_track: "ccc",
          amount1: 1,
          amount2: 2,
          amount3: 3,
          amount4: 4,
        },
        {
          sta_type: "aaa",
          type2: "bbb",
          six_track: "ccc",
          amount1: 1,
          amount2: 2,
          amount3: 3,
          amount4: 4,
        },
        {
          sta_type: "aaa",
          type2: "bbb",
          six_track: "ccc",
          amount1: 1,
          amount2: 2,
          amount3: 3,
          amount4: 4,
        },
      ],
      rowSpans: [],
      tableColumns: [
        // {
        //   prop: "date",
        //   label: "日期",
        //   width: "180",
        //   align: "center",
        //   sortable: true,
        //   fixed: false,
        //   showOverflowTooltip: true,
        //   type: "left",
        // },
        // {
        //   prop: "name",
        //   label: "姓名",
        //   width: "180",
        //   align: "center",
        //   sortable: true,
        //   fixed: false,
        //   showOverflowTooltip: true,
        //   type: "left",
        // },
        // {
        //   prop: "address",
        //   label: "地址",
        //   width: "180",
        //   align: "center",
        //   sortable: true,
        //   fixed: false,
        //   showOverflowTooltip: true,
        //   type: "left",
        // },
        // {
        //   prop: "left",
        //   label: "左侧",
        //   width: "180",
        //   align: "center",
        //   sortable: true,
        //   fixed: false,
        //   showOverflowTooltip: true,
        //   type: "left",
        // },
        // {
        //   prop: "right",
        //   label: "右侧",
        //   width: "180",
        //   align: "center",
        //   sortable: true,
        //   fixed: false,
        //   showOverflowTooltip: true,
        //   type: "left",
        // },
      ],
      tip_title: "",
      setConFlag: false,
    };
  },
  watch: {
    tableData: {
      handler(newVal) {
        this.rowSpans = this.$getColumnRow(
          ["sta_type", "type2", "six_track"],
          this.tableData
        );
        console.log("96====rowSpans", rowSpans);
      },
      // immediate: true
    },
  },
  created() {
    this.$nextTick(() => {
      this.tableColumns = productColumns;
    });
  },
  mounted() {
    let a = "aaa,bbb";
    let b = "是AAA,是BBB";
    // this.tableColumns = productColumns
    this.getTableColumn(this.tableColumns, a.split(","), b.split(","));
    let tableData = [
      {
        sta_type: "aaa",
        type2: "bbb",
        six_track: "ccc",
        amount1: 1,
        amount2: 2,
        amount3: 3,
        amount4: 4,
      },
      {
        sta_type: "aaa",
        type2: "bbb",
        six_track: "ccc",
        amount1: 1,
        amount2: 2,
        amount3: 3,
        amount4: 4,
      },
      {
        sta_type: "aaa",
        type2: "bbb",
        six_track: "ccc",
        amount1: 1,
        amount2: 2,
        amount3: 3,
        amount4: 4,
      },
    ];
    // this.tableColumns = this.getTableColumnOne(this.columns,this.columns_desc)
    // this.tableColumns = this.getTableColumn(this.columns,this.columns_desc)
    this.rowSpans = this.$getColumnRow(
      ["sta_type", "type2", "six_track"],
      tableData
    );
    console.log("96====rowSpans", this.rowSpans);
    this.setDefaultForm();
    console.log("table1 mounted");
  },
  methods: {
    cellStyle({row, column, rowIndex, columnIndex}){
      let cellColor = {}
      if(row.PROD_TYPE === '小计' && columnIndex > 0){
        cellColor.background = '#E1EAFD'
        cellColor.fontWeight = '600'
        cellColor.borderRight = 'none'
      }
      if(columnIndex > 0){
        cellColor.borderRight = 'none'
      }
      if(row.INSTI === '合计'){
        cellColor.background = '#D7E3FD'
        cellColor.fontWeight = '600'
      }
      return cellColor
    },
    addRule(title_tip){
      this.setConFlag = true
      this.tip_title = title_tip;
      this.recordId = null;
      this.setData = {}
    },
    checkCanEdit(){},
    showDialog(){},
    
    deleteT(){
      this.$refs.mytable.clearSelectionFn();
      this.previousPage()
      this.$refs[`popover-` + index].doClose()
    },
    previousPage(){
      // 判断当前数据是否需要返回前一页
      const totalPage = Math.ceil(
        (this.pageInfo.total - 1) / this.pageInfo.page_size
      );
      this.pageInfo.page_num = 
      this.pageInfo.page_num > totalPage ? totalPage : this.pageInfo.page_num;
      this.pageInfo.page_num <= 1 ? 1 : this.pageInfo.page_num;
    },
    checkCanDel(){},
    // 删除打开
    showDia(row, index){
      // 开启弹窗之前关闭所有的弹框
      for(const key in this.$refs){
        if(key != `popover-` + index && key != "search" && key != "mytable"){
          this.$refs[key] && this.$refs[key].doClose();
        }
      }
      this.$refs[`popover-`+index].doShow();
    },
    doClose(row, index){
      this.$refs[`popover-`+index].doClose()
    },
    handleClose(){
      this.setConFlag=false
    },
    setTableHeadStyle({ row, column, rowIndex, columnIndex }) {
      if (column.label == "分类") {
        if (columnIndex == 0) {
          this.$nextTick(() => {
            document
              .querySelector(`.${column.id}`)
              .setAttribute("colspan", "3");
            document
              .querySelector(`.el-table__fixed-header-wrapper.${column.id}`)
              .setAttribute("colspan", "3");
          });
        } else if (columnIndex == 1) {
          row[columnIndex].colspan = 0;
          return { display: "none" };
        } else if (columnIndex == 2) {
          row[columnIndex].colspan = 0;
          return { display: "none" };
        }
      }
      return {
        color: "#191919",
        background: "#F8F9FC",
        padding: "4px 0px",
      };
    },
    setDefaultForm() {
      this.$refs.search.form = {};
      const date = dayjs(new Date()).add(-1, "day");
      this.$set(this.$refs.search.form, "date", date);
      this.$refs.search.form["start_at--end_at"] = [
        dayjs(new Date()).add(-1, "day").startOf("day"),
        dayjs(new Date()).add(-1, "day").endOf("day"),
      ];
    },
    actionSearch(form) {
      console.log("196", form);
    },
    // table 一级表头
    getTableColumn(table, allColumns, columnsDesc) {
      console.log("table", table);
      console.log("allColumns", allColumns);
      console.log("columnsDesc", columnsDesc);

      let columnDic = {};
      if (allColumns.length == columnsDesc.length) {
        for (let i = 0; i < allColumns.length; i++) {
          let key = allColumns[i];
          columnDic[key] = columnsDesc[i];
        }
      }
      for (let item of table) {
        let subColumns = [];
        switch (item.prop) {
          case "PROD_MODE2": {
            subColumns = ["aaa", "bbb"];
            break;
          }
          default:
            break;
        }
        let columns = this.getSubColumns(
          subColumns,
          columnDic,
          allColumns,
          item.selected
        );
        if (item.columns.length == 0 || columns.some((v) => v.prop === "ccc")) {
          this.$set(item, "columns", columns);
        }
      }
    },
    getSubColumns(sectionColumns, columnDic, allColumns, selected) {
      let columns = [];
      let id = 0;
      for (const column of allColumns) {
        if (sectionColumns.includes(column)) {
          id++;
          let width = 120;
          let align = "left";
          if (["PROD_MODE2"].includes(column)) {
            width = 180;
            align = "right";
          }
          let obj = {
            prop: column,
            label: columnDic[column],
            selected: selected,
            minWidth: width,
            id: id,
            align: align,
          };
          columns.push(obj);
        }
      }
      return columns;
    },
    // ---------单层---------
    getTableColumnOne(columns, columnsDesc) {
      const columnObjArr = [];
      let columnArr = columns.split(",");
      let descArr = columnsDesc.split(",");
      columnArr.forEach((item, index) => {
        columnObjArr.push({
          selected: true,
          prop: item,
          label: descArr[index],
          minWidth: 120,
          align: "left",
          id: index + 1,
        });
      });
      return columnObjArr;
    },
    modifyData(list) {
      if (list) {
        for (let item of list) {
          [""].map((key) => {
            item[key] = [""].some((v) => v === key)
              ? this.$formatNumber(item[key], [""].includes(key) ? 4 : 2, 1)
              : this.$formatNumber(item[key], 2, 1);
          });
        }
      }
      return list || [];
    },
  },
};
</script>
<style lang="scss" scoped></style>
