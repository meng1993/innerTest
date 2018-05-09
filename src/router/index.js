import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import applyDetail from '@/page/apply_detail'
import resultSuccess from '@/page/result_success'
import lookResult from '@/page/look_result'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/applyDetail',
      name: 'applyDetail',
      component: applyDetail
    },
    {
      path: '/resultSuccess/:mobile/:time/:id',
      name: 'resultSuccess',
      component: resultSuccess
    },
    {
      path: '/lookResult',
      name: 'lookResult',
      component: lookResult
    }
  ]
})
