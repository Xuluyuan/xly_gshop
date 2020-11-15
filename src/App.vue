<template>
  <div id="app">
    <router-view></router-view>
    <my-footer v-show="$route.meta.Myfooter==true"></my-footer>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log(this.$route)
  },
}
</script>

