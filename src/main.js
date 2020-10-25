import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import axios from 'axios'
import store from './store/store'

import toast from './components/toast'
import VueLazyLoad from 'vue-lazyload'
import FastClick from 'fastclick'

Vue.config.productionTip = false

Vue.use(toast)
Vue.use(VueLazyLoad)

// 解决300ms延迟
FastClick.attach(document.body)

Vue.prototype.$bus = new Vue()
// Vue.prototype.$watch = function (
//   expOrFn,
//   cb,
//   options
// ) {
//   var vm = this;
//   if (isPlainObject(cb)) {
//     return createWatcher(vm, expOrFn, cb, options)
//   }
//   options = options || {};
//   options.user = true;
//   var watcher = new Watcher(vm, expOrFn, cb, options);
//   if (options.immediate) {
//     try {
//       cb.call(vm, watcher.value);
//     } catch (error) {
//       handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
//     }
//   }
//   return function unwatchFn() {
//     watcher.teardown();
//   }
// };

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

// axios({
//   url: 'http://123.207.32.32:8000/home/multidata'
// }).then(req => console.log(req))
