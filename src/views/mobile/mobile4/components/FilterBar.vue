<template>
    <div class="rowbetween aligncenter h40rem">
        <span>
            <span v-if="tabName==='主责'" @click="showPanel">{{ filterLeftName }} <van-icon name="arrow-down"></van-icon></span>
        </span>
        <div>
            <div class="rowstart aligncenter" @click="showPicker=true">
               <div>{{ dateStr }}</div> 
            </div>
        </div>
        <FilterPanel :showFilter.sync="showPanel2" @change="filterChange" :checkedManager="checkedManager"/>
        <van-popup v-model="showPicker" position="bottom">
            <van-datetime-picker v-model="currentDate" type="date" :formatter="dateformatter" @confirm="actionSelectDate" @cancel="showPanel=false" />
        </van-popup>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import FilterPanel from '@/components/Filter/Manager';
export default {
    name: 'FilterBar',
    components: {
        FilterPanel
    },
    props: {
        tabName: {
            type: String,//公司 条线 主责
        },
        levelInfo1: {
            type: Object,
            default: () => ({name:'至四级', level: 4})
        },
        levelInfo2: {
            type: Object,
            default: () => ({name:'至四级', level: 4})
        },
    },
    data() {
      return {
        showPanel1: false,
        showPanel2: false,
        showPicker: false,
        currentDate: dayjs(new Date()).add(-1, 'day').toDate(),
        filterLeftName2: '主责选择',
        checkedManager: []

      }  
    },
    watch: {
        tabName: {
            handler(val) {
                if(this.tabName==='主责') {
                    this.showPanel2 = true;
                }
            },
            immediate: true,
        },

    },
    computed: {
        dateStr() {
            return dayjs(this.currentDate).format('YYYY-MM-DD');
        },
        filterLeftName() {
            if(this.tabName==='主责') {
                return this.filterLeftName2
            }
        }

    },
    methods: {
        filterChange(params, filterTxt){
            console.log('74----filter-change', params,filterTxt)
            return
            if(this.tabName==='条线') {

            }else if(this.tabName==='主责') {
                this.checkedManager = filterTxt;
            }
        },
        showPanel() {
            if(this.tabName==='主责') {
                this.showPanel2 = true;

            }else if(this.tabName==='条线') {
                this.showPanel1 = true;

            }
        },
        onConfirm1(col){
            this.$emit('change-level',col[0])
            this.showPicker1 = false;
        },
        onCancelPicker1() {
            this.showPicker1 = false;
        },
        actionSelectDate(value) {
            this.$emit('pick-day', value)
            this.showPicker = false;

        },
        dateformatter(type, value) {
            if (type === 'year') {
                return `${value}年`;
            } else if (type === 'month') {
                return `${value}月`;
            } else if (type === 'day') {
                return `${value}日`;
            }
            return value;
        }
    }
}
</script>