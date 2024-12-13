<template>
  <div class="payoverall">
    <Title title="支付总览" class="h60 bcwhite px20 font20" hasBorder>
        <template #suffix>
            <GotoDetail />
        </template>
    </Title>
    <section class="rowbetween aligncenter bcwhite">
        <div class="flex1 mr40"></div>
        <div class="flex1 mr40">
            <div class="bcwhite py14 px20">
                <section class="rowbetween aligncenter bcwhite">
                    <div class="fullwidth">
                        <BarStackChart showYAxis :colorCfg="colorCfg" />
                    </div>
                </section>
            </div>
        </div>
    </section>
    
  </div>  
</template>
<script>
import Title from '../../../components/Title'
import GotoDetail from '../../../components/GotoDetail.vue'
import BarStackChart from '../Chart/BarStackAndLine.vue'
export default {
  name: 'PayOverall',
  components: {
    Title,
    GotoDetail,
    BarStackChart
  },
  computed: {
      colorCfg() {
          const cfg = {}
          this.legendData.forEach((item,index) => {
              cfg[item.name] = item.color
          })
          return cfg
      }
  },
  data() {
      return {
          legendData:[
            {name:'稳定资产',color: '#f1924e'},
            {name:'流动资产',color: '#fad20c'},
            {name:'非流动资产',color: '#a6d645'},
            {name:'负债',color: '#57a9fb'},
          ]
      }
  }
}
</script>
<style lang="scss" scoped>
.fullwidth{
    width: 100%;
}
</style>