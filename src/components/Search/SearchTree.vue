<template>
  <el-popover popper-class="popover-tree">
    <div class="padding20">
      <el-input placeholder="请搜索">
        <div slot="suffix">
          <i class="el-icon-search"></i>
        </div>
      </el-input>
      <el-tree></el-tree>
    </div>
    <div slot="reference">
      <div class="dimension-select">
        <div v-if="checkedNodes.length > 0">
          <div class="tag">
            <div class="elipis">
              {{ checkedNodes[0].label | filterCheckedValue }}
            </div>
            <div>关闭</div>
            <!-- <img class="size8" :src="require('@/assets/images/close.svg')" @click="checkedNodes = []"/> -->
          </div>
          <div v-if="checkedNodes.length > 1" class="num">
            {{ checkedNodes.length }}
          </div>
        </div>
        <div v-else>{{ treeData.label }}</div>
        <i class="el-icon-error"></i>
        <i class="el-icon-arrorw-down"></i>
        <i class="el-icon-arrow-up"></i>
      </div>
    </div>
  </el-popover>
</template>
<script>
export default {
  name: "SearchTree",
  props: {
    value: {
      type: Array,
      // default: () => []
    },
    treeData: {
      type: Object,
      default: () => ({}),
    },
    nodeKeyName: {
      type: String,
      default: () => "id",
    },
  },
  filters: {
    filterValue(val) {
      if (val.length > 0) {
        let arr = val.split(",");
        return arr[0] + "-" + arr[4];
      }
      return "";
    },
    filterCheckedValue(val) {
      if (val.length > 0) {
        let arr = val.split(",");
        return arr[0];
      }
      return "";
    },
  },
  data() {
    return {
      data: [],
      filterValue: "",
      filterCheckAll: false,
      defaultProps: {
        children: "list",
        label: "label",
      },
      lastSelectKeys: [], //记录上一次的选中值
      checkedNodes: [],
      checkedForm: {},
      focus_style: "",
      isShow: false,
    };
  },
  watch: {
    value: {
      handler(newVal) {
        this.$nextTick(() => {
          if (Array.isArray(newVal)) {
            this.actionNodeCheck({}, { checkedNodes: newVal });
            this.$refs["tree"].setCheckedNodes(newVal);
          }
        });
      },
      immediate: true,
    },
    treeData: {
      handler(val, oldVal) {
        if (val == oldVal) return;
        this.data = this.treeData.list;
        this.filterCheckAll = !!this.treeData.filterCheckAll;
      },
      immediate: true,
    },
      filterValue:{
          handler(val, oldVal){
              if(val == oldVal) return
              this.$refs["tree"].filter(val)

          }

      },
      isShow:{
          handler(val, oldVal){
              if(this.isShow){
                this.focus_style = "border: 1px solid #3573f3;border-radius: 4px;"
              }else{
                  this.focus_style = "border: 1px solid #e1e4ea;border-radius: 4px;"
              }
          }
      }
  },
  methods: {
      getFilterValues(val, data){
        if(!val) return true
        return data.label.indexOf(val) > -1
      }
  }
};
</script>
<style lang="scss" scoped></style>
