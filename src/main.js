import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import MintUI from 'mint-ui'
import './public/less/common.less'
import 'mint-ui/lib/style.css'
import routes from "./config/routes"

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(MintUI);
var router = new VueRouter({
    routes,
});
new Vue({
  el: '#app',
    router,
  render: h => h(App)
})
