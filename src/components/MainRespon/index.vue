<template>
  <van-popup
    id="filter-search2"
    position="bottom"
    closeable
    round
    :value="showFilter"
    @input="(val) => $emit('update:showFilter', val)"
  >
    <ShadowBox>
      <div>
      <RadioGroup :list="[{name:'按条线',label:'all'},{name:'按条线+赛道',label:'part'}]" @radio-change="radioChange"></RadioGroup>
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
        <CheckboxList ref="checkboxList" :searchValue="searchValue" :list="managerData"/>
      </div>
    </ShadowBox>
  </van-popup>
</template>
<script>
import ShadowBox from "./components/ShadowBox.vue";
import RadioGroup from "@/components/RadioGroup.vue";
import Title from "./components/Title.vue";
import Grid from "./components/Grid.vue";
import CheckboxList from "./components/CheckboxList.vue";
import Button from "./components/Button.vue";
export default {
  name: "MainRespon",
  components: {
    ShadowBox,
    RadioGroup,
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
      return this.show_mode === "all";
    },
    filterTxt() {
      if (this.show_mode === "all") {
        return "全部赛道";
      } else {
        return this.currTrack;
      }
    },
  },
  data() {
    return {
      show_mode: "all",
      searchValue: "",
      trackData: [],
      managerData: [],
      currTrack: "",
      wrapperId: "filter-search2",
    };
  },
  async created() {
    await this.getTrackData();
    if (this.trackData?.length > 0) {
      // this.getManager(this.trackData[0].label);
    }
  },
  methods: {
    radioChange(mode) {
      this.show_mode = mode;
      if(this.show_mode === 'all'){
        this.clearCheckedItems()
      }
    },
    clearCheckedItems() {
      this.currTrack = "";
      this.searchValue = "";
      this.$refs.grid.clearItem();
      this.$refs.checkboxList.result = [];
    },
    async getTrackData() {
      try {
        // const param = {
        //   mapping_id: '100000'
        // }
        // const res = await getSoaData(param);
        // this.trackData = res.data;
        this.trackData = [
          { id: "2001", name: "six_track", label: "货币1" },
          { id: "2002", name: "six_track", label: "货币2" },
          { id: "2003", name: "six_track", label: "货币3" },
          { id: "2004", name: "six_track", label: "货币4" },
          { id: "2005", name: "six_track", label: "货币5" },
          { id: "2006", name: "six_track", label: "货币6" },
          { id: "2007", name: "six_track", label: "货币7" },
          { id: "2008", name: "six_track", label: "货币8" },
        ];
      } catch (error) {
        console.log(error);
      }
    },
    chooseGridItem(item) {
      
    },
    onSearch(){},
    onCancel() {
      
    }
  },
};
</script>
<style lang="sass"></style>
