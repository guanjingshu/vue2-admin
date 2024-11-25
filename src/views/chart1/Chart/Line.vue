<template>
  <div class="fullwidth">
  <!-- {{ xAxisDataProp }}--{{ seriesDataProp }} -->
    <div class="stack-area" ref="chart" :style="{ height: height }"></div>
  </div>
</template>
<script>
export default {
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
    xAxisDataProp: {
      type: Array,
      default: () => [],
    },
    seriesDataProp: {
      type: Array,
      default: () => [],
    },
    seriesProp: {
      type: Array,
      default: () => [],
    },
    barWidth: {
      type: Number,
      default: () => 20,
    },
    barColor: {
      type: String,
      default: () => "#3573f3",
    },
    height: {
      type: String,
      default: "220px",
    },
    showLine: {
      type: Boolean,
      default: () => true,
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  watch: {
    chartData() {
      this.initChart();
    },
    xAxisDataProp:{
      handler() {
        this.$nextTick(() => {
          this.initChart();
        });
      }
    }
    // deep: true,
  },
  methods: {
    initChart() {
      this.chart = this.$echarts.init(this.$refs.chart);
      this.chart.clear();
      let option = {
        tooltip: {
          trigger: "axis",
          valueFormatter: (value) => {
            return this.$formatNumber(value,0,1) + "只";

          }
        },
        // legend: {},
        grid: {
            top: '15%',
            right: '5%',
            bottom: '15%',
            left: '5%',

        },
        xAxis: [{ type: "category", 
          boundaryGap: false,
          data: this.xAxisDataProp,
          // ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#9b9b9b',
              fontSize: 12,
              fontWeight: 400,

            },
            margin: 20,

          }
        }],
        title:{
          subtext: '单位：只',
          left: 40,
          top: -10
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#646566",
              fontSize: 12,
              fontWeight: 400,

            },
            formatter: (value) => {
              return this.$formatNumber(value,0,1);
            }
          },
          splitLine: {
            show: true,
            gap:20,
            lineStyle: {
              color: "#e6e6e6",
              type: "dashed",
            },

          }
        },
        series: this.seriesDataProp,
        // [{
        //   name: "line",
        //   type: "line",
        //   itemStyle: {
        //     color: "#1689FA",
        //   },
        //   emphasis: {
        //     focus: "series",
        //   },// 折线图拐点样式
        //   symbolSize:0, //拐点大小
        //   data: [120, 132, 101, 134, 90, 230, 210],
        // },
        // {
        //   name: "line2",
        //   type: "line",
        //   itemStyle: {
        //     color: "#DF4545",
        //   },
        //   emphasis: {
        //     focus: "series",
        //   },// 折线图拐点样式
        //   symbolSize:0, //拐点大小
        //   data: [10, 20, 30, 40, 50, 60, 70],
        // }],
      };
      this.chart.setOption(option);
    },
  },
};
</script>
<style lang="scss" scoped>
.fullwidth {
  width: 100%;
}
.stack-area {
  width: 100%;
}
</style>
