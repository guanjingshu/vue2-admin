<template>
    <div class="centerbox aligncenter bd1 rowcenter" :class="{actived:actived}" @click="$emit('click')">
        {{ label }}
    </div>
</template>
<script>
export default {
    name: 'GridItem',
    props: {
        label: {
            type: String,
            required: true,
            default: ''
        },
        actived: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<style lang="scss" scoped>
.bd1{
    border: 1px solid transparent;
}
.actived{
    border: 1px solid #3573f3;
}
</style>