<template>
  <!-- id="image"添加这个id即可出现水印 -->
  <!-- <SetWaterMark> -->
  <div class="dashboard-container">
    <!-- {{ common_query }}
    {{ tableColumnsFour }} -->
    <!-- ---------------移动端首页------------------ -->
    <!-- 头部结构 blue-bg-->
    <!-- <div class="rowbetween header-top">
      <div class="">左侧</div>
      <div>
        <div class="rowstart aligncenter">
          <div>右侧</div>
          <img
            style="width: 40px; height: 40px"
            :src="require(`@/images/zz.png`)"
          />
        </div>
      </div>
    </div> -->

    <!-- <div class="relative">
    <img class="absolute" :style="tabSelectStyles" :src="require('@/images/zz.png')" />
  </div> -->
    <!-- 导航栏 -->
    <!-- <div class="tit_con_wrap">
      <ul class="tab_tit">
        <li
          v-for="(item, index) in lists"
          :key="index"
          :class="n == index ? 'active' : ''"
          :style="{ color: item.color }"
          @click="tabTit(index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div> -->
    <!-- 导航栏下展示内容 -->
    <!-- <div v-for="(item, index) in icons" :key="index" class="tagsItem">
      <img
        style="width: 40px; height: 40px"
        :src="require(`@/images/${item.icon}.png`)"
      />
      <div v-html="getTitle(item.title)"></div>
    </div> -->
    <!-- 基础结构 -->
    <!-- <PublicStructure :list="list"></PublicStructure> -->

    <!-- ---------------移动端首页end------------------ -->
    <div class="dashboard-text">name: {{ name }}</div>
    <el-button @click="importFn('销售归属配置导入')">导入</el-button>
    <SearchPanel
      ref="search"
      :searchData="searchData"
      @sameDay="onSameDay"
      @actionSearch="actionSearch"
    />
    <!-- <TableSetting :tableColumnSetting="tableColumns"></TableSetting>  :noOperation="true"-->
    <BbTable
      ref="BbTable"
      :table-column="tableColumnsFour"
      :table-data="tableData"
      :table-head-style="setTableHeadStyle"
      :cell-style="(params) => cellStyle(params, '01')"
      
      :SortChangeFn="actionSortChange"
      :showPage="true"
      :pageInfo="pageInfo"
    >
      <!-- <template slot-scope="row">
        <div class="table_btns">
          <el-popover
            popper-class="del-popover"
            trigger="manual"
            placement="top"
            width="210"
            :ref="`popover-${row.index}`"
          >
            <div class="delete_con">
              <div class="tips">
                <i class="el-icon-info" color="#ffab00"></i>确定删除这行数据？
              </div>
              <div class="btns">
                <div class="cancel" @click="cancel(row.row, row.$index)">
                  取消
                </div>
                <div class="confirm" @click="confirm(row.row, row.$index)">
                  确定
                </div>
              </div>
            </div>
            <el-button
              slot="reference"
              size="mini"
              @click="del(row.row, row.index)"
              >删除</el-button
            >
          </el-popover>
        </div>
      </template> -->
    </BbTable>
    <!-- <p v-for="(item,index) in 100" :key="index">111</p> -->
    <!-- <Calendar /> -->
    <importConfigGuration v-if="setimportConfigGuration" :setConFlag="setimportConfigGuration" @setting="handleimportConfigGuration"></importConfigGuration>
  </div>
  <!-- </SetWaterMark> -->
</template>

<script>
import { getExportData } from "@/utils/exportExcel.js";
import { mapGetters, mapState } from "vuex";
import { getWaterMark } from "@/utils";
import SetWaterMark from "@/components/SetWaterMark";
import PublicStructure from "@/components/PublicStructure";
import Calendar from "./componets/calendar";
import dayjs from "dayjs";
import { roundDecimal } from "@/utils/arrOperation.js";
import mixinTable from "./componets/mixinTable";

import importConfigGuration from "./componets/importConfigGuration.vue";
export default {
  name: "Dashboard",
  mixins: [mixinTable],
  components: {
    SetWaterMark,
    PublicStructure,
    Calendar,
    importConfigGuration
  },
  watch: {
    tableColunm: {
      handler(val) {
        this.$nextTick(() => {
          console.log(
            "127---this.$refs.BbTable.$ref.xyTable",
            this.$refs.BbTable.$ref.xyTable
          );
          // this.$refs.BbTable.$ref.xyTable.doLayout()
        });
      },
      // immediate:true
    },
  },
  computed: {
    ...mapGetters({
      name: "name",
      iconsAll: "icons",
    }),
    ...mapState({
      common_query: (state) => state.common.common_query,
    }),
    icons() {
      return this.iconsAll.filter((menu) => menu.type === this.currType);
    },
  },
  created() {
    let date = dayjs(new Date()).add(-1, "day").format("YYYYMMDD");
    this.formData.date = date;
  },
  mounted() {
    this.getColumnsFour();
    this.$nextTick(() => {
      this.$nextTick(() => {
        console.log("roundDecimal(0.0000566)", roundDecimal("0.0000566"));
        // console.log("127---this.$refs.BbTable.$ref.xyTable",this.$refs.BbTable.$refs.xyTable)
      });
    });

    // console.log(
    //   "this.$formatNumber(1589992.365487,2,1)",
    //   this.$formatNumber("1589992.365487", 2, 1)
    // );
    this.$nextTick(() => {
      this.$set(this.$refs.search.form, "is_bot", "test");

      // this.getImage()
      this.getTableColumn(
        this.columns.split(","),
        this.columns_desc.split(",")
      );
      this.setDefaultForm();
    });
  },
  beforeDestroy() {
    this.$store.commit("common/SET_COMMON_QUERY", {}); //清空查询条件
  },
  deactivated() {
    this.$store.commit("common/SET_COMMON_QUERY", {}); //清空查询条件
  },
  data() {
    return {
      setimportConfigGuration: false,
      pageInfo: {
        page_num: 1,
        page_size: 1,
        total: 6,
        combinedColumnCount: 0,
      },
      testData: [],
      searchData: [
        //查询条件配置

        // { name: "is_bot", inputType: "mutiSelect", data: [{ label: "test", value: "test" },{ label: "test", value: "test" }] },
        // { name: "tongji", inputType: "searchselect", placeholder: "统计",list:[{title:'规模',label:'规模'},{title:'规模1',label:'规模1'},{title:'规模2',label:'规模2'}],defaultValue: "规模" },
        // {
        //   name: "test1",
        //   inputType: "select",
        //   tips: "注意小狗",
        //   list: [
        //     { label: "test", value: "test" },
        //     { label: "test1", value: "test1" },
        //   ],
        // },
        // {label:"展示已到期产品", name: "expired", inputType: "checkbox", disabled: false },
        // { name: "is_bot", inputType: "input", content: "test" },
        // {name:'date',inputType:'date'},
        { name: "start_at--end_at", content: "test", inputType: "daterange" },

        // {id:100510,label:"是否包含0份额产品",placeholder:'是否包含0份额产品',name: "container", inputType: "select",tips:'是否包含0份额产品' ,list: [
        //   {id:2511,name:'contain',value:'1',label: "是包含0份额产品"},{id:2512,name:'contain',value:'2',label: "否包含0份额产品"}
        // ] },
      ],
      currType: "产品",

      lists: [
        { name: "产品", color: "#646566" },
        { name: "资产", color: "#646566" },
        { name: "客户", color: "#646566" },
        { name: "考核", color: "#646566" },
        { name: "风控", color: "#C8c9cc" },
      ],
      userName: "111",
      tableColumns: [
        {
          prop: "date",
          label: "日期",
          width: "180",
          align: "center",
          // sortable: true,
          fixed: false,
          showOverflowTooltip: true,
          type: "left",
        },
        {
          prop: "name",
          label: "姓名",
          width: "180",
          align: "center",
          // sortable: true,
          fixed: false,
          showOverflowTooltip: true,
          type: "left",
        },
        {
          prop: "address",
          label: "地址",
          width: "180",
          align: "center",
          // sortable: true,
          fixed: false,
          showOverflowTooltip: true,
          type: "left",
        },
        {
          prop: "left",
          label: "左侧",
          width: "180",
          align: "center",
          // sortable: true,
          fixed: false,
          showOverflowTooltip: true,
          type: "left",
        },
        {
          prop: "right",
          label: "右侧",
          width: "180",
          align: "center",
          // sortable: true,
          fixed: false,
          showOverflowTooltip: true,
          type: "left",
        },
      ],
      columns:
        "FIR_LEVEL,FIR_LEVEL,累计服务客户|CLI_NUM,累计服务客户|CLI_PRO,累计服务客户|CLI_N",
      columns_desc:
        "地域分类,地域分类,累计服务客户|客户数,累计服务客户|客户数占比,累计服务客户|较上年末",
      combinedColumnCount: 0,
      tableData: [
        {
          FIR_LEVEL: 1,
          FIR_LEVEL: 1,
          "累计服务客户|CLI_NUM": 1,
          "累计服务客户|CLI_PRO": 2,
          "累计服务客户|CLI_N": 3,
        },
        {
          FIR_LEVEL: 1,
          FIR_LEVEL: 1,
          "累计服务客户|CLI_NUM": 1,
          "累计服务客户|CLI_PRO": 2,
          "累计服务客户|CLI_N": 3,
        },
        {
          FIR_LEVEL: 1,
          FIR_LEVEL: 1,
          "累计服务客户|CLI_NUM": 1,
          "累计服务客户|CLI_PRO": 2,
          "累计服务客户|CLI_N": 3,
        },
        {
          FIR_LEVEL: 1,
          FIR_LEVEL: 1,
          "累计服务客户|CLI_NUM": 1,
          "累计服务客户|CLI_PRO": 2,
          "累计服务客户|CLI_N": 3,
        },
        {
          FIR_LEVEL: 1,
          FIR_LEVEL: 1,
          "累计服务客户|CLI_NUM": 1,
          "累计服务客户|CLI_PRO": 2,
          "累计服务客户|CLI_N": 3,
        },
        {
          FIR_LEVEL: 1,
          FIR_LEVEL: 1,
          "累计服务客户|CLI_NUM": 1,
          "累计服务客户|CLI_PRO": 2,
          "累计服务客户|CLI_N": 3,
        },
      ],
      n: 0,
      selectedTabIndex: 0,
      list: [
        {
          dt_snap: "",
          sta_type: "产品规模(亿)",
          amount1: "123456.123456",
          amount2: "11",
          amount3: "",
          amount4: "",
          amount5: "",
          amount6: "",
          amount7: "",
          amount8: "",
          amount9: "",
          amount10: "",
          amount11: "",
          amount12: "",
        },
      ],
      formData: { expired: false },
    };
  },
  methods: {
    handleimportConfigGuration() {
      this.setimportConfigGuration = true;
    },
    importFn(){
      this.setimportConfigGuration = true;

    },
    actionPageChange(pageInfo) {
      let param = { mapping_id: "100000", ...this.formData, ...this.pageInfo };
      delete param["total"];
      this.getData(param);
    },
    onSameDay() {},
    setDefaultForm() {
      this.$refs.search.form = {};
      const date = dayjs(new Date()).add(-1, "day");
      this.$set(this.$refs.search.form, "date", date);

      this.$refs.search.form["start_at--end_at"] = [
        dayjs(new Date()).add(-1, "day").startOf("day"),
        dayjs(new Date()).add(-1, "day").endOf("day"),
      ];
    },
    test() {
      let searchList = [
        { label: "test", value: "test" },
        { label: "test1", value: "test1" },
      ];
      let c = searchList.find((item) => item.value == "test1");
      let c1 = searchList.find((item) => item.value == "test");
      this.testData = [c, c1];
    },
    actionSearch(form) {
      console.log("196", form);
    },
    actionSortChange({ prop, order }) {
      this.getData({
        order: `${prop} ${order === "ascending" ? "asc" : "desc"}`,
      });
    },
    del(row, index) {
      for (const key in this.$refs) {
        if (key != `popover-` + index && key != "search" && key != "mytable") {
          this.$refs[key] && this.$refs[key].doClose();
        }
        console.log("201", `popover-` + index);
        this.$refs[`popover-` + index].doShow();
      }
      // this.$refs['popoverD'].doShow()
    },
    confirm() {},
    cancel() {},
    tabSelectStyles() {
      let style = {
        top: "-10px",
        height: "40px",
      };
      if (this.selectedTabIndex == 0) {
        style.width = "100px";
        style.left = "0";
      } else if (this.selectedTabIndex == 1) {
        style.width = "100px";
        style.left = "0";
      } else if (this.selectedTabIndex == 2) {
        style.width = "100px";
        style.left = "0";
      }
    },
    getTitle(title) {
      return title.length > 4
        ? title.slice(0, 4) + "<br/>" + title.slice(4)
        : title;
    },
    tabTit(val) {
      if (this.lists[val].color == "#C8c9cc") {
        return;
      }
      this.n = val;
      this.currType = this.lists[this.n].name;
      sessionStorage.setItem("secondTab", this.currType);
    },
    setTableHeadStyle({ row, column, rowIndex, columnIndex }) {
      // console.log("rowIndex", rowIndex);
      // console.log("columnIndex", columnIndex);
      // console.log("row", row);
      // console.log("column", column);

      const borderStyle = [
        "#6C6CA7",
        "#ED6A0C",
        "#009688",
        "#F44336",
        "#FF9800",
        "#9C27B0",
        "#03A9F4",
        "#8BC34A",
        "#FF5722",
        "#795548",
        "#9E9E9E",
        "#607D8B",
        "#00BCD4",
      ];

      if (this.combinedColumnCount > 1) {
        let twoArr = ["销售机构", "地域分类1"];
        if (twoArr.includes(column.label)) {
          if (rowIndex === 0) {
            this.$nextTick(() => {
              document
                .querySelectorAll(`.${column.id}`)
                .forEach((node) => node.setAttribute("rowspan", "2"));

              document
                .querySelectorAll(`.${row.id}`)
                .forEach((node) => node.setAttribute("colspan", "2"));
            });
          } else if (rowIndex === 1) {
            row[columnIndex].rowspan = 0;
            document
              .querySelectorAll(`.${row.id}`)
              .forEach((node) => node.setAttribute("colspan", "2"));
            return {
              display: "none",
            };
          } else {
          }
        }
      }

      if (rowIndex === 0) {
        return {
          color: "#191919",
          background: "#F8F9FC",
          padding: "4px 0",
          borderTop: `1px solid ${borderStyle[columnIndex]}`,
        };
      } else if (rowIndex === 1) {
        return {
          color: "#191919",
          background: "#F8F9FC",
          padding: "4px 0",
        };
      }

      // return {
      //   color: "#191919",
      //   background: "#F8F9FC",
      //   padding: "4px 0",
      // };
    },
    getTableColumnOneRow(
      allcolumns,
      columnsDesc,
      ColumnAligns = [],
      tableName = ""
    ) {
      let table = [];
      for (let i = 0; i < allcolumns.length; i++) {
        let newItem = {};
        newItem.label = columnsDesc[i];
        newItem.prop = allcolumns[i];
        newItem.selected = true;
        if (allcolumns.length == ColumnAligns.length) {
          newItem.align = ColumnAligns[i];
        }
        table.push(newItem);
      }
      return table;
    },
    getTableColumn(allcolumns, columnsDesc) {
      const allColumnsList = allcolumns.map((propInfo, index) => {
        const desInfo = columnsDesc[index];
        if (propInfo.includes("|")) {
          const [parentLabel, label] = desInfo.split("|");
          return {
            parentLabel,
            prop: propInfo,
            label,
            tooltip: { show: true, content: "test" },
          };
        } else {
          return {
            parentLabel: "",
            prop: propInfo,
            label: desInfo,
            tooltip: { show: true, content: "test" },
          };
        }
      });
      console.log("108-allColumnsList", allColumnsList);
      // [
      //   {
      //       "parentLabel": "",
      //       "prop": "FIR_LEVEL",
      //       "label": "地域分类"
      //   },
      //   {
      //       "parentLabel": "",
      //       "prop": "SEC_LEVEL",
      //       "label": "地域分类"
      //   },
      //   {
      //       "parentLabel": "累计服务客户",
      //       "prop": "累计服务客户|CLI_NUM",
      //       "label": "客户数"
      //   },
      //   {
      //       "parentLabel": "累计服务客户",
      //       "prop": "累计服务客户|CLI_PRO",
      //       "label": "客户数占比"
      //   },
      //   {
      //       "parentLabel": "累计服务客户",
      //       "prop": "累计服务客户|CLI_N",
      //       "label": "较上年末"
      //   }
      // ]
      const columns = [];
      allColumnsList.forEach((column) => {
        if (column.parentLabel === "") {
          columns.push({
            label: column.label,
            selected: true,
            prop: column.prop,
            // sortable: "custom",
            // tooltip: { show: true, content: "test" },
          });
        } else {
          console.log(
            "columns.find(col => col.label === column.parentLabel)",
            columns.find((col) => col.label === column.parentLabel)
          );
          if (!columns.find((col) => col.label === column.parentLabel)) {
            console.log("148-col.label", columns);
            columns.push({
              label: column.parentLabel,
              selected: true,
              prop: "test" + Math.random(),
              // sortable: "custom",
              // tooltip: { show: true, content: "test" },
              columns: [
                {
                  label: column.label,
                  selected: true,
                  prop: column.prop,
                  // sortable: "custom",
                  // tooltip: { show: true, content: "test" },
                },
              ],
            });
          } else {
            columns
              .find((col) => col.label === column.parentLabel)
              .columns.push({
                label: column.label,
                selected: true,
                prop: column.prop,
                // sortable: "custom",
                // tooltip: { show: true, content: "test" },
              });
          }
        }
      });

      const combinedLabel = columns[0].label;
      this.combinedColumnCount = 0;
      columns.forEach((item) => {
        if (item.label === combinedLabel) {
          this.combinedColumnCount++;
        }
      });

      if (this.combinedColumnCount > 1) {
        const combineColumn = {
          label: combinedLabel,
          selected: true,
          content: "test",
          prop: columns[0].prop + Math.random(),
          // sortable: "custom",
          columns: columns.slice(0, this.combinedColumnCount).map((item) => {
            return { ...item };
          }),
        };

        this.tableColumns = [
          combineColumn,
          ...columns.slice(this.combinedColumnCount),
        ];
      } else {
        this.tableColumns = columns;
      }

      console.log("143", columns);
    },
    cellStyle({ row, column, rowIndex, columnIndex }, type) {
      const otherStyle = {};
      // ?.replaceAll(',','')

      if (column.property === "left") {
        const numVal = parseInt(row[column.property]);
        if (numVal > 0) {
          otherStyle.color = "#D40000";
        } else if (numVal < 0) {
          otherStyle.color = "#2DA641";
        }
      }
      // const numVal = parseInt(row[column.property])
      // if(numVal > 0){
      //   otherStyle.color = '#D40000'
      // }else if(numVal < 0){
      //   otherStyle.color = '#2DA641'
      // }

      return {
        borderBottom: "none",
        ...otherStyle,
      };
    },
    actionChangeOtherTableColumns(newColumns) {
      //供子组件使用的方法
      this.tableColumns = JSON.parse(JSON.stringify(newColumns));
    },
    async getImage() {
      const dom = document.getElementById("image");
      if (!document.getElementById("watermark_id")) {
        console.log("image");
        dom.appendChild(getWaterMark(dom, this.userName));
      }
    },
    exportExcel() {
      // let result = getExportData(this.tableColumns,this.tableData,'title',['title'],[]);
      let result = getExportData(
        this.tableColumns,
        this.tableData,
        "title",
        []
      );
      this.$refs.search.startExport(result);
    },
  },
};
</script>

<style lang="scss" scoped>
.del-popover {
  left: 1645px !important;
  padding: 0px !important;
}
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.blue-bg {
  background-image: url("~@/images/blue-bg.png");
  background-size: 100% 2.667rem;
  background-repeat: no-repeat;
}
.header-top {
  padding: 20px;
  border-radius: 8px;
  background-image: url("~@/images/topbg-big.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.tab_tit {
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  overflow-y: hidden;
  overflow-x: hidden;
}
.tit_con_wrap ul {
  background: #f4f5f7;
  padding: 10px;
  cursor: pointer;
}
.tit_con_wrap ul li {
  list-style: none;
  padding: 10px 20px;
  text-align: center;
  color: #646566;
}
.tit_con_wrap .active {
  color: #3537f3 !important;
  font-weight: 600;
  background: #fff;
  padding: 10px 20px;
}
.delete_con {
  .tips {
    text-align: center;
    margin-top: 13px;
    margin-bottom: 13px;
    font-size: 14px;
    color: #333;
    position: static;
    width: fit-content;
    i {
      color: #ffab00;
    }
  }
}
</style>
