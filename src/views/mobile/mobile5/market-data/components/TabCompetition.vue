<template>
  <div class="container">
    <div class="content">
      <DateWrapper
        v-model="currentDate"
        @select-day="getData"
        fromatter="YYYY-MM"
      />
      <van-loading>
        {{ "加载中..." }}
      </van-loading>
      <template>
        <TopSwitch
          :style="{ 'margin-top': '10px' }"
          v-model="activeTabIndex"
        ></TopSwitch>
        <div v-show="parseInt(activeTabIndex) === 0" class="shadow-top">
          <BottomRank
            v-show="rankData.length > 0"
            :table-column="rankTableColumn"
          />
            <div class="rank-box">
                <Date-Table
                    ref="rankTable"
                    :table-columns="tableColumn"
                    :table-data="tableDataFilterNull"

                 />
            </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { tableColumn, rankTableColumn } from "../tableColumn";
import TopSwitch from "./TopSwitch.vue";
import DateWrapper from "@/views/components/company/DateWrapper.vue";
import BottomRank from "./BottomRank.vue";
import DateTable from "./DateTable.vue";
import dayjs from "dayjs";
export default {
  name: "TabCompetition",
  components: {
    DateWrapper,
    TopSwitch,
    BottomRank,
    DateTable
  },
  computed: {
    tableDataFilterNull(){
        const cfg = [
            'TOTAL_AMT_LAST_DATE',
            'NEW_PD_LAST_DATE',
            'CRRC_LAST_DATE',
            'NOT_CRRC_LAST_DATE',
        ]
        const column = cfg[this.activeTabIndex];
        return this.tableData.filter(item => item[column] !== '-');

    },
    tableColumn(){
        const columns = tableColumn[this.activeTabIndex];
        if(this.activeTabIndex.toString() === '0') {
            columns[1].label = this.columnDescArr[1];//日期字段特殊处理

        }else{
            // columns[1].label = this.columnDescArr[4 * this.activeTabIndex];//日期字段特殊处理

        }
        return columns;
    },
    rankTableColumn() {
      const columns = JSON.parse(JSON.stringify(rankTableColumn[this.activeTabIndex]));
      if(this.activeTabIndex.toString() === '0') {
        columns[1].label = this.columnDescArr[1];//日期字段特殊处理
      } else {
        //   columns[1].label = this.columnDescArr[4 * this.activeTabIndex];//日期字段特殊处理

      }
      return columns;
    },
  },
  data() {
    return {
      currentDate: dayjs(new Date()).add(-1, "day").toDate(),
      activeTabIndex: 0,
      rankData: [{}],
      tableData: [],
      columnDescArr: ['a','2024-12-13']
    };
  },
  methods: {
    getData() {
      console.log(this.currentDate);
    },
  },
};
</script>
