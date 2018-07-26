// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import flexible from '../static/js/flexible'
import 'element-ui/lib/theme-chalk/index.css';
import '../static/style.css'
import '../static/iconfont.css'
import MintUI from 'mint-ui'
import { Lazyload } from 'mint-ui';
import { InfiniteScroll } from 'mint-ui';
import 'mint-ui/lib/style.css'
import store from './store'
import * as filters from './custom/filters'
import axios from 'axios'
import url from './http/url.js'
import FastClick from 'fastclick'
import {getLocalStorage, removeLocalStorage} from "./custom/mixin";
import * as Constants from "./custom/constants";



Vue.use(ElementUI)
Vue.use(MintUI)
Vue.use(Lazyload);
Vue.use(InfiniteScroll);
Vue.config.productionTip = false
Vue.prototype.axios = axios.create({
  baseURL:url.baseUrl,
  timeout:5000
});
Vue.config.devtools = true;
FastClick.attach(document.body);

router.beforeEach((to, from, next) => {
  // let tk = getLocalStorage(Constants.TOKEN)
  // if (to.path == '/login' || to.path.startsWith('/register')){
  //   if (localStorage.token){
  //     removeLocalStorage(Constants.TOKEN)
  //   }
  //   next()
  // } else
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.token) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
