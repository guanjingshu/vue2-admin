<template>
    <div class="rowbetween aligncenter bcwhite header h40">
        <div class="font12">单位:{{ unit }}</div>
        <div class="aligncenter point h40">
            <span>{{ dateStr }}</span>
            <span>图片</span>
        </div>
        <van-popup position="bottom" v-model="showPicker">
            <van-datetime-picker :type="vanDateType" :formatter="dateformatter" @confirm="actionSelectDate" @cancel="showPicker = false" />
        </van-popup>
    </div>
</template>
<script>
import dayjs from 'dayjs'
export default {
    props: {
        vanDateType: {
            type: String,
            default: 'year-month'
        },
        unit: {
            type: String,
            default: '元'
        },
        value:{
            type: Date,

        },
        formatter: {
            type: String,
            default: 'YYYY-MM-DD'
        }
    },
    computed: {
      dateStr() {
          return dayjs(this.value).format(this.formatter)
      }
    },
    data() {
        return {
            showPicker: false,
            // dateStr: ''
        }

    },
    methods: {
        actionSelectDate(){
            this.showPicker = false
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