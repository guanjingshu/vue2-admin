<template>
  <el-popover
    popper-class="popover-dimension-setting"
    placement="bottom-start"
    trigger="click"
    v-model="showSelect"
  >
    <div class="maxh500 scroll" @scroll="handleScroll">
      <div v-for="item in selectData" :key="item.label" class="">
        <div class="hover-style aligncenter">
          <el-checkbox
            :label="item.prop"
            class="ml5"
            v-model="item.selected"
            @change="actionSelectData(item)"
          >
            {{ item.label | filterValue }}
          </el-checkbox>
        </div>
      </div>
    </div>
    <div slot="reference" class="dimension-setting rowstart aligncenter">
      <div class="dimension-select rowbetween aligncenter" :style="this.focus_style">
        <div class="rowstart">
          <div v-if="checkedData.length > 0" class="rowstart aligncenter">
            <div class="tag rowbetween aligncenter">
              <div class="font14">
                {{ checkedData[0].label | filterCheckedValue }}
              </div>
              <span @click="actionDeleteTag(checkedData[0])">关</span>
              <!-- <img
                class="size8"
                :src="require('@/assets/images/icon-close.png')"
                @click.stop.prevent="actionDeleteTag(checkedData[0])"
              /> -->
            </div>
            <div v-if="checkedData.length > 1" class="num">
              {{ checkedData.length }}
            </div>
          </div>
          <el-input
            @foucus="onInputFocus"
            @blur="onInputBlur"
            @input="fullSearchHandler"
            :value="userVal"
            type="text"
            ref="search"
            :placeholder="placeHolder"
            class="search-input"
          />
        </div>
        <i
          class="el-icon-error"
          v-if="checkedData.length > 0 && showSelect == true"
          @click="actionDeleteAll"
          style="color: #191919; opacity: 0.4"
        ></i>
        <i
          class="el-icon-arrow-down"
          v-if="checkedData.length == 0 && showSelect == false"
          
          style="color: #191919; opacity: 0.4"
        ></i>
        <i
          class="el-icon-arrow-up"
          v-if="checkedData.length == 0 && showSelect == true"
          @click="actionDeleteAll"
          style="color: #191919; opacity: 0.4"
        ></i>
      </div>
    </div>
  </el-popover>
</template>
<script>
export default {
  name: "mutiSelectLazyLoad",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    allData: {
      type: Object,
      default: () => ({}),
    },
    placeHolder: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      showSelect: false,
      checkedData: [],
      searchValue: "",
      focus_style: "",
      // selectData: [],
      page: 1,
      pageSize: 20,
      userVal: "",
      timer: null,
    };
  },
  methods: {
    handleScroll(event) {
      const { scrollTop, clientHeight, scrollHeight } = event.target;
      if (scrollTop + clientHeight > scrollHeight - 5) {
        this.page++;
      }
    },
    fullSearchHandler(val) {
      this.userVal = val;
      if (this.userVal?.length > 0) {
        this.showSelect = true;
      }
      this.page = 1;
    },
    onInputFocus() {
      let self = this;
      self.focus_style = "border: 1px solid #3573f3";
    },
    onInputBlur() {
      let self = this;
      self.focus_style = "border: 1px solid #e1e4ea";
    },
    actionSelectData(item) {
      let key = null;
      this.checkedData = this.selectData.filter((item) => {
        key = item.name;
        return item.selected;
      });
      let tempArr = this.checkedData.map((item) => {
        let proCode = item.label.split(",")[0];
        return proCode;
      });
      let form = {};
      form[key] = tempArr;
      this.$emit("setMutiSelectFormData", form);
    },
    actionDeleteTag(tag) {
      let key = null;
      for (let obj of this.selectData) {
        if (obj.label == tag.label && obj.name == tag.name) {
          obj.selected = false;
        }
        key = obj.name;
      }
      this.checkedData = this.selectData.filter((item) => {
        return item.selected;
      });
      let tempArr = this.checkedData.map((item) => {
        let proCode = item.label.split(",")[0];
        return proCode;
      });
      let form = {};
      form[key] = tempArr;
      this.$emit("setMutiSelectFormData", form);
    },
    actionDeleteAll() {
      let key = null;
      for (const item of this.data) {
        key = item.name;
      }
      let form = {};
      form[key] = [];
      this.clearCheckKeys();
      this.$emit("setMutiSelectFormData", form);
    },
    clearCheckKeys() {
      this.userVal = "";
      this.checkedData = [];
      for (let item of this.data) {
        item.selected = false;
      }
    },
  },
  filters: {
    filterValue(val) {
      if (val.length > 0) {
        if (val.length > 5) {
          let arr = val.split(",");
          return arr.length >= 5 ? arr[0] + "-" + arr[4] : val;
        }
        return "";
      }
    },
    filterCheckedValue(val) {
      if (val.length > 0) {
        if (val.includes(",")) {
          let arr = val.split(",");
          return arr[0];
        } else if (val.includes("-")) {
          let arr = val.split("-");
          return arr[0];
        } else {
          return val;
        }
      }
      return "";
    },
  },
  computed: {
    filterAllData() {
      return this.data.filter(
        (item) =>
          item.label.includes(this.userVal) ||
          item.label.includes(this.userVal.toUpperCase())
      );
    },
    selectData() {
      return this.filterAllData.slice(0, this.page * this.pageSize);
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-input__inner {
  height: 32px;
  line-height: 32px;
  background: rgba($color: #fff, $alpha: 0);
  border-width: 0px;
  color: rgba($color: #000, $alpha: 0.7);
}
::v-deep .el-checkbox {
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #4a4a4a;
  }
  .el-checkbox__label {
    color: #4a4a4a;
  }
}
.tag {
  padding: 0 6px;
  color: #3573f3;
  background-color: rgba(53, 115, 243, 0.1);
  border: 0.8px solid #3573f3;
  border-radius: 2px;
  height: 24px;
  line-height: 24px;
  white-space: nowrap;
}
.num{
  width: 16px;
  height: 16px;
  background-color: rgba($color: #3573f3, $alpha: 0.1);
  border: 1px solid #3573f3;
  color: #3573f3;
  border-radius: 2px;
  line-height: 16px;
  text-align: center;
  font-size: 10px;
}
.maxh500{
  max-height: 500px;
}
.search-input{
  max-width: 180px;
  min-width: 40px;
  height: 32px;
  z-index: 99;
}
.dimension::after{
  content: "*";
  color: #f62722;
  margin-left: 4px;
}
.dimension-select{
  border: 1px solid rgba(255,228,234,1);
  border-radius: 4px;
  width: 220px;
  height: 32px;
  padding-right: 10px;
}
.hover-style{
  height: 24px;
  margin: 5px 0;
  &:hover{
    background-color: #d9e5ff;

  }
}
::v-deep.el-input__inner {
  .dimension-setting{
    border-color: #3573f3
  }
}
.icon-close {
  opacity: 0.4;
}
.icon-close:hover {
  opacity: 1;
}
</style>
