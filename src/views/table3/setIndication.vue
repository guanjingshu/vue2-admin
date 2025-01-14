<template>
  <div class="set_con">
    <el-dialog :visible="setConFlag" :modal-append-to-body="false">
      <el-form>
        <el-row>
          <el-col :span="8">
            <el-form-item label="生效日期">
              <el-date-picker></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="更新人">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="更新时间">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="说明">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div>分类规则</div>
        <el-button type="primary" @click="addNewRuleGroup(maxRuleGroupIndex)">新建条件组</el-button>
        <el-table>
          <el-table-column label="一级分类" props="test1"></el-table-column>
          <el-table-column label="二级分类" props="test2"></el-table-column>
          <el-table-column label="三级分类" props="test3"></el-table-column>
          <el-table-column label="代表指数收益率" props="rate1"></el-table-column>
          <el-table-column label="浮动(BP)" props="rate2"></el-table-column>
          <el-table-column label="收益率(%)" props="rate3"></el-table-column>
        </el-table>
      </el-form>
      <div slot="footer">
        <el-button class="btn" @click="handleClose">取消</el-button>
        <el-button class="btn btn_te" @click="handleSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'setIndication',
  props: {
    recordId: {
      type: Number
    },
    setConFlag:{
      type:Boolean
    },
    tip_title: {
      type: String
    }
  },
  computed: {
    rowSpans(){
      return this.$getColumnRow(this.combineColumns, this.setData.tableData)
    }
  },
  data(){
    return{
      cellStyle: {paddingLeft:'10px'},
      combineColumns: ['test1','test2'],
      optionList:[{label:'选项1',value:'1'},{label:'选项2',value:'2'}],
      setData: {
        effective_date: new Date(),
        update_user: '',
        update_time: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        remark: '',
        tableData:[
          {test1: '1.现金类', test2: '1.1货币基金', test3: '1.1.1货币A', rate1: '1.0000', rate2: '0.00', rate3: '0.00'},
          {test1: '1.现金类', test2: '1.1货币基金', test3: '1.1.2货币B', rate1: '1.0000', rate2: '0.00', rate3: '0.00'},
          {test1: '1.现金类', test2: '1.1货币基金', test3: '1.1.2货币B', rate1: '1.0000', rate2: '0.00', rate3: '0.00'},
          {test1: '1.现金类', test2: '1.1货币基金', test3: '1.1.2货币B', rate1: '1.0000', rate2: '0.00', rate3: '0.00'},
          {test1: '1.现金类', test2: '1.1货币基金', test3: '1.1.2货币B', rate1: '1.0000', rate2: '0.00', rate3: '0.00'},
        ]
      },
      rules: {
        rate3: [{required: true, message: '请输入收益率', trigger: 'blur'}]
      }
    }
  },
  created(){},
  methods:{
    addNewRuleGroup(){
      this.handleAdd(maxRuleGroup + 1)
    },
    handleAdd(){
      
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }){
      for(let item of this.rowSpans){
        if(column.property == item.columnName){
          for(const obj of item.rowSpan){
            if(rowIndex == obj.from){
              return obj.value
            }
          }
        }
      }
    },
    getRange(time){
      return time.getTime() < dayjs(new Date()).add(-1,'day')
    },
    headerCellStyle(){
      return {background:'#f5f7fa',color:'#333',fontWeight:'bold'}
    },
    handleChange(val, index, row){
      this.$set(this.setData.tableData[index], 'rate2', (val*100).toFixed(2))
      this.$set(this.setData.tableData[index], 'rate3', (val*100).toFixed(2))
    },
    async getOptionsData(){},
    handleClose(){
      this.$emit('setting')
      this.setData = []
    },
    handleSubmit(){
      this.$refs['setDataForm'].validate((valid,object) => {
        if (valid) {
          this.$emit('setting')
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>
