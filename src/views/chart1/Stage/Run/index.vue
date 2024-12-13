<template>
    <div>
    <!-- 重点关注 -->
    <Highlight />
    <!-- 查询面板 -->
    <SearchPanelWrapper @updateSearchParams="updateSearchParams"/>
    <!-- 产品情况 -->
    <ProductInfo />
    <!-- 兑付情况 -->
    <PayOverall />

    </div>
</template>
<script>
import ProductInfo from './Card/ProductInfo.vue'
import Highlight from './Card/Highlight.vue';
import SearchPanelWrapper from './Card/SearchPanelWrapper.vue';
import PayOverall from './Card/PayOverall.vue';
export default {
    name: 'Run',
    components: {
        ProductInfo,
        Highlight,
        SearchPanelWrapper,
        PayOverall
    },
    data() {
        return {}
    },
    mounted() {
        console.log('create')
    },
    methods: {
        updateSearchParams(params) {
            console.log('updateSearchParams', params)
        }
    }
}
</script>
<style lang="scss" scoped></style>