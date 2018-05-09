<template>
  <div>
    <section class="commitShow" v-show="showChose">
      <div class="commit_content">
        <div class="header">提示</div>
        <template v-if="modalContent === 1">
          <div class="content">
            您的信息已经填写完毕，是否要提交申请信息，系统将按照您所填写的信息，
            进行审核，通过后将派发体验账号，是否立即提交？
          </div>
          <div class="btn_select">
            <div @click="closeAdd">取消</div>
            <div @click="commit">确定</div>
          </div>
        </template>
        <template v-else-if="modalContent === 2">
          <div class="content">
            申请信息正在审核中，请稍作等待，我们已为您进行申请，
            请稍作等待，我们的工作人员一般将在10s-60s之间完成审核工作！
          </div>
          <div class="btn_select">
            <div style="color: #acacac">审核中({{count}}s)</div>
          </div>
        </template>
        <template v-else-if="modalContent === 3">
          <div class="content">
            申请信息正在审核中，请稍作等待，我们已为您进行申请，
            请稍作等待，我们的工作人员一般将在10s-60s之间完成审核工作！
          </div>
          <div class="btn_select">
            <div style="color: #0087fb;cursor: pointer" @click="lookResult">查看结果</div>
          </div>
        </template>
        <template v-else-if="modalContent === 4">
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
  </div>
</template>

<script>
  export default {
    data () {
      return {
        selectCommit: "",
        showChose: false,
        modalContent: 1,    //为1是否确认提交，为2:提交成功进入倒计时，为3：倒计时结束，显示查看结果，为4：提交失败（手机号已注册或信息填写有误）
        items: [
          '在读学生<50人',
          '在读学生<200人',
          '在读学生<500人',
          '在读学生<5000人',
          '在读学生>5000人'
        ],
        timer: null,
        count: ''
      }
    },
    methods: {
      commitShow() {
        this.selectCommit = '您的信息已经填写完毕，是否要提交申请信息，系统将按照您所填写的信息，进行审核，通过后将派发体验账号，是否立即提交？'
        this.showChose = true
      },
      closeAdd(i) {
        this.showChose = false;
        this.$emit('scaleSelect',this.items[i]);
      },
      commit(){
        this.$api.post('userSign.do',this.$parent.message, r => {
          console.log(r)
          this.modalContent = 2
          this.times()
        },f => {
          if(f.returnNo === '0062'){
            // 0062，账号已存在，不能提交
            this.modalContent = 5
          }
          else if(f.returnNo === '0025'){
            this.modalContent = 6
          }
          else {
            this.modalContent = 4
          }
          console.log(f)
        });
      },
      againWrite(){
        this.showChose = false
        this.modalContent = 1
      },
      times(){
        const TIME_COUNT = 5;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              clearInterval(this.timer);
              this.timer = null;
              this.showResult();
            }
          }, 1000)
        }
      },
      showResult(){
        this.modalContent = 3
      },
      lookResult(){
        let name = this.$parent.message.name
        let mobile = this.$parent.message.mobile
        let verificationCode = this.$parent.message.verificationCode
        this.$api.post('trialQuery.do',{'name':name,'mobile':mobile,'verificationCode':verificationCode}, r => {
          console.log(r)
          if(r.returnNo === '0058'){
            this.$router.push('/resultSuccess/'+this.$parent.message.mobile+'/'+r.content.hours+'/1');
          }
          else if(r.returnNo === '0060'){
            // 首次登录开始计算
            this.$router.push('/resultSuccess/'+this.$parent.message.mobile+'/1440/1');
          }
          else if(r.returnNo === '0059'){
            // 体验已经过期
            this.$router.push('/resultSuccess/'+this.$parent.message.mobile+'/1440/2');
          }
        });

      }
    }
  }
</script>
<style lang="scss">
  .commitShow{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    z-index:120;
    background:rgba(77,82,113,0.8);
    .commit_content{
      position: absolute;
      width: 5.4rem;
      height: 4rem;
      background-color: #fff;
      border-radius: .2rem;
      left: 50%;
      top: 50%;
      margin: -2rem -2.7rem;
      .header{
        width: 100%;
        height: .6rem;
        line-height: .6rem;
        margin: .28rem 0 .14rem;
        font-size: .4rem;
        text-align: center;
      }
      .content{
        width:100%;
        font-size: .3rem;
        line-height: 1.6;
        padding: 0 .45rem;
      }
      .btn_select{
        position: absolute;
        width: 100%;
        height: 1rem;
        display: flex;
        left: 0;
        bottom: 0;
        div{
          flex: 1;
          font-size: .4rem;
          text-align: center;
          line-height: 1rem;
          border-top: 1px solid #cccccc;
        }
        div:nth-child(1){
          color: #333333;
        }
        div:nth-child(2){
          color: #0087fb;
          border-left: 1px solid #cccccc;
        }
      }
    }
  }
</style>
