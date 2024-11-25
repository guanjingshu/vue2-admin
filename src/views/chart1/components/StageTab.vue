<template>
    <div class="h88" :class="{point:canClick}" @click="canClick&&$emit('click')">
        <div class="h8"></div>
        <div class="h80 rowstart aligncenter" :class="{bcf7f8fa:canClick,bcebf1fe: actived}">
            <section class="aligncenter">
                <span style="margin-right: 4px;">{{actived?whichTab:whichTab}}</span>
                <!-- <img :src="active?imgSrcActivated:imgSrc"/> -->
            </section>
            <section class="alignstart">
                <span class="h24">888只</span>
                <span class="h24">888亿元</span>
            </section>
        </div>
        <div class="h8" :class="{bc3573f3:actived}"></div>
    </div>
</template>
<script>
export default {
    props: {
        actived: {
            type: Boolean,
            default: false
        },
        whichTab: {
            type: String,

        },
        imgSrc: {
            type: String,

        },
        imgSrcActivated: {
            type: String,

        },
        canClick: {
            type: Boolean,
            default: true

        }
    },
   
}
</script>
<style lang="scss" scoped>
.bc3573f3{
    background-color: #3573f3;

}
.bcf7f8fa{
    background-color: #f7f8fa;

}
.bcebf1fe{
    background-color: #ebf1fe;

}
</style>