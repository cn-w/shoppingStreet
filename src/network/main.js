import { request } from './request.js'
import { getAjax } from './jQuery/jaxa';

export function getHome() {
  // return request({
  //   baseURL: 'http://123.207.32.32:8000',
  //   url: '/home/multidata'
  // })
  // console.log(111);
  const url = 'http://123.207.32.32:8000/home/multidata'
  return getAjax(url)
}

export function getHomeGoods(type, page) {
  return request({
    // baseURL: 'http://123.207.32.32:8000',
    url: '/home/data',
    params: {
      type,
      page,

    }
  })
}




export function getWether() {
  return request({
    baseURL: 'http://v.juhe.cn',
    url: '/weather/index',
    params: {
      cityname: '%E8%8B%8F%E5%B7%9E',
      dtype: 'json',
      format: 1,
      key: '0471089955ecd7c1a62341ded304b6a0'
    },
    header: ('Access-Control-Allow-Origin:http://v.juhe.cn')
  })
}