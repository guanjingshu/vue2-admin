<template>
  <div class="container">
    <SetWaterMark>
      <div class="nav bcwhite">
        <van-tabs
        v-model="activeTabIndex">
          <van-tab title="同业对标" name="0"></van-tab>
          <van-tab title="全市场" name="1"></van-tab>
        </van-tabs>
      </div>
      <div class="content">
        <keep-alive>
          <component :is="componentName"/>
        </keep-alive>
      </div>
    </SetWaterMark>
  </div>
</template>
<script>
import SetWaterMark from '@/components/SetWaterMark.vue';
import TabCompetition from './components/TabCompetition.vue';
import TabAllMarket from './components/TabAllMarket.vue';

// 市场数据 同业对标
export default {
  components: {
    SetWaterMark,
    TabCompetition,
    TabAllMarket
  },
  data() {
    return {
      activeTabIndex: 0
    };
  },
  computed: {
    componentName(){
      if(this.activeTabIndex.toString() === '0'){
        return TabCompetition
      } else if(this.activeTabIndex.toString() === '1'){
        return TabAllMarket
      }
    }
  }

}
</script>
<style lang="scss" scoped>
// .container{
//   // background-color: coral;
// }
</style>