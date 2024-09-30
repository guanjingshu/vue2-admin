<template>
    <div class="" :class="{actived:actived}" @click="$emit('click')">
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
<style lang="sass">
</style>