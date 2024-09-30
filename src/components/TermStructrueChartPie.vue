<template>
  <div class="piecontent" :ref="`piecontentRef`" style="height: 500px;"></div>
</template>
<script>
import * as echarts from "echarts";
import {fixPercent} from '@/utils/index'
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
    };
  },
  beforeCreate(){
    self = this;
  },
  mounted() {
    this.a();
  },
  methods: {
    a() {
      var chartDom = this.$refs.piecontentRef;
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        title: {
          text: "Referer of a Website",
          subtext: "Fake Data",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: [{
          left:'35%',
          top:"center",
          itemWidth: 8,
          itemHeight: 8,
          itemGap: 12,
          orient: "vertical",
          textStyle:{
            width: 110,
            overflow: "break",
            fontSize: 12,
            color: "#646566",
            fontWeight: 400,
            lineHeight: 16,
          }
        },
        {
          left:'73%',
          top:"center",
          itemWidth: 0,
          itemHeight: 0,
          itemGap: 12,
          orient: "vertical",
          textStyle: {
            width:80,
            overflow: "break",
            lineHeight:16,
            rich: {
              b: {
                fontSize: 12,
                color: "#323233",
                fontWeight: 400,
                
              },
              c: {
                fontSize: 12,
                color: "#323233",
                fontWeight: 400,
                
              }
            }
          },
          formatter: function (name) {
            // let obj = getObjBykeyAndValue()
            // return `{c|${'22'}%}`
            return `{c|${22}%}`
          }
        }],
        // {
        //   orient: "vertical",
        //   left: "left",
        // },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ['0%','45%'],
            center: ["15%", "52%"],
            color: ["#4A90E2","#5AD8A6","#F6BD16","#E8684A","#6DC8EC","#9270CA","#FF9D4D","#269A99","#FF99C3","#9FE6B8"],
            silent: true,
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
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
