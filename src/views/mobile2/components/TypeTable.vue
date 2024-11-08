<template>
  <div>
    <DateTable
      ref="typeTable"
      :loadding="isLoading"
      :tableColumn="tableColumn"
      :tableData="tableData"
      :tableHeadStyle="whichTable?tableHeadStyle:(()=>{})"
      :row-style="rowStyle"
      :cell-style="cellStyle"
      :cellClassName="cellClassName"
    />
  </div>
</template>
<script>
import DateTable from "@/components/Table/BbTable.vue";
export default {
  name: "TypeTable",
  components: {
    DateTable
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    tableColumn: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    cellStyle: {
        type: Function,
    },
    cellClassName: {
        type: Function,
    },
    isBold: {
        type: Boolean,
        default: true
    },
    whichTable: {
      type: Boolean,
      default: true
    },
  },
  methods: {
      tableHeadStyle({row, column, rowIndex, columnIndex}){
          const borderCfg = [
            '#6C6CA7',
            '#ED6A0C',
            '#FAAB0c',
            '#3573F3',
            '#57A9Fb',
          ]
          if(rowIndex === 0){
            return {
                color: '#323233',
                backgroundColor: '#F0F2F5',
                padding: 0,
                borderTop:`3px solid ${borderCfg[columnIndex%4]}`,
            }
          }else if(rowIndex === 1){
            return {
                color: '#646566',
                backgroundColor: '#F8F9FC',
                padding: 0,
            }
          }
      },
      rowStyle({row, rowIndex}){
          let backgroundColor = '#ffffff'
          if(rowIndex%2 === 0){
              backgroundColor = '#F6FAFF'
          }
          if(row.AMOUNT6 === '加粗'){
            if(this.isBold){
                return {
                    backgroundColor: backgroundColor,
                    color: '#323233',
                    fontWeight: 600,
                }
            }else{
                return {
                    backgroundColor: backgroundColor,
                    color: '#323233'
                }
            }
          } else{
            return {
                backgroundColor: backgroundColor,
                color: '#323233'
            }
          }
      }
  }

};
</script>
