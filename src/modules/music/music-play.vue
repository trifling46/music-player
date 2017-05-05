<template>
    <div class="music-play">
       <header-back :title="title"></header-back>
         <div class="music-bg">
             <div class="music-content">
                 <div class="music-lyric-bg">
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
            }
        },
        computed: {
            ...mapGetters([
                "musicList","activeMusic","isPlay","musicLyric","audio"
            ]),
            title(){
                return this.activeMusic.author+"-"+this.activeMusic.name;
            },
            curTime(){
                return this.getTime(this.activeMusic.curTime);
            },
            totalTime(){
                return this.getTime(this.activeMusic.totalTime);
            }

        },
        components: {
            headerBack
        },
        mounted: function () {
            var  bg =  document.getElementsByClassName("music-bg")[0];
            bg.style.height = document.documentElement.clientHeight-55-40+'px';

            this.updateProgressBar();
            this.autoUpdateLyricSite();
            this.$store.commit("updateLoopList",{
                loopList:this.loopList,
            })
        },
        methods:{
            ...mapMutations([
                "updateMusicList","updateMusicState","updateMusicCurTime","updateLoopList"
            ]),
            autoUpdateLyricSite(){
                if(this.musicLyric==undefined||this.musicLyric==null){
                    return false;
                }
                var shifting = 200;
                var index = 0;
                var allLyricList = document.getElementsByClassName("lyric");

                var autoUpdateLyricSite = setInterval(function(){

                    if(this.audio.currentTime*1000>this.musicLyric[index+1][0]){
                        allLyricList[index].className = "lyric";
                        console.log(this.audio.currentTime*1000)
                        index++;
                        shifting -= 40;
                        this.$refs.lyric.style.transform = "translateY("+shifting+"px)";
                        allLyricList[index].className = "lyric activeLyric";
                    }

                }.bind(this),100);
                this.loopList.push(autoUpdateLyricSite);

            },
            showLyric(){
                this.musicLyric.forEach(function(e){

                })
            },
            moveProgress(event){
                var ratio =  (event.offsetX/this.$refs.bar.clientWidth);
                var curTime = parseInt(ratio*this.activeMusic.totalTime);
                this.updateProgress(ratio,curTime);
                this.$store.commit("updateMusicCurTime",{
                    musicCurTime:curTime,
                })
            },
            updateProgressBar(){
               var updateProgressBar =  setInterval(function () {
                    var curTime =  this.activeMusic.curTime + 1000;
                    var ratio = parseInt(curTime/1000)/parseInt(this.activeMusic.totalTime/1000);
                    this.updateProgress(ratio,curTime);
                }.bind(this),1000)
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
                this.$store.commit("updateActiveMusic",{
                    type,
                    index:this.activeMusic.index
                });
            },

        },
        watch:{
            musicLyric(newVal,oldVal){
                this.autoUpdateLyricSite();
            }
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
            .music-content{
                    width:90%;
                    height:100%;
                   margin:auto;
                     box-shadow: 0 0 10px 0 #2a2c33;
            }
            .player{
               margin-top:50px;
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
                    margin:0px 10px;
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
        background:#38393A;
        height:60%;
        width:100%;
        color:#ffffff;
        font-size:16px;
        overflow: hidden;
        .music-lyric{
            transform: translateY(200px);
            transition:translateY 2s;
            &>p{
                text-align: center;
                padding: 5px 0px;
                height:30px;
                line-height: 30px;
                transition:color 1s;
            }
            .activeLyric{
                color:#31C27C;
                transform: scale(1.1);
                font-weight:bold;
            }

        }

    }
    }

</style>