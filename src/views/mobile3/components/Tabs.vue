<template>
<van-tabs ref="van-tab" v-model="activeName" title-active-color="black" title-inactive-color="#646566" @click="handleTabClick">
    <van-tab title="公司" name="公司"></van-tab>
    <van-tab title="条线" name="条线"></van-tab>
    <van-tab title="主责" name="主责"></van-tab>
</van-tabs>
</template>
<script>
export default {
  name: 'Tabs',
  data () {
    return {
      activeName: this.$route.params.type ?? '公司',
    }
  },
  methods: {
    changeTab (index) {
      this.active = index
    },
    handleTabClick (name, title) {
       this.$emit('switch-tab', name,  title) 
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .van-tabs__line {
    background-color: #0084ff;
}
::v-deep .van-tab--disabled > .van-tab__text {
    color: #c8c9cc;
}
</style>