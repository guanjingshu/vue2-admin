<template>
  <!-- id="image"添加这个id即可出现水印 -->
  <!-- <SetWaterMark> -->

  <div class="dashboard-container relative">
    <div class="rowgrid">
    <!-- {{activeName}} -->
      <StageTab v-for="(item, index) in tabsList" :key="item.index" 
      :actived="item.index === activeName" 
      :canClick="index > 0"
      :whichTab="item.tableName"
      @click="chooseStage(item.index)" />
    </div>
    <div>
      <ComWrap :isOpen="isOpen">
      <!-- {{currComponent}} -->
        <component :is="currComponent" />
      </ComWrap>
    </div>
    <!-- echarts图演示 -->
    <!-- <el-radio-group v-model="lineType" size="mini">
      <el-radio-button v-if="isBaphd" label="1行2列"></el-radio-button>
      <el-radio-button label="2行2列"></el-radio-button>
    </el-radio-group>
    <div v-if="lineType == '1行2列'">
      <Performance />
    </div>
    <div v-if="lineType == '2行2列'">
      <Performance2 />
    </div> -->
    <!-- echarts图演示 end -->
  </div>
  <!-- </SetWaterMark> -->
</template>

<script>
import { getExportData } from "@/utils/exportExcel";
import { mapGetters } from "vuex";
import { getWaterMark } from "@/utils";
import SetWaterMark from "@/components/SetWaterMark";
import PublicStructure from "@/components/PublicStructure";
import Performance from "./Card/Performance.vue";
import Performance2 from "./Card/Performance2.vue";
import StageTab from "./components/StageTab.vue";
import ComWrap from "./components/ComWrap.vue";
import Plan from "./Stage/Plan/index.vue";
import Create from "./Stage/Create/index.vue";
import Run from "./Stage/Run/index.vue";
import NearExpired from "./Stage/NearExpired/index.vue";
import Expired from "./Stage/Expired/index.vue";
import { isBaphd } from "@/utils";
import dayjs from "dayjs";
export default {
  name: "Dashboard",
  components: {
    SetWaterMark,
    PublicStructure,
    Performance,
    Performance2,
    StageTab,
    ComWrap,
    Plan,
    Create,
    Run,
    NearExpired,
    Expired,

  },

  computed: {
    currComponent() {
      return this.tabsList.find(item => item.index === this.activeName)?.componentName ?? null
    },
    isOpen(){
      return !!this.tabsList.find(item => item.index === this.activeName)?.isOpen
    },
    ...mapGetters({
      name: "name",
      iconsAll: "icons",
    }),
    icons() {
      return this.iconsAll.filter((menu) => menu.type === this.currType);
    },
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
        style.left = "100px";
      } else if (this.selectedTabIndex == 2) {
        style.width = "100px";
        style.left = "200px";
      }
    },
    tabMoveLineStyles() {
      let style = {
        top: "10px",
        height: "40px",
        backgroundImage:
          "linear-gradient(270deg, rgba(0, 171, 254, 0) 0%, #0072fc 100%)",
      };
      if (this.selectedTabIndex == 0) {
        style.width = "100px";
        style.left = "0";
      } else if (this.selectedTabIndex == 1) {
        style.width = "100px";
        style.left = "100px";
      } else if (this.selectedTabIndex == 2) {
        style.width = "100px";
        style.left = "200px";
      }
    },
  },
  created() {
    let date = dayjs(new Date()).add(-1, "day").format("YYYYMMDD");
    this.formData.date = date;
  },
  mounted() {
    console.log(
      "this.$formatNumber(1589992.365487,2,1)",
      this.$formatNumber("1589992.365487", 2, 1)
    );
    this.$nextTick(() => {
      // this.$set(this.$refs.search.form, "is_bot", "test");
      // this.getImage()
      // this.getTableColumn(
      //   this.columns.split(","),
      //   this.columns_desc.split(",")
      // );
    });
    // this.setDefaultForm()
  },
  data() {
    return {
      tabsList: [
        { tableName: "合计", index: "0", imgSrc: require("@/images/zz.png") },
        { tableName: "Plan", index: "1", imgSrc: require("@/images/zz.png"), imgSrcActivated: require("@/images/zz.png"),componentName:Plan,isOpen: true },
        { tableName: "Create", index: "2", imgSrc: require("@/images/zz.png"), imgSrcActivated: require("@/images/zz.png"),componentName:Create,isOpen: true },
        { tableName: "Expired", index: "3", imgSrc: require("@/images/zz.png"), imgSrcActivated: require("@/images/zz.png"),componentName:Expired,isOpen: true },
        { tableName: "Run", index: "4", imgSrc: require("@/images/zz.png"), imgSrcActivated: require("@/images/zz.png"),componentName:Run,isOpen: true },
        { tableName: "NearExpired", index: "5", imgSrc: require("@/images/zz.png"), imgSrcActivated: require("@/images/zz.png"),componentName:NearExpired,isOpen: true },

        
      ],
      activeName: "5",
      lineType: "1行2列",
      isBaphd: isBaphd(),
      pageInfo: {
        page_num: 1,
        page_size: 1,
        total: 6,
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
      tabImages: ["tab1", "tab2", "tab3"],
      tabs: ["公司", "事业", "主责"],
      selectTabIndex: 0,
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
    chooseStage(index){
      this.activeName = index
    },
    tabChange(item, index) {
      this.selectTabIndex = index;
    },
    actionPage(item) {
      if (item.title == "产品日报") {
        this.$router.push({ name: "Mobile2" });
      }
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
            sortable: "custom",
            tooltip: { show: true, content: "test" },
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
              sortable: "custom",
              tooltip: { show: true, content: "test" },
              columns: [
                {
                  label: column.label,
                  selected: true,
                  prop: column.prop,
                  sortable: "custom",
                  tooltip: { show: true, content: "test" },
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
                sortable: "custom",
                tooltip: { show: true, content: "test" },
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
          sortable: "custom",
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
      let result = getExportData(
        this.tableColumns,
        this.tableData,
        "title",
        ["title"],
        []
      );
      this.$refs.search.startExport(result);
    },
  },
};
</script>

<style lang="scss" scoped>
.rowgrid {
  display: grid;
  grid-gap: 0px 12px;
  grid-template-columns: auto auto auto auto auto auto;
}
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
