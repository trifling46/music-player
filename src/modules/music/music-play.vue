<template>
    <div class="music-play">
       <header-back :title="title"></header-back>
         <div class="music-bg">
             <div class="music-content">
                 <div class="music-lyric"></div>
                  <div class="player">
                       <div class="bar">
                           <span class="cur-time" v-text="curTime"></span>
                           <div class="progress-bar">
                               <div class="cur-bar"></div>
                               <i class="fa fa-circle pilot"  aria-hidden="true"></i>
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
            }
        },
        computed: {
            ...mapGetters([
                "musicList","activeMusic","isPlay"
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
            this.activeMusic;
            var  bg =  document.getElementsByClassName("music-bg")[0];
            console.log(bg)
            bg.style.height = document.documentElement.clientHeight-55-40+'px';
            this.updateProgressBar();
        },
        methods:{
            ...mapMutations([
                "updateMusicList","updateMusicState"
            ]),
            updateProgressBar(){
                var progressDom = document.getElementsByClassName("cur-bar")[0];
                var pilotDom = document.getElementsByClassName("pilot")[0];
                setInterval(function () {
                    var curTime =  this.activeMusic.curTime + 1000;
                    var ratio = parseInt(curTime/1000)/parseInt(this.activeMusic.totalTime/1000);
                    var percent = (ratio*100).toFixed(2);
                    progressDom.style.width = percent +"%";
                    pilotDom.style.left = percent +"%";
                    this.$store.commit("updateActiveMusicCurTime",{
                        curTime
                    })
                }.bind(this),1000)
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
                             width:10%;
                             background:#31C27C;
                             position:absolute;
                             z-index:2;
                          }
                    .pilot{
                        position: absolute;
                        z-index: 5;
                        bottom: -5px;
                        left: 0px;

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
    .music-lyric{
        background:#38393A;
        height:60%;
        width:100%;

    }
    }

</style>