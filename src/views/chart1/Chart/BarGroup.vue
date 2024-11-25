<template>
  <div class="fullwidth">
  <!-- {{ dimensionsProp }}--{{ sourceProp }}--{{ seriesProp }} -->
    <div class="stack-bar" ref="chart" :style="{ height: height }"></div>
  </div>
</template>
<script>
export default {
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
    dimensionsProp: {
      type: Array,
      default: () => [],
    },
    sourceProp: {
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
    dimensionsProp:{
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
        dataset: {
          dimensions:this.dimensionsProp, 
          // ["product", "2015", "2016", "2017"],
          source: this.sourceProp,
          //  [
          //   { product: "Matcha Latte", 2015: 43.3, 2016: 85.8, 2017: 93.7 },
          //   { product: "Milk Tea", 2015: 83.1, 2016: 73.4, 2017: 55.1 },
          //   { product: "Cheese Cocoa", 2015: 86.4, 2016: 65.2, 2017: 82.5 },
          //   { product: "Walnut Brownie", 2015: 72.4, 2016: 53.9, 2017: 39.1 },
          // ],
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: this.seriesProp,
        // [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
        label: {
            show: true,
            position: 'top',
            formatter: function(params) {
                return params.seriesName;
            }

        }
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
