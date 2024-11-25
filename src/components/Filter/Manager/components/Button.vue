<template>
    <div class="rowbetween grid-container">
        <div @click.stop="$emit('reset')">重置</div>
        <div @click.stop="$emit('confirm')">确定</div>
    </div>
</template>
<script>
export default {
    name: 'Button',
    
}
</script>
<style lang="scss">
</style>