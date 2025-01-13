<template>
    <div class="set_config">
        <el-dialog class="set_dialog" v-drag :title="tip_title" :visible="setConFlag" width="1200px" :before-close="handleClose" :modal-append-to-body="false">
          <div class="upload_main">
            <el-button @click="downloadTemplate">模板下载</el-button>
            <el-upload
              ref="upload"
              :action="uploadUrl"
              :http-request="httpRequest"
              drag
              :multiple="false"
              :on-success="onSuccessOfUploadExcel"
              accept=".xlsx,.xls"
              :show-file-list="true"
              :before-upload="beforeUpload"
              :limit="1"
              :auto-upload="false"

            >
            <div class="upload">
              <div>图标</div>
              <div class="upload_text">
                <span class="text_top">点击获将文件拖拽到这里上传</span><br/>
                <i class="text_bottom">注：类型为Excel</i>
              </div>
            </div>
            </el-upload>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button>取消</el-button>
            <el-button @click="SubmitFn">提交</el-button>
            <el-button @click="actionExport">导出</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script>
import { export_json_to_excel_sheets } from '@/vendor/Export2Excel';
export default {
  props: {
    setConFlag:{
      type:Boolean,
    },
    tip_title: {
      type: String,
    }
  },
  data(){
    return{
      uploadUrl:process.env.VUE_APP_BASE_API +'/soa/data/import'
    }
  },
  methods:{
    SubmitFn(){
      this.$refs.upload.submit()
    },
    downloadTemplate(){
      const fields = ['id','name','age','sex']
      export_json_to_excel_sheets([{
        appendData: [],
        appendOrigin:1,
        data: [],
        filename: '模板',
        header: fields,
        merges: [],
        multiHeader:[fields]
      }])

    },
    actionExport(){
      const fields = ['id','name','age','sex']
      export_json_to_excel_sheets([{
        appendData: [],
        appendOrigin:1,
        data: [[1,'张三',18,'男'],[2,'李四',19,'女']],
        filename: '模板',
        header: fields,
        merges: [],
        multiHeader:[fields]
      }])
    },
    handleClose(){
      this.$emit('setting')
      this.setData = []
    },
    httpRequest(params){
      const formData = new FormData()
      formData.append('mapping_id','40013506')
      // formData.append('mapping_id','40013506')
      // formData.append('mapping_id','40013506')
      formData.append('file',params.file)

      fetch(params.action,{
        method: 'POST',
        body: formData

      }).then(response=>response.json()).then(res=>{
        console.log(res)
        if(res.success){
          this.tableData = []
          this.$message({
            message: '导入成功',
            type: 'success'
          })
          this.$parent.getList()
        }else{
          if(Array.isArray(res.data)){
            this.tableData = res.data
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    onSuccessOfUploadExcel(response, file, fileList){
      this.$message({
        message: '导入成功',
        type: 'success'
      })
    },
    beforeUpload(){

    }
  }
}
</script>
<style lang="scss" scoped>
</style>