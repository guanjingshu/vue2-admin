<template>
  <div class="piecontent" :ref="`piecontentRef`" style="height: 500px"></div>
</template>
<script>
import * as echarts from "echarts";
import { fixPercent } from "@/utils/index";
export default {
  name: "TermStructrueChartPie",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    width: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      piecontentRef: null,
      chartData: [
        { index_val: "1.00", index_name: "0.00%" },
        { index_val: "100.00", index_name: "0.00%" },
        { index_val: "2.00", index_name: "0.00%" },
        { index_val: "200.00", index_name: "0.00%" },
        { index_val: "40.00", index_name: "0.00%" },
        { index_val: "60.00", index_name: "0.00%" },
        { index_val: "10.00", index_name: "0.00%" },
      ],
      ListItem: {
        LastYear: 99,
      },
    };
  },
  beforeCreate() {
    self = this;
  },
  mounted() {
    this.a();
  },
  methods: {
    a() {
      var chartDom = this.$refs.piecontentRef;
      var myChart = echarts.init(chartDom);
      let maxnum =
        Math.max(...this.chartData.map((item) => Number(item.index_val))) > 100
          ? Math.max(...this.chartData.map((item) => Number(item.index_val))) >
            1000
            ? 800
            : 100
          : 20;
      let minnum =
        Math.min(...this.chartData.map((item) => Number(item.index_val))) > 100
          ? Math.min(...this.chartData.map((item) => Number(item.index_val))) >
            1000
            ? -600
            : -50
          : -10;

      var option;
      option = {
        xAxis: {
          show: false,
          data: [],
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false,
          },
          min: minnum,
          max: maxnum,
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },

          splitLine: {
            show: false,
          },
        },
        series: [
          {
            type: "line",
            data: this.chartData.map((item) => Number(item.index_val)),
            symbol: "none",
            smooth: true,
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color:
                        this.ListItem.LastYear > 0
                          ? "rgba(246,234,237,0.4)"
                          : "rgba(34,160,129,0.4)",
                    },
                    {
                      offset: 0.9,
                      color:
                        this.ListItem.LastYear > 0
                          ? "rgba(233,73,86,0)"
                          : "rgba(232,242,241,0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowBlur: 10,
              },
            },
            lineStyle: {
              width: 0.8,
              opacity: 0.8,
              color: this.ListItem.LastYear > 0 ? "#e62c3b" : "#0e9876",
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
  watch: {
    data: {
      handler(newVal) {
        this.initChart();
      },
      deep: true,
    },
  },
  created() {},
  destroyed() {},
  computed: {},
  components: {},
};
</script>
