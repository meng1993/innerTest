<template>
  <div>
    <section class="showChose" v-show="showChose">
      <section class="address">
        <section class="title">
          <h4>机构规模</h4>
          <span @click="closeAdd">×</span>
        </section>
        <ul class="scale_ul">
          <li @click="closeAdd(index)" v-for="item,index in items">{{item}}</li>
        </ul>
      </section>
    </section>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        showChose: false,
        items: [
          '在读学生<50人',
          '在读学生<200人',
          '在读学生<500人',
          '在读学生<5000人',
          '在读学生>5000人'
        ]
      }
    },
    methods: {
      scaleShow() {
        this.showChose = true
      },
      closeAdd(i) {
        // console.log(this.items[i]);
        this.showChose = false;
        this.$emit('scaleSelect',this.items[i]);
      }
    }
  }
</script>
<style lang="scss">
  .showChose{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    z-index:120;
    background:rgba(77,82,113,0.8);
    .address{
      position:absolute;
      bottom:0;
      left:0;
      z-index:121;
      background:#fff;
      width:100%;
      .title{
        h4{
          color: #3d3d3d;
        }
      }
      .scale_ul{
        width: 100%;
        height: 6rem;
        overflow-x: hidden;
        overflow-y: auto;
        li{
          width: 100%;
          line-height: .7rem;
          font-size: .3rem;
          color: #3b3b3b;
        }
      }
    }
  }

</style>
