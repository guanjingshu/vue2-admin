<template>
  <div>
    <div  >
      <el-table class="el-table" ref="rule_table" :data="tableData" style="width: 100%" :style="isShowChart?'height:410px;transition: all 0.5s':'height:0px;transition: all 0.5s'">
        <el-table-column prop="date" label="日期" width="180"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </div>
    <div class="unfold_btn">
      <div class="line"></div>
      <i :class="isShowChart? 'el-icon-arrow-up' : 'el-icon-arrow-down'" style="width:45px;height:22px;left:200px;cursor:pointer" @click="isShowChart=!isShowChart"></i>
    </div>
 </div>
</template>

<script>
import Sortable from "sortablejs";
export default {
  mounted() {
    this.rowDragDrop();
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      isShowChart: true,
    };
  },
  methods:{
    rowDragDrop(){
      const tableNormal = this.$refs['rule_table'].$el.querySelectorAll('.el-table__body-wrapper tbody')[0]; // 获取表格
      this.bindTableDragDrop(tableNormal); // 调用方法
    },
    bindTableDragDrop(table) {
      const _this = this;
      Sortable.create(table, {
        animation: 150, // 动画参数
        onMove(e,...args) {
          if (e.dragged.className?.includes('row-mode-add')){
            return false;
          }
          return true;
        },
        async onEnd({ newIndex, oldIndex }) {
          // console.log(newIndex, oldIndex, _this.tableData[newIndex].RN, _this.tableData[oldIndex].RN)

          if(_this.tableData[oldIndex].mode === 'add'){
            return
          }
          if(_this.tableData[oldIndex].mode !== 'add' && _this.tableData[oldIndex].RN!== _this.tableData[newIndex].RN){
            // ajax
            // const param = {
            //   old: _this.tableData[oldIndex].RN,
            //   new: _this.tableData[newIndex].RN
            // }
            // const {message, success} = await _this.$api.post('/api/xxx', param)

            _this.tableData.splice(newIndex, 0, _this.tableData.splice(oldIndex, 1)[0]);
            const newTableData = _this.tableData.slice(0);
            _this.tableData = [];

            _this.$nextTick(() => {
              _this.tableData = newTableData;
            });
          }
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep .el-table__row{
  cursor: move;
}
.unfold_btn{
  .line{
    text-align: center;
    width: 99%;
    height: 1px;
    background-color: #ebebef;
    margin: 10px 8px 0 8px;
  }
}
</style>
