
/**
 * Created by Administrator on 2017/5/2.
 */
import axios from "axios"
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
    musicCurTime:0, //快进时，定位time,与curTime一样只是为方便APP监听
    musicTotalTime:0,
    musicLyric:[], // 在music中独立出来方便监听
    musicLyricLine:null,
    audio:null,
    loopList:[],
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
    },
    musicCurTime(state){
        return state.musicCurTime;
    },
    musicLyric(state){
        return state.musicLyric;
    },
    audio(state){
        return state.audio;
    },
    loopList(state){
        return state.loopList;
    },
    musicLyricLine(state){
        return state.musicLyricLine;
    },
    musicTotalTime(state){
        return state.musicTotalTime
    }



}
const mutations = {
    updateAudio(state,payload){
        state.audio = payload.audio;
    },
    updateMusicTotalTime(state,payload){
      state.musicTotalTime = payload.musicTotalTime ;
    },
    updateMusicLyricLine(state,payload){
        state.musicLyricLine = payload.musicLyricLine;
    },
    updateLoopList(state,payload){
        state.loopList = payload.loopList;
    },
    updateMusicList(state,payload){
         state.musicList = payload.musicList;
    },
    updateActiveMusicList(state,payload){
        state.activeMusicList = payload.activeMusicList;
    },
    updateMusicCurTime(state,payload){
      state.musicCurTime = payload.musicCurTime;
    },
    updateMusicState(state,payload){
        state.isPlay = payload.isPlay;
    },
    updateMusicLyric(state,payload){
        state.musicLyric = payload.musicLyric;
    },
    updateActiveMusic(state,payload){
        state.activeMusic = getActiveMusic(payload.music,payload.index);
    },
    updateActiveMusicCurTime(state,payload){
        state.activeMusic.curTime = payload.curTime;
    }
};
const actions = {
    updateActiveMusic({commit},payload){
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
        updateLyricAndMusic(music,index,commit);
    },
}
// 原始音乐初始化
function getActiveMusic(music,index){
    var activeMusic = {};
    for(var i in music){
        activeMusic[i] = music[i];
    }
    activeMusic.curTime = 0;
    activeMusic.index =index;
    return activeMusic;
}
// 获取歌词、歌曲并提交mutations
// 目前只能解析格式（时间+文本） "[00:00.00] 作曲 : 陈鸿宇"
function updateLyricAndMusic(music,index,commit){
    var songId = music.id;
    axios.get(REMOTE_PROXY+'http://music.163.com/api/song/lyric?os=pc&lv=-1&kv=-1&tv=-1&id='+songId)
        .then(function (res) {
            var allLyricList = [];
            if (res.data.nolyric||res.data.lrc==undefined) {
                allLyricList[0] = [100,"暂无歌词"];
                allLyricList[1] = [1000,"暂无歌词"]
            }
            else{
                var lyric = res.data.lrc.lyric;
                var regexLyric = new RegExp("\n");
                var list = lyric.split(regexLyric);
                list.pop();
                var regexItem = new RegExp("\]");
                list.forEach(function(e){
                    var item = e.split(regexItem);
                    // var time1 = item[0].replace('[','')  格式化时间
                    var timeList = item[0].replace('[','').split(":");
                    var Millisecond = timeList[0]*60*1000+timeList[1]*1000 //毫秒时间
                    if(isNaN(Millisecond)){
                        console.error("歌词解析错误",timeList)
                    }
                    else{
                        item[0] = Millisecond;
                        if(item[1].length!=0){
                            allLyricList.push(item);
                        }
                    }

                })
                if(allLyricList.length==0){
                    allLyricList[0] = [100,"暂无歌词"]
                }
            }
            // 无论有无歌词都更新状态
            commit("updateMusicLyric",{
                musicLyric:allLyricList
            })
            commit("updateActiveMusic",{
                index,
                music
            })
        }.bind(this))
        .catch(function(error){
            console.log(error)
        })
}
export default {
    state,
    getters,
    mutations,
    actions,
}