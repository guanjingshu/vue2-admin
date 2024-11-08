<template>
    <div class="performance">
        <section class="grid-box">
            <div class="grid-item bcwhite">
                <BarAndLine :barWidth="40"/>
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