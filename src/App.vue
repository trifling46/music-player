<template>
  <div id="app">
    <mt-header fixed :title="item_title" class="app-theme">
      <mt-button slot="left"><i class="fa fa-bars" aria-hidden="true"></i></mt-button>
      <mt-button slot="right"><i class="fa fa-sign-out" aria-hidden="true"></i></mt-button>
    </mt-header>
    <div class="content" ref="content">
      <router-view></router-view>
    </div>
    <audio  :src="activeMusic.src" ref="music"></audio>
    <page-footer @changeTitle="changeTitle"></page-footer>
  </div>
</template>

<script>
    import pageFooter from "./modules/footer/page-footer.vue"
    import {mapGetters} from "vuex"
    import {mapMutations} from "vuex"
    export default {
        name: 'app',
        data () {
            return {
                'item_title': "lsl"
            }
        },
        computed: {
            ...mapGetters([
                "activeMusic", "activeMusicList", "isPlay", "musicCurTime",
            ]),
        },
        mounted:function(){
            console.log(this.$refs.music);
            this.$refs.music.addEventListener("error", function () {
                this.changeMusic(global.NEXT);
            }.bind(this));
            this.$refs.music.addEventListener("ended", function () {
                this.changeMusic(global.NEXT);
            }.bind(this));
            this.$refs.music.addEventListener("play", function () {
                console.log("play")
            }.bind(this));
            this.$store.commit("updateAudio",{
                audio:this.$refs.music
            })
            var height = document.documentElement.clientHeight-95;  // 上下nav高度
            this.$refs.content.style.height = height+'px'; // 上下nav高度
            this.$store.commit("updateContentHeight",{
                contentHeight:height,
            });
            console.log(  this.$refs.content.style.height);
        },
        components: {
            pageFooter,
        },
        methods: {
            ...mapMutations([
                "updateActiveMusic", "updateMusicState","updateAudio","updateContentHeight"
            ]),
            changeTitle(payload){
                this.item_title = payload.title;
            },
            changeMusic(type){
                this.$store.dispatch("updateActiveMusic", {
                    type:global.NEXT,
                    index:this.activeMusic.index
                });
            },
            playMusic(isPlay){
                if (isPlay) {
                    setTimeout(function () {
                        this.$refs.music.play();
                    }.bind(this), 100)
                }
                else {
                    this.$refs.music.pause();
                }
            },
        },

        watch: {
            activeMusic(newVal, oldVal){
                this.playMusic(true);
            },
            musicCurTime(newVal, oldVal){
                console.log(newVal)
                this.$refs.music.currentTime = newVal/1000;
            },
            isPlay(newVal, oldVal){
                this.playMusic(newVal);
            },

        }
    }
</script>

<style lang="less">
  .content{
    box-sizing: border-box;
    margin: 40px 0px 55px 0px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .custom{
    background:red;
  }


</style>
