<template>
<div class="music-list">
  <headerBack :title="listTitle"></headerBack>
  <music-search></music-search>
  <div class="music_list">
    <div class="item" v-for="(music,index) in musicList" @click="play(index)">
      <div class="img-container" >
        <img :src="music.pic" alt="">
      </div>
      <div class="music_info">
        <p v-text="music.name"></p>
        <p v-text="music.author"></p>
      </div>
    </div>
    <div class="no_more">
      没有更多结果了～
  </div>
  </div>
  <loading :isLoading="isLoading"></loading>

</div>
</template>

<script>
  import headerBack from "../common/header-back.vue";
  import musicSearch from "../common/music-search.vue";
  import loading from "../common/loading.vue"
  import {mapMutations} from "vuex"
  import {mapGetters} from "vuex"

    export  default{
        data(){
            return{
                isLoading:false,
            }
        },
        components:{
            headerBack,musicSearch,loading,
        },
        computed:{
            ...mapGetters([
                "musicList","activeMusicList","isPlay"
            ]),
          listTitle(){
              return this.$route.params.title;
          }
        },
        created:function(){
            this.isLoading = true;
            console.log("loading")
            this.getList(this.$route.params.id);
        },
        methods:{
            ...mapMutations([
                "updateMusicList","updateActiveMusic","updateActiveMusicList","updateMusicState"
            ]),
            getList(id){
                this.axios.get(REMOTE_PROXY+'http://music.163.com/api/playlist/detail?id='+id)
                    .then(function (res) {
                        var soneList = res.data.result.tracks ;
                        var musicList = [];
                        soneList.forEach(function (e) {
                            var music ={};
                            music.name = e.name;
                            music.id = e.id;
                            music.author = e.artists[0].name;
                            music.src = e.mp3Url;
                            music.pic =e.album.picUrl;
                            music.totalTime = e.duration;
                            musicList.push(music);
                        })
                        this.updateMusicList(musicList);
                        console.log("loading end")
                        this.isLoading = false;
                    }.bind(this))
                    .catch(function(error){
                        console.log(error)
                    })
            },
            updateMusicList(musicList){
                this.$store.commit("updateMusicList",{
                    musicList
                })
            },
            play(index){
                this.$store.commit("updateActiveMusicList",{
                    activeMusicList:this.musicList
                })
                var music = this.musicList[index];
                this.$store.commit("updateActiveMusic",{
                   type:global.CURRENT,
                   index
                })
                this.$store.commit("updateMusicState",{
                    isPlay:true,
                })
               this.$router.push({name:"music-play",params:{index:index}})
            }
        }
    }
</script>

<style lang="less">
.music-search{
  font-size:0.5rem;
  .mint-searchbar{
  }
}
.music_list{
  .item{
    width:100%;
    height:50px;
    padding: 5px 0px;
    border-bottom: 1px solid #E6E6E6;
  }
  .img-container{
    width:50px;
    height:100%;
    border-radius: 50px;
    display: inline-block;
    overflow: hidden;
    img{
      width:100%;
      height:100%;
    }
  }
  .music_info{
    display: inline-block;
    height:100%;
    width:80%;
    font-size: 14px;
    overflow:auto;
    padding-top:10px;
    box-sizing: border-box;
  }
}
.no_more{
  padding:5px;
  text-align:center;
  font-size:14px;
}
</style>