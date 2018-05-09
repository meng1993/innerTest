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
          <input type="text" class="message_common" placeholder="手机号" v-model="message.mobile" ref="phone">
          <span class="icon_required">*</span>
        </p>
        <p class="message_line">
          <input type="text" class="message_common verification" placeholder="请输入验证码" v-model="message.verificationCode" ref="verification">
          <span class="icon_required">*</span>
          <span class="get_verification" @click="getCode" v-if="this.code === true">获取</span>
          <span class="get_verification code_time" v-else>{{count}}s</span>
        </p>
        <p class="message_line">
          <input type="text" class="message_common" placeholder="机构名" v-model="message.organization" ref="organizeName">
          <span class="icon_required">*</span>
        </p>
        <p class="message_line" @click="clickPlace">
          <input type="text" class="message_common" placeholder="机构所在地" v-model="area" ref="area">
          <span class="icon_required">*</span>
          <i class="icon_down"></i>
        </p>
        <p class="message_line" @click="clickScale">
          <input type="text" class="message_common" placeholder="机构规模" v-model="message.scale" ref="scale">
          <span class="icon_required">*</span>
          <i class="icon_down"></i>
        </p>
        <p class="message_line">
          <input type="text" class="message_common" placeholder="推荐人姓名" v-model="message.referrer" ref="referrer">
        </p>
        <p class="message_line">
          <input type="text" class="message_common" placeholder="推荐人手机号" v-model="message.referrerMobile" ref="referrerPhone">
        </p>
      </div>
      <div v-if="commitFlg === false" class="btn_commit_no">提交信息</div>
      <div v-else class="btn_commit_no btn_commit_active" @click="commitMessage(message)">提交信息</div>
    </div>
    <threeLinkage v-on:getProvince="selectProvince" v-on:getCity="selectCity" v-on:getDistrict="selectDistrict" ref="child"></threeLinkage>
    <scaleSelect v-on:scaleSelect="scaleSelect" ref="scale"></scaleSelect>
    <selectCommit ref="selectCommit"></selectCommit>
  </div>
</template>
<script>
  import threeLinkage from '../components/three/index'
  import scaleSelect from '../components/scale/scale'
  import selectCommit from '../components/modal/seletCommit'
  export default {
    data(){
      return {
        message:{
          name:'',              //姓名
          mobile:'',            //手机号
          verificationCode:'',    //验证码
          organization:'',    //机构名称
          province: '',       //省
          city: '',           //市
          district: '',           //区
          scale: '',      //规模
          referrer:'',    //推荐人
          referrerMobile: '',//推荐人手机号
        },
        area: '',       //地区
        commitFlg: false,
        code: true,    //为true，为获取字样点击按钮，为false为倒计时
        timer: null,
        count: ''
      }
    },
    components:{
      threeLinkage,
      scaleSelect,
      selectCommit
    },
    methods:{
      clickPlace(){
        this.$refs.child.areaShow();
      },
      clickScale(){
        this.$refs.scale.scaleShow()
      },
      selectProvince(province) {
        this.message.city = ''
        this.message.district = ''
        this.message.province = province
        this.area = province;
      },
      selectCity(city) {
        this.message.city = city
        this.message.district = ''
        this.area = this.message.province+'、'+this.city
      },
      selectDistrict(district) {
        this.message.district = district
        this.area = this.message.province+'、'+this.message.city+'、'+this.message.district
      },
      scaleSelect(scaleMsg){
        this.message.scale = scaleMsg;
      },
      getCode(){
        let mobile = this.message.mobile
        this.$api.post('sendVerificationCode.do',{'mobile': mobile}, r => {
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
        this.$refs.selectCommit.commitShow();
        console.log(msg)
      },
    },
    watch:{
      message:{
        handler:function(val,oldval){
          console.log(val)
          let name = this.$refs.name.value;
          let phone = this.$refs.phone.value;
          let verification = this.$refs.verification.value;     //验证码
          let organizeName = this.$refs.organizeName.value;     //机构名
          let area = this.$refs.area.value;                     //机构所在地
          let scale = this.$refs.scale.value;                   //机构规模
          let referrer = this.$refs.referrer.value;             //推荐人姓名
          let referrerPhone = this.$refs.referrerPhone.value;      //推荐人手机号

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
