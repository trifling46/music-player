/**
 * Created by Administrator on 2017/5/5.
 */
const state = {
    pictureList:[],
    curIndex : null,
 }
const getters = {
    pictureList(state){
        return state.pictureList;
    },
    curIndex(state){
        return state.curIndex;
    }
}
const mutations = {
    updatePictureList(state,payload){
        payload.pictureList.forEach(function (item) {
            state.pictureList.push(item);
        })
    },
    updateCurIndex(state,payload){
        state.curIndex = payload.curIndex;
    }
}
export default {
    state,
    getters,
    mutations,
}
