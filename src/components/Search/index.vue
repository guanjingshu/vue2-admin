<template>
  <div>
    <el-form>
    
      <el-form-item
        v-for="(item, index) in newList"
        :key="index"
        class="relative"
      >
      <TooltipWrapper :content="item.content"> 
        <el-input
          v-if="item.inputType == 'input'"
          v-model="form[item.name]"
          :placeholder="item.placeholder"
        ></el-input>
        <template v-else-if="item.inputType == 'select'">
          <el-select v-model="form[item.name]" :placeholder="item.placeholder">
            <el-option
              v-for="(option, index) in item.list"
              :key="index"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
          <el-popover
            v-if="item.tips"
            trigger="hover"
            placement="right-end"
            width="180"
          >
            <div>{{ item.tips }}</div>
            <span
              class="el-icon-warning-outline icon-style relative"
              slot="reference"
            ></span>
          </el-popover>
        </template>
        <template v-else-if="item.inputType == 'daterange'">
        <!-- {{ dayjs(new Date()).add(-1,'day') }} -->
          <el-date-picker
            v-model="form[item.name]"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="{
              disabledDate: (time) => { return time.getTime() >= dayjs(new Date()).add(-1,'day')}
            }"
          >
          </el-date-picker>
        </template>
        </TooltipWrapper>
      </el-form-item>
    
    </el-form>
    <div class="form-btns">
      <el-button type="primary" @click="actionSearch(false)">查询</el-button>
      <el-button type="primary" @click="actionExport">导出</el-button>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import TooltipWrapper from './TooltipWrapper'
export default {
  components: {
    TooltipWrapper,
  },
  props: {
    searchData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // newList: [],
      form: {},
      dayjs,
    };
  },
  created() {
    // this.newList = this.list
  },
  computed: {
    newList() {
      return this.searchData;
    },
  },
  methods: {
    actionSearch(isExport){
        if(isExport){
          return this.form
        }
        this.$emit('actionSearch', this.form);
    },
    actionExport() {
      if(this.$parent.exportExcel){
        // let form = this.actionSearch(true)
        this.$parent.exportExcel()
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-style {
  margin-left: 3px;
  margin-top: 5px;
  height: 28px;
  &:hover {
    color: #409eff;
  }
}
.relative {
  position: relative;
}
</style>
