<template>
  <div>
  <!-- {{ tableColumns }} -->
    <draggable v-model="tableColumns" group="people" @start="drag=true" @end="actionDragEnd">
      <transition-group>
        <div v-for="(item,index) in tableColumns" :key="item.prop">
          <div>
            <el-checkbox :label="item.prop" @change="actionSelectColumnChange">
              {{ item.label }}
            </el-checkbox>
          </div>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
export default {
  name: "TableSetting",
  components: { draggable, },
  mixins: [],
  props: {
    tableColumnSetting: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      //
      tableColumns:[]
    };
  },
  watch: {
    tableColumnSetting: {
      handler(val) {
        this.tableColumns = val;
        console.log("this.tableColumns",this.tableColumns)
      },
      deep: true,
      immediate:true
    },
  },
  provide() {
    return {
      //
    };
  },
  methods: {
    actionDragEnd(){
      if(this.$parent.actionChangeOtherTableColumns){
        this.$parent.actionChangeOtherTableColumns(this.tableColumns
          
        )
      }
    },
    actionSelectColumnChange(val,e){
      let prop = e.target.value;
      for(const father of this.tableColumns){
        if(father.prop == prop){
          this.setChildSelected(father,val);
          break;
        }
        if(father.columns && father.columns.length > 0){
          let fatherSelected = true;
          
          for(const sub of father.columns){
            if(sub.prop == prop){
              this.setChildSelected(sub,val);
            }
            if(sub.selected){
              fatherSelected = true;
            
            }
            father.selected = fatherSelected;
            if(sub.columns && sub.columns.length > 0){
              let sonSelected = false;
              for(const son of sub.columns){
                if(son.selected){
                  subSelected = true;
                  sonSelected = true;
                }
                father.selected = fatherSelected;
                sub.selected = subSelected
              }
              
            }
          }
        }
      }
    },
    setChildSelected(father, isSelected){
      if(father.columns){
        for(const sub of father.columns){
          sub.selected = isSelected;
          if(sub.columns){
            for(const son of sub.columns){
              son.selected = isSelected;
            }
          }
          }
      }
    }
  },
};
</script>
