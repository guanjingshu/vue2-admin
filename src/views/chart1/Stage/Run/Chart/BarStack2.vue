<template>
  <div class="fullwidth">
    <div class="stack-bar" ref="chart" :style="{ height: height }"></div>
  </div>
</template>
<script>
import { position } from "html2canvas/dist/types/css/property-descriptors/position";

export default {
  name: "BarStackAndLine",
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
    showYAxis: {
      type: Boolean,
      default: () => false,
    },
    colorCfg: {
      type: Object,
      required: true,
    },
    height: {
      type: String,
      default: "280px",
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
      handler() {
        this.$nextTick(() => {
          this.initChart();
        });
      },
      deep: true,
    },
  },
  methods: {
    initChart() {
      this.chart = this.$echarts.init(this.$refs.chart);
      this.chart.clear();
      let option = {
        dataset: {
          dimensions: [
            "tiaoxian",
            "稳定资产",
            "流动资产",
            "非流动资产",
            "负债",
            "所有者权益",
          ],
          source: [
            {
              tiaoxian: "2020年",
              稳定资产: 100,
              流动资产: 200,
              非流动资产: 300,
              负债: 400,
              所有者权益: 500,
            },
            {
              tiaoxian: "2021年",
              稳定资产: 200,
              流动资产: 300,
              非流动资产: 400,
              负债: 500,
              所有者权益: 600,
            },
            {
              tiaoxian: "2022年",
              稳定资产: 300,
              流动资产: 400,
              非流动资产: 500,
              负债: 600,
              所有者权益: 700,
            },
            {
              tiaoxian: "2023年",
              稳定资产: 400,
              流动资产: 500,
              非流动资产: 600,
              负债: 700,
              所有者权益: 800,
            },
            {
              tiaoxian: "2024年",
              稳定资产: 500,
              流动资产: 600,
              非流动资产: 700,
              负债: 800,
              所有者权益: 900,
            },
            {
              tiaoxian: "2025年",
              稳定资产: 600,
              流动资产: 700,
              非流动资产: 800,
              负债: 900,
              所有者权益: 1000,
            },
          ],
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          itemWidth: 15.5,
        },
        grid: {
          top: "14%",
          right: 30,
          bottom: "15%",
          left: this.showYAxis ? "30" : 0,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#646566",
                fontSize: 12,
                fontWeight: 400,
              },
              margin: 10,
            },
          },
        ],
        title: [
          {
            subtext: "单位: 万元",
            left: 4,
            subtextStyle: {
              color: "#969799",
            },
          },
          {
            subtext: "%",
            right: 4,
            subtextStyle: {
              color: "#969799",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            position: "left",
            axisLabel: {
              show: true,
              textStyle: {
                color: "#969799",
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
            title: {
              text: "亿元",
              textStyle: {
                color: "#969799",
              },
            },
            type: "value",
            position: "right",
            axisLabel: {
              show: true,
              textStyle: {
                color: "#969799",
                fontSize: 12,
                fontWeight: 400,
              },
              splitLine: {
                show: true,
                gap: 20,
                lineStyle: {
                  type: "dashed",
                },
              },
            },
          },
        ],
        series: [
          {
            name: "稳定资产",
            yAxisIndex: 0,
            type: "bar",
            barWidth: 40,
            stack: "total",
            emphasis: {
              focus: "series",
            },
            itemStyle: {
              normal: {
                color: (params) => {
                  return this.colorCfg[params.seriesName];
                },
              },
            },
          },
          {
            name: "流动资产",
            yAxisIndex: 0,
            type: "bar",
            barWidth: 40,
            stack: "total",
            emphasis: {
              focus: "series",
            },
            itemStyle: {
              normal: {
                color: (params) => {
                  return this.colorCfg[params.seriesName];
                },
              },
            },
          },
          {
            name: "非流动资产",
            yAxisIndex: 0,
            type: "bar",
            barWidth: 40,
            stack: "total",
            emphasis: {
              focus: "series",
            },
            itemStyle: {
              normal: {
                color: (params) => {
                  return this.colorCfg[params.seriesName];
                },
              },
            },
          },
          {
            name: "负债",
            yAxisIndex: 0,
            type: "bar",
            barWidth: 40,
            stack: "total",
            emphasis: {
              focus: "series",
            },
            itemStyle: {
              normal: {
                color: (params) => {
                  return this.colorCfg[params.seriesName];
                },
              },
            },
          },
          {
            name: "所有者权益",

            type: "line",
            yAxisIndex: 1,
            encode: {
              x: "tiaoxian",
              y: "所有者权益",
            },
            itemStyle: {
              normal: {
                color: "#729df7",
                lineStyle: {
                  color: "#729df7",
                },
              },
            },
          },
        ],
      };
      this.chart.setOption(option);
    },
  },
};
</script>
<style lang="scss" scoped>
.fullwidth, .stack-area {
  width: 100%;
}
</style>
