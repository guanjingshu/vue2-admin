<template>
  <div class="app-container">
    <SearchPanel
      ref="search"
      :searchData="searchData"
      @actionSearch="actionSearch"
    />
    <div class="bcwhite relative">
    <TableSetting class="absolute" style="top:1px;right:1px;z-index:20" :tableColumnSetting="tableColumns"></TableSetting>
    <BbTable
      :table-column="tableColumns"
      :table-data="tableData"
      :rowSpans="rowSpans"
      :table-head-style="setTableHeadStyle"
    ></BbTable>
  </div>
  </div>
</template>
<script>
/**
 * 单层表头
 * 双层表头
 */
import { productColumns } from "./tableColumn.js";
import dayjs from "dayjs";
export default {
  name: "Table1",
  data() {
    return {
      searchData: [
        { name: "date", inputType: "date" },
        {
          inputType: "mutiSelectLazyLoad",
          // data:[{id:2001,label:'子产品代码,父产品代码,产品全称,父产品简称,子产品简称',
          // list:[{id:3001,label:'A181A4853,A181A4853,中信理财,中信理财,乐赢纯债半年开'},
          //   {id:3002,label:'A181A4853,A181A4853,中信理财,中信理财,乐赢纯债半年开'},
          //   {id:3003,label:'A181A4853,A181A4853,中信理财,中信理财,乐赢纯债半年开'},
          //   {id:3004,label:'A181A4853,A181A4853,中信理财,中信理财,乐赢纯债半年开'},
          //   {id:3005,label:'A181A4853,A181A4853,中信理财,中信理财,乐赢纯债半年开'},
          //   {id:3006,label:'A181A4853,A181A4853,中信理财,中信理财,乐赢纯债半年开'},
          //   {id:3007,label:'A181A4853,A181A4853,中信理财,中信理财,乐赢纯债半年开'},
          //   {id:3008,label:'A181A4853,A181A4853,中信理财,中信理财,乐赢纯债半年开'},
          //   {id:3009,label:'A181A4853,A181A4853,中信理财,中信理财,乐赢纯债半年开'},
          // ]}],
          data: [
            {
              id: 3001,
              label: "A181A4851,A181A4853,中信理财,中信理财,乐赢纯债半年开",
            },
            {
              id: 3002,
              label: "A181A4852,A181A4853,中信理财,中信理财,乐赢纯债半年开",
            },
            {
              id: 3003,
              label: "A181A4853,A181A4853,中信理财,中信理财,乐赢纯债半年开",
              name: "chrem_prod_id",
            },
            {
              id: 3004,
              label: "A181A4854,A181A4853,中信理财,中信理财,乐赢纯债半年开",
              name: "chrem_prod_id",
            },
            {
              id: 3005,
              label: "A181A4855,A181A4853,中信理财,中信理财,乐赢纯债半年开",
              name: "chrem_prod_id",
            },
            {
              id: 3006,
              label: "A181A4856,A181A4853,中信理财,中信理财,乐赢纯债半年开",
              name: "chrem_prod_id",
            },
            {
              id: 3007,
              label: "A181A4857,A181A4853,中信理财,中信理财,乐赢纯债半年开",
              name: "chrem_prod_id",
            },
            {
              id: 3008,
              label: "A181A4858,A181A4853,中信理财,中信理财,乐赢纯债半年开",
              name: "chrem_prod_id",
            },
            {
              id: 3009,
              label: "A181A4859,A181A4853,中信理财,中信理财,乐赢纯债半年开",
              name: "chrem_prod_id",
            },
          ],
        },
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
    // 单行合并同类项（表头）
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
    // 获取单行表头
    getTableColumnOneRow(
      allColumns,
      columnsDes,
      ColumnAligns = [],
      tableName = ""
    ) {
      let table = [];
      for (let i = 0; i < allColumns.length; i++) {
        let newItem = {};
        newItem.prop = allColumns[i];
        newItem.label = columnsDes[i];
        newItem.selected = true;
        newItem.minWidth = 120;
        if (allColumns.length == ColumnAligns.length) {
          newItem.align = ColumnAligns[i];
        }
        table.push(newItem);
      }
    },
    modifyData(list) {//改变原数组的方式
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
    modifyData2(list) {//不改变原数组的方式
      if (Array.isArray(list)) {
        return list.map((row) => {
          return Object.fromEntries(
            Object.entries(row).map((kvArr) => {
              const [field, fieldValue] = kvArr;
              if (field === "INS_NAME") {
                return [field, fieldValue];
              } else if (["NEW_PD_PCT"].includes(field)) {
                // 占比
                const val = this.$formatNumber(fieldValue, 2, 1);
                return [field, val === "-" ? "-" : `${val}%`];
              }else{
                return [field, this.$formatNumber(fieldValue, 2, 1)];
              }
            })
          );
        });
      }
      return list || [];
    },
  },
};
</script>
<style lang="scss" scoped></style>
