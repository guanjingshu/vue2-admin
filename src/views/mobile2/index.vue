<template>
  <div id="busi-asset-products">
    <Tabs @switch-tab="switchTab" />
    <div class="container">
      <div v-show="tabName === '公司'">
        <LoadingWrap :isLoadiing="isLoading" :showPage="list.length > 0">
          <div
            class="mb12rem"
            v-for="(item, inde) in list"
            :key="item.BUSI_TYPE"
          >
            <Title
              :title="item.BUSI_TYPE"
              :img="getIcon(index, item.BUSI_TYPE)"
            ></Title>
          </div>
        </LoadingWrap>
      </div>
      <div v-show="tabName === '条线'">条线</div>
      <div v-show="tabName === '主责'">主责</div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import Tabs from "./components/Tabs.vue";
import LoadingWrap from "@/components/LoadingWrap.vue";
import Title from "./components/Title.vue";
import { Toast } from "vant";

const mappingIdCfg = {
  公司: "1",
  条线: "2",
  主责: "3",
};

export default {
  name: "Mobile2",
  components: {
    Tabs,
    LoadingWrap,
    Title,
  },
  data() {
    return {
      currentDate: dayjs(new Date()).add(-1, "day").toDate(),
      tabName: "公司",
      levelInfo0: { name: "至四级", level: 4 },
      levelInfo1: { name: "至四级", level: 4 },
      levelInfo2: { name: "至四级", level: 4 },
      isLoading: false,
      list: [],
      columns: [[], [], []],
      list2: [],
      columns2: [[], [], []],
      list3: [],
      columns3: [[], [], []],
      companyList: [],
      lineParams: {
        show_mode: "all",
        imgr_dept: "",
        imgr_dept: "",
        imgr_line: "",
        six_track: [],
      },
      managerParams: {
        show_mode: "all",
        six_track: "",
        imgr_name: [],
      },
    };
  },
  watch: {},
  computed: {
    chooseDateStr() {
      return dayjs(this.currentDate).format("M/DD");
    },
    params() {},
  },
  created() {
    this.tabName = this.$route.params.type ?? "公司";
  },
  methods: {
    filterChange(params) {
      if (this.tabName === "条线") {
        this.lineParams = params.show_mode;
        this.getData();
      } else if (this.tabName === "主责") {
        this.managerParams = params.show_mode;
        this.getData();
      }
    },
    getParams(tabName) {
      if (tabName === "公司") {
        return {
          mapping_id: mappingIdCfg[tabName],
          date: dayjs(this.currentDate).format("YYYY-MM-DD"),
          pen_lines: "穿透前",
          tab_name: "业务资产分类",
          level: this.levelInfo0.level,
        };
      } else if (tabName === "条线") {
        return {
          mapping_id: mappingIdCfg[tabName],
          date: dayjs(this.currentDate).format("YYYY-MM-DD"),
          pen_lines: "穿透前",
          tab_name: "业务资产分类",
          level: this.levelInfo1.level,
        };
      } else if (tabName === "主责") {
        return {
          mapping_id: mappingIdCfg[tabName],
        };
      }
    },
    pickDay(val) {
      this.currentDate = val;
      this.getData();
    },
    getIcon(index, name) {
      if (index === 0) {
        return require(`@/assets/404_images/404.png`);
      } else {
        return require(`@/assets/404_images/404.png`);
      }
    },
    switchTab(name, title) {
      setTimeout(() => {
        this.tabName = name;
      }, 0);
    },
    async getData() {
      try {
        this.isloading = true;
        let res = {};
        res = await getSoaData(this.getParams("公司"));
        this.list = res.list;
        this.columns[0] = this.getTableColumn(
          "公司",
          res.columns.split(","),
          res.columns_desc.split(","),
          0
        );
        this.columns[1] = this.getTableColumn(
          "公司",
          res.columns.split(","),
          res.columns_desc.split(","),
          1
        );
        this.columns[2] = this.getTableColumn(
          "公司",
          res.columns.split(","),
          res.columns_desc.split(","),
          2
        );
        res = {};
        res = await getSoaData(this.getParams("条线"));
        this.list2 = res.list;
        this.columns2[0] = this.getTableColumn(
          "条线",
          res.columns.split(","),
          res.columns_desc.split(","),
          0
        );
        this.columns2[1] = this.getTableColumn(
          "条线",
          res.columns.split(","),
          res.columns_desc.split(","),
          1
        );
        this.columns2[2] = this.getTableColumn(
          "条线",
          res.columns.split(","),
          res.columns_desc.split(","),
          2
        );
        res = {};
        res = await getSoaData(this.getParams("主责"));
        this.list3 = res.list;
        this.columns3[0] = this.getTableColumn(
          "主责",
          res.columns.split(","),
          res.columns_desc.split(","),
          0
        );
        this.columns3[1] = this.getTableColumn(
          "主责",
          res.columns.split(","),
          res.columns_desc.split(","),
          1
        );
        this.columns3[2] = this.getTableColumn(
          "主责",
          res.columns.split(","),
          res.columns_desc.split(","),
          2
        );
      } catch (error) {
        this.isloading = false;
        this.list = [];
        this.columns = [[], [], []];
        this.list2 = [];
        this.columns2 = [[], [], []];
        this.list3 = [];
        this.columns3 = [[], [], []];
      } finally {
        this.isloading = false;
      }
    },
    showTips(typeIndex) {
      if (this.tabName === "公司") {
        if (typeIndex === 0) {
          Toast(this.columns[typeIndex][0].tips);
        }
      }
    },
    getTableColumn(tabName, allcolumns, columns_desc, typeIndex) {
      const kvMap = {
        赛道: "BUSI_TYPE",
        分类: "BUSI_TYPE",
        当前日期数据: "AMOUNT1",
        较上一工作日: "AMOUNT2",
        较上周末: "AMOUNT5",
        较上月末: "AMOUNT3",
        较上年末: "AMOUNT4",
      };
      let columns = [];
      if (tabName === "公司") {
        let singleLayer = [
          "赛道",
          "当前日期数据",
          "较上一工作日",
          "较上周末",
          "较上月末",
          "较上年末",
        ];
        return singleLayer.map((item, index) => {
          return {
            selected: true,
            label: label === "当前日期数据" ? this.chooseDateStr : label,
            prop: kvMap[label],
            minWidth: 100,
          };
        });
      } else if (tabName === "条线" || tabName === "主责") {
        const columnsList = allcolumns.map((prop, index) => {
          const [parentLabel, subLabel] = columns_desc[index].split("|");
          return {
            prop: prop,
            fullLabel: columns_desc[index],
            parentLabel: parentLabel,
            subLabel: subLabel,
          };
        });

        const levelOneColumns = new Set();
        columns_desc.forEach((label) =>
          levelOneColumns.add(label.split("|")[0])
        );
        return [...levelOneColumns].map((parentLabel) => {
          return {
            prop: parentLabel,
            label: parentLabel,
            align: "center",
            // columns: [],
            minWidth: 100,
            selected: true,
            columns: columnsList
              .filter((item) => item.parentLabel === parentLabel)
              .map((column) => {
                return {
                  selected: true,
                  label: column.subLabel,
                  prop: column.prop,
                  minWidth: 100,
                };
              }),
          };
        });
      }
    },
    modifyDate() {
      if (Array.isArray(list)) {
        if (this.tabName === "公司") {
          return list.map((row) => {
            return Object.fromEntries(
              Object.entries(row).map((kv) => {
                const [key, value] = kv;
                let newVal = value;
                if (
                  [
                    "AMOUNT1",
                    "AMOUNT2",
                    "AMOUNT3",
                    "AMOUNT4",
                    "AMOUNT5",
                    "AMOUNT9",
                  ].includes(key)
                ) {
                  newVal = this.$formatNumber(value, 2, 1);
                }
                return [key, newVal];
              })
            );
          });
        } else if (this.tabName === "条线" || this.tabName === "主责") {
          return list.map((row) => {
            return Object.fromEntries(
              Object.entries(row).map((kv) => {
                const [key, value] = kv;
                let newVal = value;
                if (key.includes("|")) {
                  newVal = this.$formatNumber(value, 2, 1);
                }
                return [key, newVal];
              })
            );
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
