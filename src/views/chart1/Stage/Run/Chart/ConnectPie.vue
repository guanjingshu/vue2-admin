<template>
    <div class="fullwidth">
        <div class="stack-bar" ref="chart" :style="{height:height}"></div>
    </div>
</template>
<script>
export default {
    name: 'ConnectPie',
    props: {
        chartData: {
            type: Array,
            default: () => []
        },
        sourceData: {
            type: Array,
            default: () => []
        },
        height: {
            type: String,
            default: '550px'
        },
        showLine: {
            type: Boolean,
            default: true
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
        chartData(){
            this.initChart()
        },
        deep:true
    },
    methods: {
        initChart() {
            this.chart = this.$echarts.init(this.$refs.chart);
            this.chart.clear();
            let option = {
                dataset:{
                    dimensions: ['id', 'test', 'percent'],
                    source: this.sourceData

                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }

                    }
                },
                grid: {
                    top: '20%',
                    right: '4%',
                    bottom: '15%',
                    left: '4%',
                },
                series:[
                    {
                        type: 'pie',
                        hoverAnimation: false,
                        radius:[0, 140],
                        center: ['25%', '50%'],
                        emphasis: {
                            label: {
                                show: true,
                            }
                        },
                        encode: {
                            itemName: 'test',
                            value: 'percent'

                        },
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    return params.value.color
                                }
                            }
                        }

                    },
                    {
                        type: 'pie',
                        radius:[0, 80],
                        center: ['75%', '50%'],
                        label: {
                            show: false
                        },
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    return params.data.color

                                }
                            }
                        },
                        markLine:{
                            z: -10,
                            silent: true,
                            symbol: 'none',
                            data: this.getMarkLineData(),
                            lineStyle: {
                                color: '#d8d8d8',
                                type: "solid"
                            }
                        }
                    }
                ]
            };
            const data = this.sourceData[0]?.children.map(row=>({name:row.test,value:row.percent,color:row.color})) ?? []
                  option.series[1].data = data
                  this.chart.setOption(option);
            this.chart.on("click",(params)=>{
                if(params.value && params.value.id){
                    const currentRow = this.sourceData.find(row=>row.id === params.value.id)
                    if(currentRow){
                       const data = currentRow.children.map(row=>({name:row.test,value:row.percent,color:row.color}))
                       option.series[1].data = data
                       this.chart.setOption(option)
                       this.$emit("setExpandRowKeys", [currentRow.id])
                    }
                }
            })
        },
        getMarkLineData(percent){
            const height = this.chart.getHeight();
            const width = this.chart.getWidth();
            const x0 = 210;
            const x1 = x0 + (height/4)*Math.cos(45*3.14/180);
            const y1 = height*0.5 - (height/4)*Math.sin(45*3.14/180);
            const x2 = x1;
            const y2 = height*0.5 + (height/4)*Math.sin(45*3.14/180);
            const result = [
                [{x:x1,y:y1},{x:"70%",y:"37.5%"}],//线1
                [{x:x1,y:y2},{x:"70%",y: 344}],//线2
            ]
            return result
        }
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