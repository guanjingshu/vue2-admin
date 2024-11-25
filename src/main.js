import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import TreeTable from '@/components/Table/TreeTable'
import BbTable from '@/components/Table/BbTable'
import TableSetting from '@/components/Table/TableSetting'
import SearchPanel from '@/components/Search/index.vue'

// import { Popup } from 'vant'
// Vue.use(Popup)

import Vant from 'vant';
import 'vant/lib/index.css';

import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts



Vue.use(Vant);

Vue.component('TreeTable', TreeTable)
Vue.component('BbTable', BbTable)
Vue.component('TableSetting', TableSetting)
Vue.component('SearchPanel', SearchPanel)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })

Vue.use(ElementUI, { zhLocale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// 表格内数据太长， 默认开启提示
ElementUI.TableColumn.props.showOverflowTooltip = {
  type: Boolean,
  default: true
}

Vue.config.productionTip = false
Vue.prototype.$getColumnRow = (mutiRowColumns, tableData) => {
    let rowSpans = []
    for(const obj of mutiRowColumns){
      let autoRows = {}
      autoRows.columnName = obj
      autoRows.rowSpan = getRowSpan(obj, tableData,mutiRowColumns)
      rowSpans.push(autoRows)
    }
    return rowSpans
}
// 合并rows相同的数据，合计和小计 columnProps横向合并
function getRowSpan(prop, tableData, columnProps = []) {
  console.log("71----tableData",tableData)
  let preColumnIndex = columnProps.indexOf(prop) - 1 >= 0 ? columnProps.indexOf(prop) - 1 : 0
  let preColumn = columnProps[preColumnIndex]
  let mutiRows = []
  let preIndex = 0
  for (let i = 1; i < tableData.length; i++) {
    let pre = tableData[i-1]
    let now = tableData[i]
    console.log("78---pre", pre)
    if(!pre.hasOwnProperty(prop)){
      continue
    }
    if(pre[prop]==now[prop] && pre[preColumn]==now[preColumn]){
      const rowSpan = {from:i, value: {rowspan:0, colspan:0}}
      mutiRows.push(rowSpan)
    }else {
      let colspan = getColSpan(pre, columnProps, prop, preIndex, i-preIndex, tableData)
      const rowSpan = {from:preIndex, value: {rowspan:i-preIndex, colspan:colspan}}
      mutiRows.push(rowSpan)
      preIndex = i
    }
    if(i == tableData.length - 1){
      if(pre[prop]==now[prop] && pre[preColumn]==now[preColumn]){
        let colspan = getColSpan(now, columnProps, prop, preIndex, i-preIndex+1, tableData)
        const rowSpan = {from:preIndex, value: {rowspan:i-preIndex+1, colspan:colspan}}
        mutiRows.push(rowSpan)
      } else {
        let colspan = getColSpan(now, columnProps, prop, preIndex, 1, tableData)
        const rowSpan = {from:preIndex, value: {rowspan:1, colspan:colspan}}
        mutiRows.push(rowSpan)
      }
    }
  }
  return mutiRows
}

function getColSpan(obj, columnProps,columnDefault, startIndex, rowspan, tableData=[]){
  let colspan = 1
  let index = columnProps.indexOf(columnDefault)
  for(let j = index; j < columnProps.length; j++){
    let columnProp = columnProps[j]
    let now = obj[columnProp]
    let firstPre = index == 0 ? 'no first column' : obj[columnProps[index-1]]
    let pre = j == 0 ? 'no first column' : obj[columnProps[index-1]]
    let next = j < columnProps.length - 1 ? obj[columnProps[j+1]] : 'no last column'
    if(now != firstPre){
      if(now == next){
        // 解决L型数据问题，如果当前列和下一列相同，则合并下一列
        if(rowspan > 1){
          let nextColumnRowSpan = 1
          let loopNum = startIndex + rowspan < tableData.length ? startIndex + rowspan : tableData.length
          for(let i = startIndex; i < loopNum; i++){
            let row = tableData[i]
            let rowNext = i + 1 < tableData.length ? tableData[i+1] : {}
            let startColumn = index + 1 <columnProps.length ? columnProps[index+1] : null
            if(startColumn){
              let nowValue = row[startColumn]
              let nextValue = rowNext[startColumn]
              if(nowValue == nextValue){
                nextColumnRowSpan++
              } else {
                break
              }
            }
          }//for end
          if(rowspan == nextColumnRowSpan){
            colspan++ //下一列和当前列相同，横向合并+1
          }
        } else {  //rowspan > 1
          colspan++ 
        }
      } else { // now == next
        break
      }
    } else { // now != firstPre
      if(rowspan == 0){
        colspan = 0
      }
      // 顺序比对
      let startRowSpan = 1
      for(let i = startIndex; i < tableData.length; i++){
        let row = tableData[i]
        let rowNext = i + 1 < tableData.length ? tableData[i+1] : {noData: true}
        let startColumn = index == 0 ? null : columnProps[index-1]
        if(startColumn){
          let nowValue = row[startColumn]
          let nextValue = rowNext[startColumn]
          if(nowValue == nextValue){
            if(rowNext.noData && !nextValue){
              continue
            }
            startRowSpan++
          } else { //nowValue == nextValue
            break
          }
        }

      }//for end
      // 倒叙比对
      let endRowSpan = 1
      for(let i = startIndex; i >= 0; i--){
        let row = tableData[i]
        let rowNext = i - 1 >= 0 ? tableData[i-1] : {noData: true}
        let startColumn = index == 0 ? null : columnProps[index-1]
        if(startColumn){
          let nowValue = row[startColumn]
          let nextValue = rowNext[startColumn]
          if(nowValue == nextValue){
            if(rowNext.noData && !nextValue){
              continue
            }
            endRowSpan++
          }else{
            break
          }
        }
      }

      if(startRowSpan > 1 && startRowSpan != rowspan){
        colspan = 1
        for (let k = j; k<columnProps.length; k++){
          let columnProp = columnProps[k]
          let now = obj[columnProp]
          let next = k < columnProps.length - 1 ? obj[columnProps[k+1]] : 'no last column'
          let firstPre = k == 0 ? 'no first column' : obj[columnProps[k-1]]
          if(now == next){
            colspan++
          }else{
            break
          }
        }
      } else if(endRowSpan > 1 && endRowSpan != rowspan){
        for(let k=j;k<columnProps.length;k++){
          let columnProp = columnProps[k]
          let now = obj[columnProp]
          let next = k < columnProps.length - 1 ? obj[columnProps[k+1]] : 'no last column'
          if(now == next){
            colspan++
          }else{
            break
          }
        }
      }else {
        colspan = 0
      }
      break
    } // now != firstPre

    
  }
  return colspan
}
Vue.prototype.$formatNumber = (num, cent, isThousand, canSee = true, ) =>{
  
  if(num==='' || num === null || num === undefined){
    return '-'
  }
  if(Number(num) === 0){
      return '0'
  }

  if(!num){
    return num
}

  if(!canSee){
      return "****"
  }
  num = num.toString()
  if(isNaN(num)){
      return num
  }
  let sign = (num == (num = Math.abs(num)))
  num = Math.floor(num * Math.pow(10, cent) + 0.50000000000001); //把指定的小数位先转换成整数，多余的小数位四舍五入
  let cents = num % Math.pow(10, cent); //求出小数位数值
  num = Math.floor(num / Math.pow(10, cent)).toString(); //求出整数位数值
  cents = cents.toString(); //把小数位转换成字符串，以便求小数位长度
  // 补足小数位到指定的位数
  while(cents.length < cent){
      cents = "0" + cents;
  }
  if(isThousand){
      // 对整数部分进行千分位格式化.
      for(let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++){
          num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
      }
  }
  if(cent > 0){
      return (((sign) ? '' : '-') + num + '.' + cents);
  }else{
      return (((sign) ? '' : '-') + num);
  }
}
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
