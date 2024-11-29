<template>
    <div class="rowbetween aligncenter relative">
        <section class="rowstart">
            <Label v-for="label in labelList.slice(0, 3)" :key="label" :name="label" class="mr4" />
            <Label v-if="labelList.length"  :name="..." class="" />
        </section>
        <span class="font14"> 筛选<van-icon name="filter-0"/> </span>
        <FilterOfChannelAndTrack :showFilter.sync="showFilter" @change="filterChange" />
    </div>
</template>
<script>
import Label from './Label.vue';
import FilterOfChannelAndTrack from '@components/Filter/ChannelAndTrack.vue';
export default {
    components: {
        Label,
        FilterOfChannelAndTrack
    },
    props: {
        formatter: {
            type: String,
            default: ()=>'YYYY-MM-DD'
        }
    },
    data() {
        return {
            showFilter: false,
            labelList:['全部渠道','全部跟踪']
        }
    },
    methods: {
        filterChange(obj) {
           this.labelList = []
           this.$emit('change', obj)
           obj.channelList.forEach(row => {
            this.labelList.push(row.label)
           }) 
           obj.trackList.forEach(row => {
            this.labelList.push(row.label)
           })
        }
    }

}
</script>
<style lang="scss" scoped></style>