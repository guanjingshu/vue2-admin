<template>
    <div class="comwrap" :class="{op16:!isOpen}">
        <slot/>
        <span v-if="!isOpen" class="absolute top100">功能开发中...</span>
    </div>
</template>

<script>
export default {
    props:{
        isOpen:{
            type:Boolean,
            default:true
        }
    }
}

</script>
<style lang="scss" scoped>
.comwrap{
    .top100{
        top: 250px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 100;
        font-size: 42px;


    }
}
</style>