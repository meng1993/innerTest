<template>
  <div class="apply_index">
    <img src="../../static/image/innertest_title.png" class="describe">
    <div @click="apply" class="btn_common btn_apply">申请试用</div>
    <div @click="lookResult" v-show="pcScreen" class="btn_common btn_look">查看资格</div>
    <a href="tel:18867543926" v-show="!pcScreen" class="btn_common btn_phone">电话联系</a>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        pcScreen: false,     //true时候在pc上打开，false指在手机上打开
      }
    },
    components:{

    },
    created(){
      this.pcMobile()
      // this.$api.post('list.do', null, r => {
      //   console.log(r)
      // });
    },
    methods:{
      apply(){
        this.$router.push('/applyDetail')
      },
      lookResult(){
        this.$router.push('/lookResult')
      },
      pcMobile(){
        if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          this.pcScreen = false
        } else {
          this.pcScreen = true
        }
      }
    }
  }
</script>
<style lang="scss">
  @import "../style/apply_index";
</style>
