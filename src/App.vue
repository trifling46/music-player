<template>
  <div id="app">
    <mt-header fixed :title="item_title" class="app-theme">
      <mt-button slot="left"><i class="fa fa-bars" aria-hidden="true"></i></mt-button>
      <mt-button slot="right"><i class="fa fa-sign-out" aria-hidden="true"></i></mt-button>
    </mt-header>
    <div class="content">
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
                'item_title':"lsl"
            }
        },
        computed: {
            ...mapGetters([
                 "activeMusic","activeMusicList","isPlay"
            ]),
        },
        mounted(){
            this.$refs.audio.addEventListener("error",function () {
                this.changeMusic(global.NEXT);
            });
            this.$refs.audio.addEventListener("ended",function () {
                this.changeMusic(global.NEXT);
            });
        },
        components:{
            pageFooter,
        },
        methods:{
            ...mapMutations([
               "updateActiveMusic","updateMusicState"
            ]),
            changeTitle(payload){
                this.item_title = payload.title ;
            },
            changeMusic(type){
                this.$store.commit("changeActiveMusic",{
                    type
                });
            },
            playMusic(isPlay){
                if(isPlay){
                    setTimeout(function () {
                        this.$refs.music.play();
                    }.bind(this),100)
                }
                else{
                    this.$refs.music.pause();
                }
            },
        },
        mounted:function(){
            console.log(this.$refs.music.paused)
        },

        watch:{
            activeMusic(newVal,oldVal){
                this.$refs.music.load();
                this.playMusic(true);
            },
            isPlay(newVal,oldVal){
                this.playMusic(newVal);
             }
            },
    }
</script>

<style lang="less">
  .content{
    box-sizing: border-box;
    padding:40px 0px 55px 0px;
  }
  .custom{
    background:red;
  }

</style>
