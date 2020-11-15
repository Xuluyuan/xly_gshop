<template>
  <header class="header">
    <slot name="left"></slot>
    <span class="header_title">
      <span class="header_title_text">{{title}}</span>
    </span>
    <slot name="right"></slot>
  </header>
</template>
<script>
export default {
  props:{
    title:{
      required:true,//必须传入
      type:String,
      default:"硅谷外卖"
    }
  }
}
</script>
<style lang="stylus">
  .header
    position fixed
    top 0
    z-index 666
    background #02a774
    color #fff
    width 100%
    text-align center
    line-height 50px
    display flex
    justify-content space-around
    padding 0px 5px 0px 5px
    box-sizing border-box
    .header_title
      width:33.33%
      overflow hidden
      text-overflow: ellipsis;
      white-space: nowrap;
    .header_search
      text-align left 
      width:33.33%
      .iconfont
        font-size 25px 
    .header_login
      width:33.33%
      text-align right
      .header_login_text 
        .line 
          display inline-block
          height 15px
          width 8px
          background #fff
          vertical-align middle
          margin 0 30px 0 30px
         
</style>