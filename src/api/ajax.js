/*
ajax请求模块
返回值是promise对象(异步返回的数据是：response.data)
*/ 

import axios from "axios"
import qs from "qs"
export default function ajax(url,data={},type="GET"){
  return new Promise(function(resolve,reject){
    //执行异步ajax请求
    let promise;
    if(type==="GET"){
      // 准备url query 参数数据
      //数据拼接字符串
      let dataStr=qs.stringify(data)
      if(dataStr!==""){
        url=url+"?"+dataStr
      }
      //发送get请求
      promise=axios.get(url)
    }else{
      //发送post请求
      promise=axios.post(url,data)
    }
    promise.then(function(response){
      //成功调用resolve()
      resolve(response.data)
    }).catch(function(error){
      //失败了调用reject()
      reject(error)
    })
  })
}