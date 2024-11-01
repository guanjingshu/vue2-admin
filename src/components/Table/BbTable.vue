<template>
  <div>
    <el-table ref="xyTable" :data="tableData" :span-method="arraySpanMethod" :header-cell-style="tableHeadStyle" @sort-change="SortChangeFn">
      <el-table-column
        v-if="hasSelection"
        type="selection"
        :reserve-selection="true"
        
      >
      </el-table-column>
      <template v-for="(father, index) in tableColumn">
        <template v-if="father.selected">
          <el-table-column
            :key="index + father.prop"
            :prop="father.prop"
            :label="father.label"
            :sortable="father.sortable"
            :render-header="(h,params)=>renderHeader(h,params,father)"
          >
            <template v-if="father.columns && father.columns.length > 0">
              <template v-for="(item, itemIndex) in father.columns">
                <template v-if="item.selected">
                  <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    :render-header="(h,params)=>renderHeader(h,params,item)"
                  >
                  <template v-if="item.columns && item.columns.length > 0">
                    <template v-for="(subItem, subIndex) in item.columns">
                      <template v-if="subItem.selected">
                        <el-table-column v-if="!subItem.render" :prop="subItem.prop" :key="itemIndex*100 + subIndex*10 + subItem.prop" :label="subItem.label"  :v-bind="subItem" :width="subItem.width" :min-width="subItem.minWidth" :align="subItem.align">
                          
                        </el-table-column>
                        <template v-else>
                          <el-table-column :key="itemIndex*100 + subIndex*10 + subItem.prop" :label="subItem.label" :prop="subItem.prop" :v-bind="subItem" :width="subItem.width" :min-width="subItem.minWidth" :align="subItem.align">
                            <template slot-scope="scope">
                              <Item v-if="subItem.render" :render="subItem.render" :scope="scope" :title="subItem.prop"></Item>
                            </template>
                            </el-table-column>
                        </template>
                      </template>
                      </template>
                  </template>
                  
                  </el-table-column>
                </template>
              </template>
            </template>
          </el-table-column>
        </template>
      </template>
      <el-table-column v-if="noOperation" label="操作" width="150">
        <template slot-scope="scope">
         <slot :row="scope.row" :index="scope.$index"></slot>
        </template>
      </el-table-column>
    
      <template slot="empty">
        <div class="no_data" :style="{ height: height + 'px' }">
          <img class="nodataimg" src="../../assets/404_images/404.png" alt="" />
          <p>暂无数据</p>
        </div>
      </template>
    </el-table>
    <div class="rowend">
      <XyPagination v-if="showPage" class="xy-page" :child-msg="pageInfo" @callFather="getPageParam"></XyPagination>
    </div>
  </div>
</template>
<script>
import Item from "./Item.vue";
import XyPagination from "@/components/Pagination/Pagination"
export default {
  name: "BbTable",
  components: {
    Item,
    XyPagination
  },
  props: {
    showPage: {
      type: Boolean,
      default: false,

    },
    pageInfo:{
      type: Object,
      default: () => {},
    },
    tableColumn: {
      type: Array,
      default: () => {
        return [];
      },
    },
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    hasSelection: {
      type: Boolean,
      default: false,
    },
    tableHeadStyle: {
      type: Function,
      default: () => {
        return {
          color: '#191919',
          background: '#F8F9FC',
          padding: '4px 0',
        };
      },
    
    },
    noOperation:{
      type: Boolean,
      default: () =>(false)
    },
    SortChangeFn:{
      type: Function,
      default: () => {},
    }

  },
  data() {
    return {
      height: 200,
    };
  },
  mounted() {
    this.height = this.$refs.xyTable.$el.clientHeight;
  },
  methods: {
    getPageParam(pageInfo) {
      if(this.multiSelection.length > 0){

      }

      if(this.$parent.actionPageChange){
        this.$parent.actionPageChange(pageInfo)

      }
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex % 2 === 0) {
          if (columnIndex === 0) {
            return [1, 2];
          } else if (columnIndex === 1) {
            return [0, 0];
          }
        }
      },

      renderHeader(h, {column, $index}, item){
        const tooltip = item?.tooltip
        let tips = null
        if(tooltip?.show === true && typeof tooltip?.content === 'string'){
          tips = h('el-tooltip', {props: {effect: 'dark', placement: 'top'}},
            [h('div',{slot: 'content', domProps:{innerHTML: tooltip?.content}}),
              h('i',{class:'el-icon-warning-outline',style: 'margin-left: 5px;'})
            ]
          )}
          if(item?.renderHeader instanceof Function){
            return item?.renderHeader(h,{column, $index}, $index)
          }
          return h('span', {}, [h('span', {},column.label), tips])
      }
  }
};
</script>
<style>
.nodataimg {
  width: 100px;
  height: 100px;
}
.no_data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: 14px;
}
</style>
