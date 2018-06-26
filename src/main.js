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

Vue.use(ElementUI)
Vue.use(MintUI)
Vue.use(Lazyload);
Vue.use(InfiniteScroll);
Vue.config.productionTip = false

Vue.config.devtools = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
