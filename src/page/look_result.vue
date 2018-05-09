<template>
  <div class="apply_detail">
    <div class="detail_content">
      <div class="detail_content_title">申请单</div>
      <div class="detail_content_title_describe">线下3S+线上微课堂混合式教学</div>
      <!--填写个人信息-->
      <div class="form_message">
        <p class="message_line">
          <input type="text" class="message_common" placeholder="姓名" v-model="message.name" ref="name">
          <span class="icon_required">*</span>
        </p>
        <p class="message_line">
          <input type="text" class="message_common" placeholder="手机号" v-model="message.phone" ref="phone">
          <span class="icon_required">*</span>
        </p>
        <p class="message_line">
          <input type="text" class="message_common verification" placeholder="请输入验证码" v-model="message.verification" ref="verification">
          <span class="icon_required">*</span>
          <span class="get_verification" @click="getCode" v-if="this.code === true">获取</span>
          <span class="get_verification code_time" v-else>{{count}}s</span>
        </p>
      </div>
      <div v-if="commitFlg === false" class="btn_commit_no">提交信息</div>
      <div v-else class="btn_commit_no btn_commit_active" @click="commitMessage(message)">提交信息</div>
      <!--弹框开始-->
      <section class="commitShow" v-show="showChose">
        <div class="commit_content">
          <div class="header">提示</div>
          <template v-if="modalContent === 4">
            <div class="content">
              您的手机号已经注册过了，或您填写的信息不符合要求，请确认后重新填写。
            </div>
            <div class="btn_select">
              <div style="color: #0087fb;cursor: pointer" @click="againWrite">重新填写</div>
            </div>
          </template>
          <template v-else-if="modalContent === 5">
            <div class="content">
              您好，您的帐号已存在，如需要深入了解或体验，请联系我们0851-85518248！
            </div>
            <div class="btn_select">
              <div style="color: #0087fb;cursor: pointer" @click="againWrite">确定</div>
            </div>
          </template>
          <template v-else-if="modalContent === 6">
            <div class="content">
              您好，您的手机验证码不正确，请重新填写！
            </div>
            <div class="btn_select">
              <div style="color: #0087fb;cursor: pointer" @click="againWrite">确定</div>
            </div>
          </template>
        </div>
      </section>
      <!--弹框结束-->
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        message:{
          name:'',              //姓名
          phone:'',            //手机号
          verification:'',    //验证码
        },
        commitFlg: false,     //提交信息按钮是否能点击
        code: true,    //为true，为获取字样点击按钮，为false为倒计时
        timer: null,
        count: '',
        showChose:false,
        modalContent: ''
      }
    },
    methods:{
      getCode(){
        console.log(this.message.phone)
        this.$api.post('sendTrialVerificationCode.do',{mobile:this.message.phone}, r => {
          console.log(r)
        });
        const TIME_COUNT = 120;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.code = false
              this.count--
            } else {
              clearInterval(this.timer);
              this.timer = null;
              this.code = true
            }
          }, 1000)
        }
      },
      commitMessage(msg){
        console.log(msg)
        this.$api.post('trialQuery.do',{'name':this.message.name,'mobile' :this.message.phone,'verificationCode':this.message.verification}, r => {
          console.log(r)
          if(r.returnNo === '0058'){
            this.$router.push('/resultSuccess/'+this.message.phone+'/'+r.content.hours+'/1');
          }
          else if(r.returnNo === '0060'){
            // 首次登录开始计算
            this.$router.push('/resultSuccess/'+this.message.phone+'/1440/1');
          }
          else if(r.returnNo === '0059'){
            // 体验已经过期
            this.$router.push('/resultSuccess/'+this.message.mobile+'/1440/2');
          }
        },f => {
          if (f.returnNo === '0062') {
            // 0062，账号已存在，不能提交
            // alert('0062')
            this.showChose = true
            this.modalContent = 5
          }
          else if(f.returnNo === '0025'){
            this.showChose = true
            this.modalContent = 6
          }
          else {
            this.showChose = true
            this.modalContent = 4
          }
        });

      },
      againWrite(){
        this.showChose = false
        this.modalContent = 1
      },
    },
    watch:{
      message:{
        handler:function(val,oldval){
          console.log(val)
          let name = this.$refs.name.value;
          let phone = this.$refs.phone.value;
          let verification = this.$refs.verification.value;     //验证码

          let phoneFlg=/^[1][3,4,5,7,8][0-9]{9}$/.test(phone);    //判断手机号

          // if(name !== '' && phoneFlg && organizeName !=='' && area!==''){
          if(name !== ''){
            this.commitFlg = true
          }else {
            this.commitFlg = false
          }
        },
        deep:true
      }
    }
  }
</script>
<style lang="scss">
  @import "../style/apply_detail";
</style>
