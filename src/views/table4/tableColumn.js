export const OptionInitFn = (title, tooltipStr, lineList, xAxisList,barList)=>{
    let option = {
        title: {
            text: title,
            top: '',
            textStyle: {
                fontSize: 14,
                fontWeight: 'normal',
            }
        },
        color: ['#3573f3', '#29BEFF'],
        backgroundColor: '#fff',
        grid: {
            top: '20%',
            left: '10%',
            right: '10%',
            bottom: '10%',
            containLabel: true
        },
        legend: {
            data: [{name:'规模'}, {name:'增长率', icon:`image://${require('@/assets/404_images/404.png')}`}],
            top: 5,
            itemWidth: 15,
            itemHeight: 15,
            itemGap: 15,
            right: '10%',
            padding: 10,
            textStyle: {
                color: 'rgb(102, 102, 102)', // 图例文字颜色
            }
        },
        tooltip: {
            show: true,
            trigger: 'axis',
            formatter: function(params){
                let content = '';
                params.forEach((item, index) => {
                    content += `<div>
                        <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${item.color}"></span>
                        <span>${item.seriesName}：${item.value}</span></div>`;
                })
                const htmlContent = `<div style="padding:10px 15px;background-color:rgba(0,0,0,0.7);border-radius:5px;">${content}</div>`;
                return htmlContent;
            }
        },
        xAxis: {
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: 'rgb(102, 102, 102)'
                }
            },
            data: xAxisList,
            axisTick: {
                // 刻度
                show: false
            },
            axisLabel: {
                // 旋转角度
                rotate: 45,
                // 字体大小
                fontSize: 12,
                // 字体颜色
                color: 'rgb(102, 102, 102)',
                // 换行
                formatter: function(value) {
                    if (value.length > 6) {
                        return value.slice(0, 6) + '\n' + value.slice(6);
                    } else {
                        return value;
                    }
                }
            },
            axisPointer: {
                show: true, // 是否显示坐标轴指示器
                type: 'shadow',
                label: {
                    show: true,
                    type: 'shadow',
                    label: {
                        show: true,
                        color: '#fff',
                        backgroundColor: '#6a7985'
                    }
                }
            }
        },
        yAxis:[{
            type: 'value',
            name: '规模',
            min: 0,
            interval: 100,
            max: 500,
            nameTextStyle: {
                color: 'rgb(102, 102, 102)',
                fontSize: 12,
                padding: [0, 0, 0, 0]
            },
            axisLine: {
                show: true, // 是否显示坐标轴轴线
                lineStyle: {
                    color: 'rgb(102, 102, 102)'
                }
            },
            axisTick: {
                // 刻度
                show: true,
                inside: true
            },
            axisLabel: {
                color: '#999'
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgb(238, 238, 238)',
                    type: 'dashed',
                    opacity: 0.5
                }

            },
            axisPointer: {
                show: true, // 是否显示坐标轴指示器
                type: 'line',
                label: {
                    show: true,
                    color: '#fff',
                    backgroundColor: '#6a7985'
                },
                triggerTooltip: false
            }
        },{
            name: '费率',
            position: 'right',
            yAxisIndex: 1,
            min: -20,
            max: 20,
            interval: 5,
            nameTextStyle: {
                color: '#999',
                padding: [0, 0, 0, 0]
            },
            axisLine: {
                color: '#999',
                formatter: function(value){
                    if(value == -20){
                        return '0%';
                    }else if(value <= 0){
                        return '';
                    } else {
                        return value + '%';
                    }
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#ccc',
                    type: 'dashed',
                    opacity: 0
                }
            }
        }]
    }
    return option;
}