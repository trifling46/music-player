
/**
 * Created by Administrator on 2017/5/2.
 */
const state ={
    musicList:[],
    activeMusicList:[],
    activeMusic:{
        index:0,
        name:null,
        id:null,
        author:null,
        src:null,
        pic:null,
        totalTime:null,
        curTime:0, //单位是毫秒
    },
    isPlay:false,
}
const getters = {
    musicList(state){
        return state.musicList;
    },
    isPlay(state){
        return state.isPlay;
    },
    activeMusicList(state){
        return state.activeMusicList;
    },
    activeMusic(state){
        return state.activeMusic;
    }


}
const mutations = {
    updateMusicList(state,payload){
         state.musicList = payload.musicList;
    },
    updateActiveMusicList(state,payload){
        state.activeMusicList = payload.activeMusicList;
    },
    updateMusicState(state,payload){
        state.isPlay = payload.isPlay;
    },
    updateActiveMusic(state,payload){
        var type = payload.type;
        var index = type == global.PRE ? payload.index - 1 : payload.index + 1;
        if (index >= state.activeMusic.length) {
            index = 0;
        }
        else if (index < 0) {
            index = state.activeMusic.length - 1;
        }
        if (type == global.CURRENT) {
            index = payload.index;
        }
        var music = state.activeMusicList[index];
        console.log(index);
        state.activeMusic = getActiveMusic(music,index);
    },
    updateActiveMusicCurTime(state,payload){
        state.activeMusic.curTime = payload.curTime;
    }
};
function getActiveMusic(music,index){
    var activeMusic = {};
    for(var i in music){
        activeMusic[i] = music[i];
    }
    activeMusic.curTime = 0;
    activeMusic.index =index;
    return activeMusic;
}
export default {
    state,
    getters,
    mutations,
}