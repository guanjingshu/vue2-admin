<template>
  <div class="app-container">
    <SearchPanel
      ref="search"
      :searchData="searchData"
      @actionSearch="actionSearch"
    />
    <!-- <TableSetting :tableColumnSetting="tableColumns"></TableSetting> -->
    <BbTable
      :table-column="tableColumns"
      :table-data="tableData"
      
    ></BbTable>
  </div>
</template>
<script>
import {productColumns} from './tableColumn.js'
import dayjs from 'dayjs'
export default {
  name: 'Table1',
  data() {
    return {
      searchData: [ {name:'date',inputType:'date'},],
      tableData:[],
      tableColumns: [
        // {
        //   prop: "date",
        //   label: "日期",
        //   width: "180",
        //   align: "center",
        //   sortable: true,
        //   fixed: false,
        //   showOverflowTooltip: true,
        //   type: "left",
        // },
        // {
        //   prop: "name",
        //   label: "姓名",
        //   width: "180",
        //   align: "center",
        //   sortable: true,
        //   fixed: false,
        //   showOverflowTooltip: true,
        //   type: "left",
        // },
        // {
        //   prop: "address",
        //   label: "地址",
        //   width: "180",
        //   align: "center",
        //   sortable: true,
        //   fixed: false,
        //   showOverflowTooltip: true,
        //   type: "left",
        // },
        // {
        //   prop: "left",
        //   label: "左侧",
        //   width: "180",
        //   align: "center",
        //   sortable: true,
        //   fixed: false,
        //   showOverflowTooltip: true,
        //   type: "left",
        // },
        // {
        //   prop: "right",
        //   label: "右侧",
        //   width: "180",
        //   align: "center",
        //   sortable: true,
        //   fixed: false,
        //   showOverflowTooltip: true,
        //   type: "left",
        // },
      ],
    }
  },
  created() {
    this.$nextTick(() => {
      this.tableColumns = productColumns
    })
  },
  mounted() {
    let a = 'aaa,bbb'
    let b = '是AAA,是BBB'
    this.tableColumns = productColumns
    this.getTableColumn(this.tableColumns,a.split(','),b.split(','))
    this.setDefaultForm()
    console.log('table1 mounted')
  },
  methods: {
    setDefaultForm(){
      this.$refs.search.form = {}
      const date = dayjs(new Date()).add(-1,'day')
      this.$set(this.$refs.search.form, 'date',date) 
    },
    actionSearch(form) {
      console.log("196", form);
    },
    // table 一级表头
    getTableColumn(table,allColumns,columnsDesc){
      console.log('table',table)
      console.log('allColumns',allColumns)
      console.log('columnsDesc',columnsDesc)

      let columnDic = {}
      if(allColumns.length == columnsDesc.length){
        for(let i = 0;i<allColumns.length;i++){
          let key = allColumns[i]
          columnDic[key] = columnsDesc[i]
        }
      }
      for(let item of table){
        let subColumns = []
        switch (item.prop){
          case "PROD_MODE2" :{
            subColumns = [
              "aaa",
              "bbb",
            ];
            break;
          }
          default:
            break;
        }
        let columns = this.getSubColumns(subColumns, columnDic,allColumns,item.selected)
        if(item.columns.length == 0 || columns.some((v)=>v.prop === 'ccc')){
          this.$set(item,'columns',columns)
        }
      }
    },
    getSubColumns(sectionColumns, columnDic, allColumns, selected) {
      let columns = [];
      let id = 0;
      for(const column of allColumns){
        if(sectionColumns.includes(column)){
          id++;
          let width = 120
          let align = "left";
          if(["PROD_MODE2"].includes(column)){
            width = 180
            align = "right"
          }
          let obj = {
            prop: column,
            label: columnDic[column],
            selected: selected,
            minWidth: width,
            id: id,
            align: align,
          }
          columns.push(obj)
        }
      }
      return columns;

    },
    modifyData(list){
      if(list){
        for(let item of list){
          [''].map((key)=>{
            item[key] = [''].some((v)=>v === key)?this.$formatNumber(item[key],[''].includes(key)?4:2,1):this.$formatNumber(item[key],2,1)
          })
        }
      }
      return list || []
    }
  }
}
</script>
<style lang="scss" scoped></style>