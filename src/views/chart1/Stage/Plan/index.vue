<template>
    <div>
        <!-- 重点关注 -->
        <Highlight />
    </div>
</template>
<script>
import Highlight from './Card/Highlight.vue';
export default {
    name: 'Plan',
    components: {
        Highlight
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