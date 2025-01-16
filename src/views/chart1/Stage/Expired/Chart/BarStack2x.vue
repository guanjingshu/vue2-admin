<template>
    <div class="fullwidth barstack-box">
        <div class="stack-bar" ref="chart" style="width: 100%; height: 380px;"></div>
    </div>
</template>
<script>

export default {
    props: {
        showYAxis: {
            type: Boolean,
            default: false
        },
        colorCfg: {
            type: Object,
            default: () => ({
                "P10以下": "#df4545",
                "不合格": "#f19241",
                "合格": "#a6d645",
                "优秀": "#51b9c3",
                "合格率": "#729df7",
            })
        },
        height: {
            type: String,
            default: '280px'
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initChart()
        })
    },
    methods: {
        initChart() {
            this.chart = this.$echarts.init(this.$refs.chart); // 基于准备好的dom，初始化echarts实例
            this.chart.clear()
            let option = {
                dataset:{
                    dimensions: ['ASSET_DIM', 'P10以下', '不合格', '合格', '优秀', '合格率'],
                    source: [{
                        ASSET_DIM: '2019年',
                        'P10以下': 10.0,
                        '不合格': 20.0,
                        '合格': 10.0,
                        '优秀': 20.0,
                        '合格率': 10
                    }, {
                        ASSET_DIM: '2020年',
                        'P10以下': 10.0,
                        '不合格':20.0,
                        '合格': 10.0,
                        '优秀': 20.0,
                        '合格率': 10
                    }]

                },
                tooltip: {
                    trigger: 'axis',
                },
                grid: {
                    top: '10%',
                    right: 30,
                    bottom: '10%',
                    left: '70'
                },
                xAxis:[{
                    type: 'category',
                    boundaryGap: true,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        interval: 0,
                        rotate: 45,
                        margin: 8,
                        textStyle: {
                            color: '#3573f3',
                            fontSize: 12,
                            fontWeight: 400
                        }
                    },
                    padding: [5, 6, 3, 6], //防止x轴文字显示不全
                    backgroundColor: '#ebf1fe', //背景色
                    margin: 10,
                },],
                title:[
                    {
                        subtext: '单位：万元',
                        left: 4,
                        subtextStyle: {
                            color: '#969799'
                        }
                    },
                    {
                        subtext: '%',
                        right: 4,
                        subtextStyle: {
                            color: '#969799'
                        }
                    }
                ],
                yAxis: [{
                    type: 'value',
                    position: 'left',
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#3573f3',
                            fontSize: 12,
                            fontWeight: 400
                        }
                    },
                    splitLine: {
                        show: true,
                        gap: 20,
                        lineStyle: {
                            type: 'dashed',
                        }
                    }
                },
                {
                  title: {
                    text: '亿元',
                    textStyle: {
                        color: '#969799'
                    }
                  },
                  type: 'value',
                  position: 'right',
                  axisLabel: {
                      show: true,
                      textStyle: {
                          color: '#969799',
                          fontSize: 12,
                          fontWeight: 400

                      }
                  },
                  splitLine: {
                      show: true,
                      gap: 20,
                      lineStyle: {
                          type: 'dashed',
                      }

                  }
                }],
                series: [
                    {
                    name: '优秀',
                    yAxisIndex: 0,
                    type: 'bar',
                    barWidth: 40,
                    stack: 'total',
                    emphasis: {
                        focus: 'series'
                    },
                    itemStyle: {
                        normal: {
                            color: (params) => {
                                return this.colorCfg[params.seriesName]
                            }
                        }
                    },
                    tooltip: {
                        valueFormatter: (value) => {
                            return value + '亿元'
                        }
                    }
                },
                {
                    name: '合格',
                    yAxisIndex: 0,
                    type: 'bar',
                    barWidth: 40,
                    stack: 'total',
                    emphasis: {
                        focus: 'series'
                    },
                    itemStyle: {
                        normal: {
                            color: (params) => {
                                return this.colorCfg[params.seriesName]
                            }
                        }
                    },
                    tooltip: {
                        valueFormatter: (value) => {
                            return value + '亿元'
                        }
                    }
                },
                {
                    name: '不合格',
                    yAxisIndex: 0,
                    type: 'bar',
                    barWidth: 40,
                    stack: 'total',
                    emphasis: {
                        focus: 'series'
                    },
                    itemStyle: {
                        normal: {
                            color: (params) => {
                                return this.colorCfg[params.seriesName]
                            }
                        }
                    },
                    tooltip: {
                        valueFormatter: (value) => {
                            return value + '亿元'
                        }
                    }
                },
                {
                    name: 'P10以下',
                    yAxisIndex: 0,
                    type: 'bar',
                    barWidth: 40,
                    stack: 'total',
                    emphasis: {
                        focus: 'series'
                    },
                    itemStyle: {
                        normal: {
                            color: (params) => {
                                return this.colorCfg[params.seriesName]
                            }
                        }
                    },
                    tooltip: {
                        valueFormatter: (value) => {
                            return value + '亿元'
                        }
                    }
                },
                {
                    name: '合格率',
                    yAxisIndex: 1,
                    type: 'line',
                    barWidth: 40,
                    encode: {
                        x: 'ASSET_DIM',
                        y: '合格率'
                    },
                    // stack: 'total',
                    emphasis: {
                        focus: 'series'
                    },
                    itemStyle: {
                        normal: {
                            color: (params) => {
                                return this.colorCfg[params.seriesName]
                            }
                        }
                    },
                    tooltip: {
                        valueFormatter: (value) => {
                            return value + '亿元'
                        }
                    }
                },
            ]

            }
            this.chart.setOption(option); // 使用刚指定的配置项和数据显示图表。
        }
    }
}
</script>