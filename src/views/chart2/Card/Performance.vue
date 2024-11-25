<template>
    <div class="performance">
        <section class="grid-box">
            <div class="grid-item bcwhite py14 px20 bdright1 bdbottom1">
                <BarAndLine :barWidth="40"/>
            </div>
            <div class="grid-item bcwhite py14 px20 bdright1 bdbottom1">
                <BarAndLine barColor="#a6d645" :barWidth="40"/>
            </div>
            <div class="grid-item bcwhite py14 px20 bdright1 bdbottom1">
                <BarAndLine barColor="#51b9c3" :barWidth="40"/>
            </div>
            <div class="grid-item bcwhite py14 px20 bdright1 bdbottom1">
                <BarAndLine barColor="#A973df" :barWidth="40"/>
            </div>
            <div class="grid-item bcwhite py14 px20 bdright1 bdbottom1">
                <BarAndLine barColor="#faab0c" :barWidth="40"/>
            </div>
        </section>
    </div>
</template>
<script>
import BarAndLine from '../Chart/BarAndLine.vue'
export default {
    name: 'Performance',
    components: {
        BarAndLine
    }
}
</script>

<style lang="scss" scoped>
.py14 {
    padding: 14px 0;
}
.px20 {
    padding: 0 20px;
}
.bdright1 {
    border-right: 1px solid #e1e4eA;
}
.bdbottom1 {
    border-bottom: 1px solid #e1e4eA;
}
.performance {
    .grid-box {
        display: grid;
        grid-gap: 0px 0px;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        .grid-item:last-child {
            grid-column: span 2;
        }
    }
}
</style>