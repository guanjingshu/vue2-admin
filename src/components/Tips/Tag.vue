<template>
    <span class="tag h24 bc px-10 c373599 mr4 font12 fw350">{{ name }}</span>
</template>
<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        }
    },
    data(){
        return {
            
        }
    }
}
</script>
<style lang="scss" scoped>
span.tag.bc{
    border-radius: 12px;
}
</style>