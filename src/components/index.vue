<template>
  <div>
    <van-cell-group>
      <van-field v-model="username" label="姓名" icon="clear" placeholder="请输入用户名" required @click-icon="username = ''">
      </van-field>
      <van-field v-model="phone" type="phone" label="手机号" required placeholder="请输入手机号" error-message="手机号格式不正确">
      </van-field>
      <van-field center v-model="sms" label="手机验证码" placeholder="请输入短信验证码" icon="clear" required @click-icon="sms = ''">
        <van-button @click="getCode" slot="button" size="small" type="primary">获取验证码</van-button>
      </van-field>
      <van-field label="机构" v-model="organization" required placeholder="请输入机构名称">
      </van-field>
      <van-field label="机构所在地" v-model="organization" required >
      </van-field>
    </van-cell-group>
    <threeLinkage></threeLinkage>
  </div>
</template>
<script>
  import threeLinkage from './three/index'
  export default {
    data(){
      return {
        username: '',
        phone: '',
        sms: '',
        organization:'',
      }
    },
    components:{
      threeLinkage
    },
    methods:{
      getCode(){
        console.log(111)
      }
    }
  }
</script>
<style lang="scss">
  @import "../style/apply_index";
</style>
