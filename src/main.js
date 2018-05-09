import Vue from 'vue'
import App from './App'
import router from './router'
import Rem from '../static/js/rem'
import ResetCss from '../static/css/reset.css'
import VueClipboard from 'vue-clipboard2'
import {Cell,CellGroup,Field,Button,Picker} from 'vant'
Vue.use(Cell).use(CellGroup).use(Field).use(Button).use(Picker)
Vue.use(VueClipboard)


//引用api文件
import api from './api/index'
//将api方法绑定到全局
Vue.prototype.$api = api


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  Rem,
  ResetCss,
  components: { App },
  template: '<App/>'
})
