<template>
    <div class="fullwidth">
        <div class="stack-bar" ref="chart" :style="{height:height}"></div>
    </div>
</template>
<script>
export default {
    props: {
        chartData: {
            type: Array,
            default: () => []
        },
        barWidth: {
            type: Number,
            default: () => 20
        },
        barColor: {
            type: String,
            default: () => '#3573f3'
        },
        height: {
            type: String,
            default: '220px'
        },
        showLine: {
            type: Boolean,
            default: () => true

        }
    },
    data() {
        return {
            
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initChart()
        })
    },
    watch: {
        chartData() {
            this.initChart();
        },
        deep: true
    },
    methods: {
        initChart() {
            this.chart = this.$echarts.init(this.$refs.chart);
            this.chart.clear();
            let option = {
                tooltip:{
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#999'
                        }
                    }

                },
                legend: {
                    top:'10'
                },
                grid: {
                    top: '30%',
                    right: '5%',
                    bottom: '15%',
                    left: '5%',

                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: true, // 柱状图设为true，折线图设为false
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                        axisTick:{
                            show:false
                        },
                        axisLine:{
                            // show:false
                            lineStyle:{
                                type:'solid',
                                color:'#969799',

                            }
                        },
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLabel: {
                            show: true,
                            textStyle:{
                                color:'#9b9b9b',
                                fontSize:12,
                                fontWeight:400
                            },
                            margin: 20,
                        }

                    }
                ],
                yAxis:[
                    {
                        type: 'value',
                        name: '单位：万元',
                        nameTextStyle:{
                            align:'center',
                        },
                        axisLabel: {
                            show: true,
                            textStyle:{
                                color:'#646566',
                                fontSize:12,
                                fontWeight:400
                            },

                        },
                        splitLine: {
                            show: true,
                            gap: 20,
                            lineStyle: {
                                type:'solid'
                            }
                        }

                    },
                    {
                        show: true,
                        type: 'value',
                        name: '%',
                        nameTextStyle:{
                            align:'left',
                        },
                        axisLabel: {
                            show: true,
                            textStyle:{
                                color:'#646566',
                                fontSize:12,
                                fontWeight:400
                            },

                        },
                        splitLine: {
                            show: true,
                            gap: 20,
                            lineStyle: {
                                type:'dashed'
                            }
                        }


                    }
                ],
                series:[
                    {
                        yAxisIndex: 0,
                        name: '产品规模',
                        type: 'bar',
                        barWidth: this.barWidth,
                        emphasis: {
                            focus: 'series'
                        },
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + '万元'
                            }
                        },
                        itemStyle: {
                            color: this.barColor
                        },
                        data: [120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70]



                    },
                    {
                        show: false,
                        yAxisIndex: 1,
                        name: '达标率',
                        type: 'line',
                        emphasis: {
                            focus: 'series'
                        },
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + '%'
                            }
                        },
                        itemStyle: {
                            color: '#f1924e'
                        },
                        data: [120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70]
                    }
                ],
            };
            this.chart.setOption(option);
        }
    }
}
</script>
<style lang="scss" scoped>
.fullwidth {
    width: 100%;
}
.stack-area{
    width: 100%;
}
</style>