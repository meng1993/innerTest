<template>
  <div class="result" ref="bg">
    <!--已通过审核-->
    <template v-if="passAudit">
      <div class="result_top">
        <div class="result_message">
          <div class="result_common">
            <span class="name">登录账号：</span>
            <span class="name_val">{{mobile}}</span>
          </div>
          <div class="result_common">
            <span class="name">初始密码：</span>
            <span class="name_val">手机号后6位</span>
          </div>
          <div class="result_common result_data">
            有效期：剩余{{day}}天{{hour}}小时
          </div>
        </div>
      </div>
    </template>
    <!--审核已过期-->
    <template v-else>
      <div class="result_past">
          <div class="no_pass">
            <div>
              您好，您的体验期已到期,如需要深入了解或体验，请联系我们，我们将为您提供更加全面的服务和体验机会！
            </div>
            <div class="btn_phone">立即联系</div>
          </div>
      </div>
    </template>
    <ul class="app_download">
      <li>
        <img src="../../static/image/icon_app.png">
        <span class="app_name">教师中心PC端地址</span>
        <span class="operate" v-clipboard:copy="teachCenterUrl">复制</span>
      </li>
      <li>
        <img src="../../static/image/icon_app.png">
        <span class="app_name">教师中心APP</span>
        <span class="operate">立即使用</span>
      </li>
      <li>
        <img src="../../static/image/icon_app.png">
        <span class="app_name">学生端APP</span>
        <span class="operate">立即使用</span>
      </li>
    </ul>
    <div class="result_bottom">业务咨询：0851-85518248</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        show: true,
        passAudit: true,   //true：审核通过，false：已到期
        teachCenterUrl: 'http://class.civaonline.cn//middle/civaLogin.do',
        mobile: '',
        timeStart: '',
        timeEnd: '',
        day: '',
        hour: '',
      }
    },
    mounted(){
      this.typeFun()
      this.bgFunction()
    },
    methods: {
      bgFunction(){
        if(this.passAudit){
          document.getElementsByClassName('result')[0].style.background = "url('../../static/image/success_bottom_bg.png') 0 0 no-repeat"
        }
        else {
          document.getElementsByClassName('result')[0].style.background = "url('../../static/image/overdue_bg.png') 0 0 no-repeat"
        }
      },
      typeFun(){
        let type = this.$route.params.id
        if(type === '1'){
          this.mobile = this.$route.params.mobile
          let hours = this.$route.params.time;
          this.day = parseInt(hours / 24)
          this.hour = hours % 24
        }
        else if(type === '2'){
          this.passAudit = false
        }
      }
    }
  }
</script>
<style lang="scss">
  @import "../style/result";
</style>
