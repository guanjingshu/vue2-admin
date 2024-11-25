<template>
  <div class="performance">
    <section class="grid-box">
      <div class="grid-item bcwhite py14 px20 bdright1 bdbottom1">
        <BarAndLine :barWidth="40" />
      </div>
      <div class="grid-item bcwhite py14 px20 bdright1 bdbottom1">
        <!-- <BarAndLine barColor="#a6d645" :barWidth="40"/> -->
        <BarGroup
          :dimensionsProp="dimensionsProp"
          :sourceProp="sourceProp"
          :seriesProp="seriesProp"
        />
      </div>
      <div class="grid-item bcwhite py14 px20 bdright1 bdbottom1">
        <Line2 :xAxisDataProp="xAxisDataProp" :seriesDataProp="seriesDataProp"  />
      </div>
      <div class="grid-item bcwhite py14 px20 bdright1 bdbottom1">
        <!-- <BarAndLine barColor="#A973df" :barWidth="40"/> -->
      </div>
      <div class="grid-item bcwhite py14 px20 bdright1 bdbottom1">
        <!-- <BarAndLine barColor="#faab0c" :barWidth="40"/> -->
      </div>
    </section>
  </div>
</template>
<script>
import BarAndLine from "../Chart/BarAndLine.vue";
import BarGroup from "../Chart/BarGroup.vue";
import Line2 from "../Chart/Line.vue";
// import { testData } from './data';
export default {
  name: "Performance",
  components: {
    BarAndLine,
    BarGroup,
    Line2
  },
  data() {
    return {
      dimensionsProp: [],
      sourceProp: [],
      seriesProp: [],

      xAxisDataProp:[],//line
      seriesDataProp:[],//line
      colors: {
        中信: "#1689FA",
        中信2: "#DF4545",
      },
    };
  },
  mounted() {
    //本地测试环境可以用这个，实际掉接口需要放在watch里面
    const testData = {
      中信: [
        { TYPE_MONS: "2024-01", TYPE_NUM: 10 },
        { TYPE_MONS: "2024-02", TYPE_NUM: 110 },
        { TYPE_MONS: "2024-03", TYPE_NUM: 210 },
        { TYPE_MONS: "2024-04", TYPE_NUM: 310 },
      ],
      中信2: [
        { TYPE_MONS: "2024-01", TYPE_NUM: 20 },
        { TYPE_MONS: "2024-02", TYPE_NUM: 120},
        { TYPE_MONS: "2024-03", TYPE_NUM: 220 },
        { TYPE_MONS: "2024-04", TYPE_NUM: 320 },
      ],
      中信3: [
        { TYPE_MONS: "2024-01", TYPE_NUM: 30 },
        { TYPE_MONS: "2024-02", TYPE_NUM: 130},
        { TYPE_MONS: "2024-03", TYPE_NUM: 230 },
        { TYPE_MONS: "2024-04", TYPE_NUM: 330 },
      ],
    };
    this.$nextTick(() => {
      this.$nextTick(() => {
        this.getBarGroupData(testData);
        this.getLineData(testData)
      });
      //   this.getBarGroupData(testData)
    });
  },
  methods: {
    getBarGroupData(data) {
      this.dimensionsProp = ["date"].concat(Object.keys(data));
      this.sourceProp = this.getsourceData(data);
      this.seriesProp = Object.keys(data).map((item, index) => ({
        type: "bar",
        barWidth: 20,
        itemStyle: { color: this.colors[item] },
      }));
    },
    getsourceData(data) {
    //   return Object.keys(data).reduce((acc,key)=>{
    //       const items = data[key].map(item => ({
    //           date:item.TYPE_MONS,
    //           [key]:item.TYPE_NUM
    //       }))
    //       return acc.concat(items)
    //   },[])//错了，这个只能处理一个柱子的情形
      return Object.keys(data).reduce((acc, key) => {
        data[key].forEach((item) => {
          let obj = acc.find((o) => o.date === item.TYPE_MONS);
          if (obj) {
            obj[key] = item.TYPE_NUM;
          } else {
            obj = { date: item.TYPE_MONS };
            obj[key] = item.TYPE_NUM;
            acc.push(obj);
          }
        });
        return acc;
      }, []);
    },

    getLineData(data) {
      this.xAxisDataProp = this.getAxisData(data);
      this.seriesDataProp = this.getSeriesData(data);
    },
    getAxisData(data) {
        return Array.from(
            new Set(
                Object.values(data).flatMap(items=> items.map(item => item.TYPE_MONS))
            )
        )
    },
    getSeriesData(data) {
        return Object.keys(data).map((key, index) => ({
            name: key,
            data: data[key].map(item => item.TYPE_NUM),
            itemStyle: { color: this.colors[key] },
            type: "line",
            emphasis: { focus: "series" },
            symbolSize:0
        }))
    }

  },
};
</script>

<style lang="scss" scoped>
.py14 {
  padding: 14px 0;
}
.px20 {
  padding: 0 20px;
}
.bdright1 {
  border-right: 1px solid #e1e4ea;
}
.bdbottom1 {
  border-bottom: 1px solid #e1e4ea;
}
.performance {
  .grid-box {
    display: grid;
    grid-gap: 0px 0px;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    .grid-item:last-child {
      grid-column: span 2;
    }
  }
}
</style>
