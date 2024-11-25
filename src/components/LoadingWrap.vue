<template>
    <div>
        <van-loading v-if="isLoading" color="#1989fa" class="isloading" text-color="#3573F3" >加载中</van-loading>
        <template v-else>
            <template v-if="showPage"><slot /> </template>
            <NoData v-else/>
        </template>
    </div>
</template>
<script>
import NoData from '@/components/NoData.vue';
export default {
    name: 'LoadingWrap',
    components: {
        NoData
    },
    props: {
        isLoading: {
            type: Boolean,
            default: true
        },
        showPage: {
            type: Boolean,
            default: false
        }
    }
}
</script>
