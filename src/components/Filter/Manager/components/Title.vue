<template>
    <div>
    
    <div class="">
        <span>{{ title }}</span>
        <span>{{ subTitle }}</span>
    </div>
    </div>
</template>
<script>
export default {
    name: 'Title',
    props: {
        title: {
            type: String,
            required: true
        },
        subTitle: {
            type: String,
            default: ''
        }
    }
}
</script>
<style lang="sass">
</style>