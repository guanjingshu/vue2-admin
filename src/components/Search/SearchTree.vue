<template>
  
  <el-popover popper-class="popover-tree" placement="bottom-start" v-model="isShow">
    <!-- {{ isShow }} -->
    <div class="padding20 scroll maxh630">
      <el-input placeholder="请搜索">
        <div slot="suffix">
          <i class="el-icon-search"></i>
        </div>
      </el-input>
      <el-tree class="mt10" ref="tree" :node-key="nodeKeyName" default-expand-all :data="data" show-checkbox :props="defaultProps"
      :filter-node-method="getFilterValues" check-on-click-node @check="actionNodeCheck"></el-tree>
    </div>
    <div slot="reference" class="rowstart aligncenter">
      <div class="dimension-select rowbetween aligncenter" :style="focus_style">
        <div v-if="checkedNodes.length > 0" class="rowstart aligncenter ml2">
          <div class="tag mr2 rowbetween aligncenter">
            <div class="elipis font14 mr4">
              {{ checkedNodes[0].label | filterCheckedValue }}
            </div>
            <div @click.stop.prevent="actionDeleteTag(checkedNodes[0])">
              <i class="el-icon-error"></i>
            </div>
            <!-- <img class="size8" :src="require('@/assets/images/close.svg')" @click="checkedNodes = []"/> -->
          </div>
          <div v-if="checkedNodes.length > 1" class="num">
            {{ checkedNodes.length }}
          </div>
        </div>
        <div v-else>{{ treeData.label }}</div>
        <i class="el-icon-error" v-if="checkedNodes.length > 0&&isShow==true" @click="actionDeleteAll" style="color:#191919;opacity:0.4"></i>
        <i class="el-icon-arrorw-down" v-if="checkedNodes.length == 0&&isShow==false" style="color:#191919;opacity:0.4"></i>
        <i class="el-icon-arrow-up" v-if="checkedNodes.length == 0&&isShow==true" style="color:#191919;opacity:0.4"></i>
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
    value: { //v-model的值
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
    filterValue: {
      handler(val, oldVal) {
        if (val == oldVal) return;
        this.$refs["tree"].filter(val);
      },
    },
    isShow: {
      handler(val, oldVal) {
        if (this.isShow) {
          this.focus_style = "border: 1px solid #3573f3;border-radius: 4px;";
        } else {
          this.focus_style = "border: 1px solid #e1e4ea;border-radius: 4px;";
        }
      },
    },
  },
  mounted() {
    console.log("this.isShow",this.isShow);
  },
  methods: {
    getFilterValues(val, data) {
      if (!val) return true;
      return data.label.indexOf(val) > -1;
    },
    actionNodeCheck(e, checkedData) {
      this.checkedForm = {};
      this.checkedNodes = [];
      let nodes = [];
      if (this.filterCheckAll) {
        nodes = checkedData.checkedNodes.filter((item) =>
          item.label.includes(this.filterValue)
        );
        this.$nextTick(() => {
          this.$refs["tree"].setCheckedNodes(nodes);
        });
      } else {
        nodes = checkedData.checkedNodes;
        this.$emit("input", nodes);
      }

      this.getCheckedData(nodes);
      console.log("this.checkedForm", this.checkedForm);
      this.$emit("setTreeFormData", this.checkedForm, (fatherForm) => {
        this.deleteFatherForm(nodes, e, fatherForm);
      });
      this.lastSelectKeys = Object.keys(this.checkedForm);
    },
    deleteFatherForm(nodes, item, fatherForm) {
      for (const key of this.lastSelectKeys) {
        delete fatherForm[key];
      }
    },
    getCheckedData(nodes) {
      let i = 0;
      for (const item of nodes) {
        if (item.name) {
          if (this.checkedForm[item.name] instanceof Array) {
            this.checkedForm[item.name].push(
              item.value ? item.value : item.label
            );
          } else {
            this.checkedForm[item.name] = [
              item.value ? item.value : item.label,
            ];
          }
          if (
            !this.checkedNodes.includes(item.value ? item.value : item.label)
          ) {
            this.$set(this.checkedNodes, i, item);
            i++;
          }
        }
      }
    },
    actionDeleteTag(tag) {
      for (let i = 0; i < this.checkedNodes.length; i++) {
        let item = this.checkedNodes[i];
        if (item.label == tag.label && item.name == tag.name) {
          this.checkedNodes.splice(i, 1);
        }
      }
      this.$emit("input", this.checkedNodes);
      this.checkedForm = {};
      for (let item of this.checkedNodes) {
        if (this.checkedForm[item.name] instanceof Array) {
          this.checkedForm[item.name].push(item.label);
        } else {
          this.checkedForm[item.name] = [item.label];
        }
      }
      this.$refs.tree.setCheckedKeys(
        this.checkedNodes.map((item) => {
          return item[this.nodeKeyName];
        })
      );
      this.$emit("setTreeFormData", this.checkedForm, (fatherForm) => {
        this.deleteFatherForm(this.checkedNodes, item, fatherForm);
      });
      this.lastSelectKeys = Object.keys(this.checkedForm);
    },
    actionDeleteAll() {
      this.clearCheckKeys();
      this.$emit("setTreeFormData", this.checkedForm, (fatherForm) => {
        this.deleteFatherForm(this.checkedNodes, {}, fatherForm);
      });
    },
    clearCheckKeys() {
      this.checkedNodes = [];
      this.checkedForm = {};
      this.$refs.tree.setCheckedKeys([]);
      this.$emit("input", []);
    },
  },
};
</script>
<style lang="scss" scoped>
.dimension-select{
  border: 1px solid rgba(225,228,234,1);
  border-radius: 4px;
  width: 220px;
  height: 32px;
  padding-left: 12px;
  padding-right: 10px;
}
.tag-container {
  word-break: break-all;
  overflow: hidden;
}
.tag {
  padding: 0 6px;
  color: #3573f3;
  background-color: rgba(53, 115, 243, 0.1);
  border: 0.8px solid rgba(53, 115, 243, 1);
  border-radius: 2px;
  height: 24px;
  line-height: 24px;
  white-space: nowrap;
}
.num{
  width: 16px;
  height: 16px;
  background-color: rgba($color: #3573f3, $alpha:0.1);
  border: 1px solid #3573f3;
  color: #3573f3;
  border-radius: 2px;
  line-height: 16px;
  text-align: center;
  font-size: 10px;

}
</style>
