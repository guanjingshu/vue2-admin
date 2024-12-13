<template>
  <div v-if="tableColumnSetting.length > 0">
    <el-popover popper-class="popover-column-setting" placement="bottom" trigger="click" v-model="showSettingPanel">
      <div class="line"></div>
      <div class="padding20 h500 scroll">
      <draggable
        v-model="tableColumns"
        group="people"
        @start="drag = true"
        @end="actionDragEnd"
      >
        <transition-group>
          <div v-for="(item, index) in tableColumns" :key="item.prop">
            <div>
              <!--一级-->
              <i
                class="font16"
                @click="actionShowMoreColumn(item)"
                :class="
                  item.showSub ? 'el-icon-caret-bottom' : 'el-icon-caret-right'
                "
              ></i>
              <el-checkbox
                :label="item.prop"
                v-model="item.selected"
                @change="actionSelectColumnChange"
              >
                {{ item.label }}
              </el-checkbox>
            </div>
            <div class="subs" v-if="item.showSub">
              <!--二级-->
              <draggable
                v-model="item.columns"
                @end="actionDragEnd"
                class="column"
                forceFallback="true"
                fallbackClass="fallClass"
                handle=".sortsub"
                animation="300"
                scroll-speed="500"
              >
                <transition-group>
                  <div v-for="sub in item.columns" :key="sub.prop">
                    <div class="rowstart aligncenter ml50">
                      <i
                        class="font16"
                        @click="actionShowMoreColumn(sub)"
                        :class="
                          sub.showSub
                            ? 'el-icon-caret-bottom'
                            : 'el-icon-caret-right'
                        "
                      ></i>
                      <div class="w200">
                        <el-checkbox
                          :label="sub.prop"
                          v-model="sub.selected"
                          @change="actionSelectColumnChange"
                        >
                          {{ sub.label }}
                        </el-checkbox>
                      </div>
                    </div>
                    <div class="grandson" v-if="sub.showSub">
                      <!-- 三级 -->
                      <draggable
                        v-model="sub.columns"
                        @end="actionDragEnd"
                        class="column"
                        forceFallback="true"
                        fallbackClass="fallClass"
                        handle=".sortson"
                        animation="300"
                        scroll-speed="500"
                      >
                        <transition-group>
                          <div
                            v-for="son in sub.columns"
                            :key="son.prop"
                            class="hover_style"
                          >
                            <div
                              class="rowstart aligncenter"
                              style="margin-left: 105px"
                            >
                              <img
                                class="sortson dragmove"
                                :src="require('@/images/zz.png')"
                              />
                              <div class="w200">
                                <el-checkbox
                                  :label="son.prop"
                                  v-model="son.selected"
                                  class="ml10"
                                  @change="actionSelectColumnChange"
                                >
                                  {{ son.label }}
                                </el-checkbox>
                              </div>
                            </div>
                          </div>
                        </transition-group>
                      </draggable>
                    </div>
                  </div>
                </transition-group>
              </draggable>
            </div>
          </div>
        </transition-group>
      </draggable>
    </div>
    <div slot="reference" class="aligncenter justcenter setting">
    <i class="el-icon-setting"></i>
      <!-- <svg-icon style="width:17px;height:17px" class="hover-setting point" icon-class="btn-setting" /> -->
    </div>
    </el-popover>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "TableSetting",
  components: { draggable },
  mixins: [],
  props: {
    tableColumnSetting: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showSettingPanel: false,
      tableColumns: [],
    };
  },
  watch: {
    tableColumnSetting: {
      handler(val) {
        this.tableColumns = val;
        console.log("this.tableColumns", this.tableColumns);
      },
      deep: true,
      immediate: true,
    },
  },
  provide() {
    return {
      //
    };
  },
  methods: {
    actionShowMoreColumn(item) {
      this.$set(item, "showSub", !item.showSub);
    },
    actionDragEnd() {
      if (this.$parent.actionChangeOtherTableColumns) {
        this.$parent.actionChangeOtherTableColumns(this.tableColumns);
      }
    },
    actionSelectColumnChange(val, e) {
      let prop = e.target.value;
      for (const father of this.tableColumns) {
        if (father.prop == prop) {
          this.setChildSelected(father, val);
          break;
        }
        if (father.columns && father.columns.length > 0) {
          let fatherSelected = true;

          for (const sub of father.columns) {
            if (sub.prop == prop) {
              this.setChildSelected(sub, val);
            }
            if (sub.selected) {
              fatherSelected = true;
            }
            father.selected = fatherSelected;
            if (sub.columns && sub.columns.length > 0) {
              let sonSelected = false;
              for (const son of sub.columns) {
                if (son.selected) {
                  subSelected = true;
                  sonSelected = true;
                }
                father.selected = fatherSelected;
                sub.selected = subSelected;
              }
            }
          }
        }
      }
    },
    setChildSelected(father, isSelected) {
      if (father.columns) {
        for (const sub of father.columns) {
          sub.selected = isSelected;
          if (sub.columns) {
            for (const son of sub.columns) {
              son.selected = isSelected;
            }
          }
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.te_sty {
  border-bottom: 1px solid rgba(51, 51, 51, 0.1);
}
.hover-style {
  margin-top: 10px;
  margin-bottom: 5px;
  line-height: 30px;
}
.hover-style:hover {
  background-color: #d9e5ff;
}
::v-deep .el-checkbox {
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #1a0205;
  }
  .el-checkbox__label {
    color: #1a0205;
  }
}
.hover_setting:hover {
  color: #3573f3;
}
.hover_setting {
  background: #f8f9fc;
}
.setting {
  background: #f8f9fc;
  border-left: 1px solid rgba(218, 223, 230, 1);
  border-bottom: 1px solid rgba(218, 223, 230, 1);
  width: 32px;
  height: 41px;
}
svg {
  outline: none;
}
.c1a0205 {
  color: #1a0205;
}
.scroll {
  overflow: auto;
}
.mr6 {
  margin-right: 6px;
}
.pt12 {
  padding-top: 12px;
}
.pr12 {
  padding-right: 12px;
}
.pl12 {
  padding-left: 12px;
}
.pb12 {
  padding-bottom: 12px;
}
.ml-12 {
  margin-left: -12px;
}
.mr-12 {
  margin-right: -12px;
}
.btn-box {
  bottom: 0;
  right: 0;
  left: 0;
}
.border-top {
  border-top: 1px solid #dcded0;
}
</style>
