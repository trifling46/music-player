/**
 * Created by Administrator on 2017/4/28.
 */
import music from "./music"
import picture from "./picture"
import joke from "./joke"
import Vuex from "vuex"
import Vue from "vue"
Vue.use(Vuex);
const  state ={
    contentHeight:null,
}
const getters = {
    contentHeight(state){
        return state.contentHeight;
    }
}
const mutations = {
    updateContentHeight(state,payload){
        state.contentHeight = payload.contentHeight;
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    modules:{
        joke,
        music,
        picture
    }
})