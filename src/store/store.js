/**
 * Created by Administrator on 2017/4/28.
 */
import music from "./music"
import Vuex from "vuex"
import Vue from "vue"
Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        music,
    }
})