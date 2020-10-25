import axios from 'axios'


export function request(config) {

  //1创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w6',
    // baseURL: 'http://v.juhe.cn/weather/index?format=2&cityname=苏州&key=0471089955ecd7c1a62341ded304b6a0',
    timeout: 5000
  })
  //2、拦截器：发送时拦截/发送失败；响应时拦截/响应失败
  instance.interceptors.request.use(success => {
    // console.log(success);
    return success
    // 必须返回全部拦截数据
  }, err => {
    console.log('err11');
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
    // 可以返回部分数据
  }, err => {
    console.log('err22');
  })

  //3、发送请求
  return instance(config)

}


