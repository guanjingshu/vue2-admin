<template>
    <div class="rowbetween grid-container">
        <div @click="$emit('reset')">重置</div>
        <div @click="$emit('confirm')">确定</div>
    </div>
</template>
<script>
export default {
    name: 'Button',
    
}
</script>
<style lang="scss">
</style>