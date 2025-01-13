<template>
    <div class="nav-widget rowstart">
        <section class="w24 point navBg" :class="{navBg1: !isOpen, navBg2: isOpen}" @click="toggleNav()" > </section>
        <template v-if="isOpen">
            <ul class="bcwhite pt12 pb12 pl12 pr12">
                <li class="point font14 mb12" v-for="item in currNav" :key="item.title" @click="gotoPanel(item)">
                    <span :class="{actived: item.id===currSelect.id}">{{ item.title }}</span>
                    <ul>
                        <li class="point li2" :class="{actived:subItem.id===currSelect.id}" @click.stop="gotoPanel(subItem)" v-for="subItem in item.children" :key="subItem.title">{{ subItem.title }}</li>
                    </ul>
                </li>
            </ul>
        </template>
    </div>
</template>
<script>
export default {
 props: {
     currIndex: {
         type: Number,
     },
     currNav: {
        type: Array,
        default: () => []
     }
 },
 watch: {
     currIndex: {
         handler:function(newVal){
            if(newVal > -1){
                this.currSelect = this.currNav[newVal]
            }
         },
     },
     currNav: {
         handler:function(newVal){
            if(newVal.length > 0){
                this.currSelect = newVal[0]
            }
         },
         immediate: true
     }
 },
 data() {
     return {
        isOpen: false,
         currSelect: {}
     }
 },
 methods: {
     toggleNav(){
         this.isOpen = !this.isOpen
     },
     gotoPanel(item){
         this.currSelect = item
         document.querySelector(item.id)?.scrollIntoView({behavior: 'smooth',block: 'end', inline:'nearest'})
     }
 }
}
</script>
<style lang="scss" scoped>
.nav-widget{
    position: fixed;
    z-index: 10010;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    min-height: 280px;
}
</style>