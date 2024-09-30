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

Vue.config.productionTip = false
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
