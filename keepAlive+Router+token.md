## keepAlive+Router

1.keepAlive 作用：可以缓存组件的内容，避免重复刷新。只有在首次请求时渲染一次，之后后退，跳转回来，都不再需要重新渲染内容

用法 1.在router文件加下的Index.js中给需要缓存的路由对象做如下配置

```javascript
{
    path: '/',
    component: Home,
    meta:{
      keepAlive:true//表示页面内容需要缓存
    }
  },//meta不能改名
```

在App.vue文件中做如下判断。需要缓存的页面才进入keepAlive组件

```javascript
<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
     <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
```

问题：虽然同一个页面，但是有时候需要缓存，有时候不需要缓存

比如：假如有一个商品列表，可以根据关键词，查询商品列表，如果从首页跳转过来，说明用户输入了查询条件，需要更新查询结果内容，如果用户从详情页跳转过来，说明用户是从商品列表页面跳出去的，现在又返回商品列表页面，那么应该保留之前的搜索结果。



## 路由守卫(路由钩子函数)

在发生路由跳转时，自动自行的回调函数。如果希望在跳进或者跳出一个路由时，想自动执行一项任务那么就要用路由守卫。

```javascript
 beforeRouteLeave (to, from, next) {
    //如果从首页跳到商品列表页面是不需要缓存的,因为每次从首页搜索的商品都不同
    if(to.path=="/product"){
      to.meta.keepAlive=false
    }
    next()
  },
```

```javascript
beforeRouteLeave (to, from, next) {
    //从商品列表页面跳到详情页面是需要缓存搜索结果的(即缓存商品列表页面)
    if(to.path=="/details"){
      from.meta.keepAlive=true
    }
    next()
  },
```

```javascript
//从商品详情离开时，只要是回退到商品列表页面，那么商品列表耶也是需要缓存的
  beforeRouteLeave (to, from, next) {
    if(to.path=="/product"){
      to.meta.keepAlive=true
    }
    next()
  },
```

## token

用户身份验证---服务端生成保存在浏览器端

携带token的方式--放在请求头里面



用户登录成功后，后台返给前端一个token码。前端需要将token存储到本地LocalStorage和Vuex中，并且后端需要给token设置有效期(比如7有效期等)，后续用户再进行其他操作，比如进入我的购物车，我的商品列表等等，必须携带token一起发送请求给后端，后端判断token合法性之后，返回前端对应的数据。

![1604721280317](C:\Users\10058\AppData\Roaming\Typora\typora-user-images\1604721280317.png)

axios的拦截器

```javascript
import axios from "axios";
import qs from "qs";
import store from './store'

const Axios=axios.create({
  baseURL:"http://localhost:5050/",
  withCredentials:true
})
Axios.interceptors.request.use(
  config=>{
    console.log("进入请求拦截器...");
    //this.axios.post(
      //"user/signin",
      //{uname:dingding , upwd:123456}
    //)
    if(config.method==="post"){
      config.data=qs.stringify(config.data)
    }
    if(localStorage.getItem("token")){
      config.headers.token=localStorage.getItem("token");
    }
    if(sessionStorage.getItem("token")){
      config.headers.token=sessionStorage.getItem("token");
    }
    return config;
  },
  error=>{
    console.log("===发送请求拦截器报错===")
    console.log(error);
    console.log("===end===");
    Promise.reject(error);
  }
);
Axios.interceptors.response.use(
  res=>{
    console.log("触发响应拦截器...")
    if(res.data.status==403){
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      store.commit("setIslogin",false);
      store.commit("setUname","");
    }else if(res.data.code==-1){
      store.commit("setIslogin",false);
      store.commit("setUname","");
      //alert(res.data.msg+" 请先登录 !");
    }else if(res.data.token){
      store.commit("setUname",res.data.uname);
      store.commit("setIslogin",true);
      if(res.remember==="true"){
        localStorage.setItem("token",res.data.token);
      }else{
        sessionStorage.setItem("token",res.data.token);
      }
    }
    return res;
  },
  error=>{
    
  }
)
export default {
  install: function(Vue, Option){
    Vue.prototype.axios=Axios;
  }
}
```

token为什么不放在cookie里面

1.cookie的大小限制   4KB  2.cookie容易被人截获 3.浏览器支持客户禁用cookie 

为什么用cookie.因为http 是无状态的