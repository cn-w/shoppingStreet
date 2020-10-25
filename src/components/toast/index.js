import Toast from './toast'

const obj = {}

obj.install = function (Vue) {
  // console.log('------------');
  // 创建组件构造器
  const toastConstructure = Vue.extend(Toast)
  // new一个组件对象
  const toast = new toastConstructure()
  // 将组件对象手动挂载在某个对象
  toast.$mount(document.createElement('div'))
  // toast.$el就是标签，挂载在body上
  document.body.appendChild(toast.$el)

  // 将组件引到Vue.propotype上
  Vue.prototype.$toast = toast
}

export default obj
