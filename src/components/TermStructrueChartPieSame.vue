<template>
  <div class="piecontent" :ref="`piecontentRef`" style="height: 500px;"></div>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "TermStructrueChartPieSame",
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
      chartData:[]
    };
  },
  mounted() {
    this.a();
  },
  methods: {
    a() {
      this.chartData=this.chartData.map((item)=>{
        if(item.busi_type=='1.货币市场'){
          item.Color='#729DF7'
        }else if(item.busi_type=='2.债券市场'){
          item.Color='#F7B272'
        }else if(item.busi_type=='3.股票市场'){
          item.Color='#F7B272'
        }else if(item.busi_type=='4.商品期货'){
          item.Color='#F7B272'
        }else if(item.busi_type=='5.金融衍生品'){
          item.Color='#F7B272'
        }else if(item.busi_type=='6.现金管理'){
          item.Color='#F7B272'
        }else if(item.busi_type=='7.基金'){
          item.Color='#F7B272'
        }
        return {value: item.amount5, name: item.busi_type,itemStyle:{color:item.Color}}
      })
      var chartDom = this.$refs.piecontentRef;
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        title: {
          text: "fund",
          subtext: "999",
          left: "center",
          top:"40%",
          textStyle: {
            color: "#323233",
            fontSize: 14,
            fontWeight: 600,
          },
          subtextStyle: {
            color: "#323233",
            fontSize: 20,
            fontWeight: 400,
          },
        
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ['70%','97%'],
            silent: true,
            label: {
              show: false,
              position:"center",
              formatter:'fund'
            },
            emphasis: {
              label:{
                fontSize: "40",
                fontWeight: "bold",
              }
            },
            labelLine: {
              show: false,
            },
            data: [
              {value:12,name:'fund',itemStyle:{color:'#000'}},
              {value:12,name:'fund',itemStyle:{color:'#111'}},
              {value:12,name:'fund',itemStyle:{color:'#222'}},
              {value:12,name:'fund',itemStyle:{color:'#333'}},
              {value:12,name:'fund',itemStyle:{color:'#444'}},
              {value:12,name:'fund',itemStyle:{color:'#555'}},
              {value:12,name:'fund',itemStyle:{color:'#666'}},
              {value:12,name:'fund',itemStyle:{color:'#777'}},
            ],
            
          },
          {
            type: 'pie',
            animation: false,
            radius: ['60%','70%'],
            silent: true,
            label: {
              show: false,
              position:"center",
              formatter:'fund'
            },
            emphasis: {
              label:{
                fontSize: "40",
                fontWeight: "bold",
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value:0,itemStyle:{color:'#f4f5f7'}}
            ]
          },
          {
            type: 'pie',
            animation: false,
            radius: ['58%','60%'],
            silent: true,
            label: {
              show: false,
              position:"center",
              formatter:'fund'
            },
            emphasis: {
              label:{
                fontSize: "40",
                fontWeight: "bold",
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value:0,itemStyle:{color:'#ebedf0'}}
            ]
          }
        ],
      };

      option && myChart.setOption(option);
    },
    b(){
      this.chartData = [1,1,1,1,1].map((item,index)=>{
        if(item.a =='fund'){
          item.Color = '#729DF7'
        }

        return {value:1,name:item.a,itemStyle:{color:item.Color}}
      })
    }
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
