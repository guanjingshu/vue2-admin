<template>
  <div class="fullwidth">
    {{ profitsData }}---{{ x_total }}
    <div
      class="stack-bar"
      ref="chart"
      :style="{ height: height, width: x_total * 130 + 'px' }"
    ></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
    profitsData: {
      type: Object,
      default: () => ({}),
    },
    barWith: {
      type: Number,
      default: () => 20,
    },
    barColor: {
      type: String,
      default: () => "#3573f3",
    },
    height: {
      type: String,
      default: () => "200px",
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
    chartData: {
      handler(val) {
        this.initChart();
      },
      deep: true,
    },
    profitsData: {
      handler(val) {
        this.initChart();
      },
      deep: true,
    },
    x_total: {
      handler(val) {
        this.initChart();
        this.chart.resize();
      },
      deep: true,
    },
  },
  computed: {
    x_total() {
      return Math.max(
        this.profitsData.x_list && this.profitsData.x_list.length,
        13
      );
    },
  },
  methods: {
    initChart() {
      this.chart = this.$echarts.init(this.$refs.chart);
      this.chart.clear();
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        legend: {},
        grid: {
            top: "20%",
            right: 60,
            bottom: "15%",
            left: 60,
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: true, //柱状图设为true
              data: this.profitsData.x_list,
              axisTick: {
                show: false,
              },
              axisLine: {
                show: false,
              },
              axisPointer: {
                type: "shadow",
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#9b9b9b",
                  fontSize: 12,
                  fontWeight: 400,
                },
                margin: 20,
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              name: "单位：万元",
              nameTextStyle: {
                align: "right",
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#646566",
                  fontSize: 12,
                  fontWeight: 400,
                },
              },
              splitLine: {
                show: true,
                gap: 20,
                lineStyle: {
                  type: "dashed",
                },
              },
            },
            {
              show: false,
              type: "value",
              name: "%",
              nameTextStyle: {
                align: "left",
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#646566",
                  fontSize: 12,
                  fontWeight: 400,
                },
              },
              splitLine: {
                show: true,
                gap: 20,
                lineStyle: {
                  type: "dashed",
                },
              },
            },
          ],
          series: [
            {
              yAxisIndex: 0,
              type: "bar",
              barWidth: this.barWidth,
              barGap: 160,
              emphasis: {
                focus: "series",
              },
              tooltip: {
                valueFormatter: (value) => {
                  return value + "万元";
                },
              },
              itemStyle: {
                color: this.barColor,
              },
              data: this.profitsData.y_list,
            },
          ],
        // },
      };
      this.chart.setOption(option);
    },
  },
};
</script>
<style lang="scss" scoped>
.fullwidth {
  width: 100%;
  overflow-x: auto;
}

.stack-area {
  width: 100%;
}
</style>
