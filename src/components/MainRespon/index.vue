<template>
  <van-popup
    id="filter-searcher2"
    position="bottom"
    closeable
    round
    :value="showFilter"
    @input="(val) => $emit('update:showFilter', val)"
  >
    <ShadowBox>
      <div>
        <Title :title="type1" />
        <Grid
          ref="grid"
          :style="{ 'grid-template-columns': 'auto auto auto auto' }"
          :disabled="disabled"
          :list="trackData"
          @choose-item="chooseGridItem"
        >
        </Grid>
        <Title :title="type2" subTitle="长按并上下拖动调整顺序" />
      </div>
      <div :disabled="{ disabled: disabled }">
        <div>
          <form action="/">
            <van-search
              v-model="searchValue"
              placeholder="请输入搜索关键词"
              background="none"
              right-icon="search"
              left-icon="none"
              @search="onSearch"
              @cancel="onCancel"
            >
            </van-search>
          </form>
        </div>
      </div>
    </ShadowBox>
  </van-popup>
</template>
<script>
import ShadowBox from "./components/ShadowBox.vue";
import Title from "./components/Title.vue";
import Grid from "./components/Grid.vue";
import CheckboxList from "./components/CheckboxList.vue";
import Button from "./components/Button.vue";
export default {
  name: "MainRespon",
  components: {
    ShadowBox,
    Title,
    Grid,
    CheckboxList,
    Button,
  },
  props: {
    showFilter: {
      type: Boolean,
      default: false,
    },
    title: {
       type: String,
       default: "筛选",
    },
    type1: {
      type: String,
      default: "常用",
    },
    type2: {
      type: String,
      default: "全部",
    },

  },
  computed: {
      disabled() {
          return this.show_mode === 'all'
      }
  }
};
</script>
<style lang="sass"></style>
