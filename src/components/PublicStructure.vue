<template>
    <div class="footer">
        <div class="">{{ '数据日期'+dataDate }}<br/>{{ dataDate2 }}</div>
        <div v-for="(item,index) in list">
            <div class="rowbetween">
                <div class="rowstart aligncenter">
                    <img style="width: 20px; height: 20px" :src="item.sta_type | typeIcon" />
                    <div>{{ item.sta_type | lowerUnitLeft }} {{ item.sta_type | lowerUnitRight }}</div>
                </div>
                <div>
                    <div>{{ $formatNumber(item.amount1,2,1) }}</div>
                </div>
            </div>
            <div class="rowbetween" style="margin-top: 10px">
                <div style="min-width: 30%;">
                    <div>较上一工作日</div>
                    <div class="rowstart aligncenter">
                        <img style="width: 20px; height: 20px"  :src="item.amount2 | upOrDown" alt=""/>
                        <div>{{ item.amount2 | comparePrevData}}</div>
                    </div>
                </div>
                <div style="min-width: 30%;">
                    <div>较上一工作日</div>
                    <div class="rowstart aligncenter">
                        <img style="width: 20px; height: 20px"  :src="item.amount2 | upOrDown" alt=""/>
                        <div>{{ item.amount2 | comparePrevData}}</div>
                    </div>
                </div>
                <div style="min-width: 30%;">
                    <div>较上一工作日</div>
                    <div class="rowstart aligncenter">
                        <img style="width: 20px; height: 20px"  :src="item.amount2 | upOrDown" alt=""/>
                        <div>{{ item.amount2 | comparePrevData}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import dayjs from 'dayjs'
export default {
    name: 'PublicStructure',
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    beforeCreate() {
        self = this
    },
    data() {
        return {
            dataDate: dayjs(new Date()).add(-1, 'day').format('YYYY-MM-DD'),
            dataDate2: dayjs(new Date()).add(1, 'month').format('M/DD'),
        
        }
    },
    filters: {
        typeIcon(val) {
            if (val == '产品规模(亿)') {
                return require('@/images/zz.png')
            }
        },
        upOrDown(val){
            if(Number(val)>0){
                return require('@/images/zz.png')
            }else if(Number(val)<0){
                return require('@/images/zz.png')
            }else{
                return ''
            }
        },
        comparePrevData(val){
           return self.$formatNumber(val,2,1)
        },
        lowerUnitLeft(val){
            return val.split('(')[0]
        },
        lowerUnitRight(val){
            return '('+ val.split('(')[1]
        }
    }
}
</script>