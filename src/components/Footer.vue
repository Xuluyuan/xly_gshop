<template>
  <div class="footerContainer">
    <div class="footer-item"  @click="toPath('/')" :class="{active:$route.path=='/'}">
      <span class="iconfont icon-shouye "></span>
      <span>首页</span>
    </div>
    <div class="footer-item" @click="toPath('/about')" :class="{active:$route.path=='/about'}">
      <span class="iconfont icon-xinbaniconshangchuan-"></span>
      <span>关于</span>
    </div>
    <div class="footer-item" @click="toPath('/cart')" :class="{active:$route.path=='/cart'}">
      <span class="iconfont icon-dingdan-"></span>
      <span>订单</span>
    </div>
    <div class="footer-item" @click="toPath('/me')" :class="{active:$route.path=='/me'}">
      <span class="iconfont icon-wode"></span>
      <span>我的</span>
    </div>
  </div>
</template>
<script>
export default {
  methods:{
    toPath(path){
      if(path!==this.$route.path){
         this.$router.push(path)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "../common/stylus/mixins.styl";
.footerContainer
  display flex
  justify-content space-around
  top-border-1px(rgba(0,0,0,0.05))
  position fixed
  width 100%
  bottom 0px
  text-align center
  background-color #fff
  padding-top 5px
  .footer-item
    display flex
    width 25%
    flex-direction column
    font-size 10px
    .iconfont
      font-size 20px
    &.active
      color #0aa1ed
</style>