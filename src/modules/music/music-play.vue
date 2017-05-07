<template>
    <div class="music-play">
       <header-back :title="title"></header-back>
         <div class="music-bg">
             <img class="img-bg" :src="activeMusic.pic" alt="">
             <div class="music-content">
                 <div class="music-lyric-bg" >
                     <img :src="activeMusic.pic" alt="">
                     <div class="music-lyric" ref="lyric">
                         <p v-for="(item,index) in musicLyric" class="lyric" v-text="item[1]" :data-time="item[0]"></p>
                     </div>
                 </div>

                  <div class="player">
                       <div class="bar">
                           <span class="cur-time" v-text="curTime"></span>
                           <div class="progress-bar" @click="moveProgress" ref="bar">
                               <div class="cur-bar" ref="curBar"></div>
                               <i class="fa fa-circle pilot" ref="pilot" aria-hidden="true"></i>
                           </div>
                           <span class="total-time" v-text="totalTime"></span>
                       </div>
                       <div class="music-control">
                            <div class="pre" @click="updateActiveMusic('PRE')">
                                <i class="fa fa-backward" aria-hidden="true"></i>
                            </div>
                           <div class="play" @click="updateMusicState">
                               <i class="fa fa-play" aria-hidden="true" v-show="!isPlay"></i>
                               <i class="fa fa-pause" aria-hidden="true" v-show="isPlay"></i>
                           </div>
                           <div class="next" @click="updateActiveMusic('NEXT')">
                               <i class="fa fa-forward" aria-hidden="true"></i>
                           </div>
                       </div>
                  </div>
             </div>
         </div>
     </div>
 </template>

<script>
    import headerBack from "../common/header-back.vue"
    import {mapGetters} from "vuex"
    import {mapMutations} from "vuex"
    export  default{
        data(){
            return{
                loopList:[],
                musicLyricLine:0,
                shifting:150,//歌词初始偏移量
            }
        },
        computed: {
            ...mapGetters([
                "musicList","activeMusic","isPlay","musicLyric","audio","musicTotalTime"
            ]),
            title(){
                return this.activeMusic.author+"-"+this.activeMusic.name;
            },
            curTime(){
                return this.getTime(this.activeMusic.curTime);
            },
            totalTime(){
                return this.getTime(this.musicTotalTime)
            }
        },
        components: {
            headerBack
        },
        mounted: function () {
            var  bg =  document.getElementsByClassName("music-bg")[0];
            bg.style.height = document.documentElement.clientHeight-55-40+'px';
            this.audio.addEventListener("canplaythrough",function(){
                var musicTotalTime = this.audio.duration*1000 ;
                this.$store.commit("updateMusicTotalTime",{
                    musicTotalTime
                })
            }.bind(this))
        },
        destroyed:function () {
                this.loopList.forEach(function(e){
                    clearInterval(e);
                })
                this.$store.commit("updateLoopList",{
                    loopList:[],
            })
        },
        methods:{
            ...mapMutations([
                "updateMusicList","updateMusicState","updateMusicCurTime","updateLoopList","updateMusicTotalTime"
            ]),
            initThread(){
                this.updateProgressBar();
                this.autoUpdateLyricSite();
                this.$store.commit("updateLoopList",{
                    loopList:this.loopList,
                })
            },
            closeThread(){
                this.loopList.forEach(function(e){
                    clearInterval(e);
                });
                this.$store.commit("updateLoopList",{
                    loopList:[],
                })
            },
            // 默认正常播放 type = FF
            autoUpdateLyricSite(){
                if(this.musicLyric==undefined||this.musicLyric==null){
                    return false;
                }
                var allLyricList = document.getElementsByClassName("lyric");
                var autoUpdateLyricSite = setInterval(function(){
                      if (this.musicLyricLine + 1 < this.musicLyric.length && this.audio.currentTime*1000> this.musicLyric[this.musicLyricLine + 1][0]) {
                          allLyricList[this.musicLyricLine].className = "lyric";
                          this.musicLyricLine++;
                          console.log("auto: "+this.musicLyricLine)
                          this.shifting -= 40;
                          this.$refs.lyric.style.transform = "translateY(" + this.shifting  + "px)";
                          allLyricList[this.musicLyricLine].className = "lyric activeLyric";
                      }
                }.bind(this),200);
                this.loopList.push(autoUpdateLyricSite);
            },
            moveProgress(event){
                var ratio =  (event.offsetX/this.$refs.bar.clientWidth);
                var curTime = parseInt(ratio*this.musicTotalTime);
                this.updateProgress(ratio,curTime);

                this.$store.commit("updateMusicCurTime",{
                    musicCurTime:curTime,
                })
                this.updateMusicLyricLine(curTime);

            },
            updateMusicLyricLine(curTime){
                this.musicLyric.some (function (item,index) {
                    if(item[0]>curTime){

                        var allLyricList = document.getElementsByClassName("lyric");
                        this.closeThread();
                        allLyricList[this.musicLyricLine].className = "lyric";
                        allLyricList[index].className = "lyric activeLyric";

                        if(curTime>this.audio.currentTime*1000){
                            var sliderLyricNext = setInterval(function(){
                                this.musicLyricLine++;
                                console.log("hand: "+this.musicLyricLine)
                                if(this.musicLyricLine>=index){
                                    clearInterval(sliderLyricNext);
                                    this.initThread();
                                }
                                this.shifting -= 40;
                                this.$refs.lyric.style.transform = "translateY(" +  this.shifting  + "px)";
                            }.bind(this),50);
                        }
                        else{
                            var sliderLyricPre = setInterval(function(){
                                this.musicLyricLine--;
                                if(this.musicLyricLine<=index){
                                    clearInterval(sliderLyricPre);
                                    this.initThread();
                                }
                                this.shifting += 40;
                                this.$refs.lyric.style.transform = "translateY(" +  this.shifting  + "px)";
                            }.bind(this),50);
                        }


                        return true;
                    }
                }.bind(this))
            },
            updateProgressBar(){
               var updateProgressBar =  setInterval(function () {
                    var curTime =  this.audio.currentTime*1000;
                    var ratio = parseInt(curTime/1000)/parseInt(this.musicTotalTime/1000);
                    this.updateProgress(ratio,curTime);
                }.bind(this),500)
                this.loopList.push(updateProgressBar);
            },
            updateProgress(ratio,curTime){
                var progressDom = this.$refs.curBar;
                var pilotDom = this.$refs.pilot;
                var percent = (ratio*100).toFixed(2);
                progressDom.style.width = percent +"%";
                pilotDom.style.left = percent +"%";
                this.$store.commit("updateActiveMusicCurTime",{
                    curTime
                })
            },
            getTime(time){
                var  virtualMinute = parseInt(time/1000/60);
                var  virtualSecond = parseInt(time/1000%60);
                var  minute = virtualMinute<10 ? "0"+virtualMinute:virtualMinute;
                var  second = virtualSecond<10 ? "0"+virtualSecond:virtualSecond;
                    return minute+":"+second;
            },
            updateMusicState(){
             this.$store.commit("updateMusicState",{
                 isPlay:!this.isPlay,
             })
            },
            updateActiveMusic(type){
                this.closeThread();
                this.musicLyricLine = 0 ;
                this.shifting = 150;
                this.$store.dispatch("updateActiveMusic",{
                    type,
                    index:this.activeMusic.index
                });
            },

        },
        watch:{
            musicLyric(newVal,oldVal){
                this.musicLyricLine = 0 ;
                this.shifting = 150;
                this.initThread();
            },
            musicTotalTime(newVal,oldVal){
                console.log(newVal,oldVal)
            },
        }

    }
</script>

<style lang="less">
    .music-play{
        .music-bg{
           background:#545863;
            width:100%;
            padding: 10px 0px;
            box-sizing: border-box;
            .img-bg{
                width:100%;
                height:100%;
                opacity: 0.2;
                position: absolute;
                top:0px;
                left:0px;
                transform: scale(5);
            }
            .music-content{
                    width:90%;
                    height:100%;
                   margin:auto;
                     box-shadow: 0 0 10px 0 #2a2c33;
            }
            .player{
               margin-top:10%;
              .bar{
                color:#ffffff;
                font-size:14px;
                text-align: center;
                display: flex;
                  align-items: center;
                 justify-content:center;
                  height:50px;
                .progress-bar{
                    display: inline-block;
                    width:200px;
                    height:5px;
                    background:#757575;
                    position:relative;
                    margin:0px 15px;
                         .cur-bar{
                             top:0px;
                             left:0px;
                             display: inline-block;
                             height:100%;
                             width:0%;
                             background:#31C27C;
                             position:absolute;
                             z-index:2;
                          }
                    .pilot{
                        position: absolute;
                        z-index: 5;
                        bottom: -5px;
                        left: -6px;

                    }
                }
            }
                .music-control{
                    height:100px;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    position: relative;
                    &>div{
                        border-radius: 50px;
                        height:50px;
                        width:50px;
                        border:1px solid #ffffff;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color:#ffffff;
                    }
                    .pre{
                    }
                    .play{
                    }
                    .next{
                    }
                }
            }

        }
    .music-lyric-bg{
       /* background:#38393A;*/
        background-size:cover;
        height:60%;
        width:100%;
        color:#ffffff;
        font-size:14px;
        overflow: hidden;
        position: relative;
        img{
            max-width:100%;
            max-width:100%;
            opacity: 0.8;
            position: absolute;
        }
        .music-lyric{
            transform: translateY(150px);
            transition:translateY 2s;
            &>p{
                text-align: center;
                padding: 5px 0px;
                min-height:30px;
                line-height: 30px;
                transition:color 1s;
            }
            .activeLyric{
                color:#31C27C;
                transform: scale(1.2);
                font-weight:bold;
            }

        }

    }
    }

</style>