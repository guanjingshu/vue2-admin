<template>
    <div>
        <PerformanceOverall></PerformanceOverall>
    </div>
</template>
<script>
import PerformanceOverall from './Card/PerformanceOverall.vue';
export default {
    name: 'Expired',
    components: {
        PerformanceOverall
    },
    data() {
        return {}
    },
    mounted() {
        console.log('create')
    }
}
</script>
<style lang="scss" scoped></style>