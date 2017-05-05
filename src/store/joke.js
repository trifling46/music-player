/**
 * Created by Administrator on 2017/5/5.
 */
const state = {
     funnyPicList:[],
     jokeList:[],
     curFunnyIndex:null,
     curJokeIndex:null,
}
const getters = {
    funnyPicList(state){
        return state.funnyPicList;
    },
    jokeList(state){
        return state.jokeList;
    },
    curFunnyIndex(state){
        return state.curFunnyIndex;
    },
    curJokeIndex(state){
        return state.curJokeIndex;
    }
}
const mutations = {
      updateFunnyPicList(state,payload){
          payload.funnyPicList.forEach(function (item) {
              state.funnyPicList.push(item)
          })
      },
    updateJokeList(state,payload){
        payload.jokeList.forEach(function (item) {
            state.jokeList.push(item)
        })
    },
    updateCurFunnyIndex(state,payload){
            state.curFunnyIndex = payload.curFunnyIndex;
    },
    updateCurJokeIndex(state,payload){
            state.jokeList = payload.curJokeIndex;
    }
}

export default {
    state,
    getters,
    mutations,
}
