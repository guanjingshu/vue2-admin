<template>
  <div class="search-content">
    <el-form ref="form" :inline="true" style="width: calc(100% - 100px)">
      <el-form-item
        v-for="(item, index) in newList"
        :key="index"
        class="relative"
      >
        <TooltipWrapper :content="item.content">
          <template v-if="item.inputType == 'input'">
            <el-input
              v-model="form[item.name]"
              :placeholder="item.placeholder"
            ></el-input>
          </template>
          <template v-else-if="item.inputType == 'select'">
            <el-select
              v-model="form[item.name]"
              :placeholder="item.placeholder"
            >
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
          <template v-else-if="item.inputType == 'checkbox'">
            <el-checkbox
              :label="item.label"
              :disabled="item.disabled"
              v-model="form[item.name]"
            >
              {{ item.label }}
            </el-checkbox>
          </template>
          <template v-else-if="item.inputType == 'date'">
            <el-date-picker
              :picker-options="{ disabledDate: getRange }"
              :placeholder="item.placeholder || '请选择日期'"
              type="date"
              v-model="form[item.name]"
            ></el-date-picker>
            <el-popover
              v-if="item.tips"
              trigger="hover"
              placement="top right"
              width="180"
            >
              <div class="font12">{{ item.tips }}</div>
              <span
                class="el-icon-warning-outline icon-style"
                slot="reference"
              ></span>
            </el-popover>
          </template>
          <template v-else-if="item.inputType == 'daterange'">
            <!-- @input="actionPickChange"没有这个方法组件刷新不了，无论怎么变更时间，一直停留不动-->
            <el-date-picker
              v-model="form[item.name]"
              type="daterange"
              @input="actionPickChange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="{
                disabledDate: (time) => {
                  return time.getTime() >= dayjs(new Date()).add(-1, 'day');
                },
              }"
            >
            </el-date-picker>
          </template>
          <SearchTree ref="trees" v-else-if="item.inputType == 'tree'" v-model="item.defaultValue"></SearchTree>
          <SearchSelect
            :ref="item.id"
            v-else-if="item.inputType == 'searchselect'"
            :SearchSelectOption="item"
          ></SearchSelect>
          <MutiSelect
            v-model="item.defaultValue"
            v-else-if="item.inputType == 'mutiSelect'"
            :data="item.data"
            :placeHolder="item.label"
            @setMutiSelectFormData="setMutiSelectFormData"
          ></MutiSelect>
        </TooltipWrapper>
      </el-form-item>
    </el-form>
    <div class="form-btns rowstart aligncenter">
      <el-button type="primary" @click="actionSearch(false)">查询</el-button>
      <el-button type="primary" class="reset_btn" @click="resetForm('form')"
        >重置</el-button
      >
      <el-button type="primary" @click="actionExport">导出</el-button>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import TooltipWrapper from "./TooltipWrapper";
import SearchTree from "./SearchTree.vue";
import SearchSelect from "./SearchSelect.vue";
import MutiSelect from "./mutiSelect.vue";
export default {
  components: {
    TooltipWrapper,
    SearchSelect,
    MutiSelect,
    SearchTree,
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
    actionPickChange(value){
      if(Array.isArray(value)){
        this.$emit('sameDay',value[0].toString() == value[1]?.toString(),value)
      }
      if(Array.isArray(value) && value.length == 2){
        this.$emit('setDateValue',value[1])
      }
    },
    getRange(time) {
      if (this.isRangeDisable) {
        // 当报表中使用isRangeDisable属性时，返回当前结果
        const endDay = this.form["start-at--end-at"][1];
        const endDayFormat = dayjs(endDay).add(-1).format("YYYY-MM-DD");
        const startTime = new Date(endDayFormat);
        return (
          time.getTime() < startTime ||
          time.getTime() >= dayjs(new Date()).add(-1, "day")
        );
      } else {
        return time.getTime() >= dayjs(new Date()).add(-1, "day");
      }
    },
    actionSearch(isExport) {
      if (isExport) {
        return this.form;
      }
      for (const key in this.form) {
        if (
          Object.hasOwnProperty.call(this.form, key) &&
          key.indexOf("--") != -1
        ) {
          const value = this.form[key];
          const dateStart = key.split("--")[0];
          const dateEnd = key.split("--")[1];
          if (value && Array.isArray(value)) {
            this.form[dateStart] = dayjs(value[0]).format("YYYYMMDD");
            this.form[dateEnd] = dayjs(value[1]).format("YYYYMMDD");
          } else {
            delete this.form[dateStart];
            delete this.form[dateEnd];
          }
        }
      }
      const dateValue = this.form.paramsDate;
      if (this.form.type == "01") {
        if (dateValue && Array.isArray(dateValue)) {
          this.form["start_at"] = dayjs(dateValue[0]).format("YYYYMMDD");
          this.form["end_at"] = dayjs(dateValue[1]).format("YYYYMMDD");
        }
      }
      this.$emit("actionSearch", this.form);
    },
    resetForm() {
      this.$parent.setDefaultForm
        ? this.$parent.setDefaultForm()
        : (this.form = { type: this.form.type, clearFlag: "1" });
    },
    actionExport() {
      if (this.$parent.exportExcel) {
        let form = this.actionSearch(true)
        this.$parent.exportExcel();
      }
    },
    startExport({header, data, filename,multiHeader=[], merges=[],appendData,appendOrigin}) {
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: header,
          data: data,
          filename: filename,
          multiHeader: multiHeader,
          merges: merges,
          appendData: appendData,
          appendOrigin: appendOrigin
        })
      }
      )

    },
    startExportBySheet(sheetData){
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel_sheets(sheetData)
      })
    },
    setMutiSelectFormData(form) {
      for (const key in form) {
        this.form[key] = form[key];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.search-content{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  .search-form{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .search-item{
      margin-right: 10px;
    }
  }
  .search-btn{
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
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
