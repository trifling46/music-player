<template>
 <div class="search">
     <div class="search_box">
        <i class="fa fa-search" aria-hidden="true"></i>
        <input type="text" v-model="searchQuery" class="input-search" @keyup.enter="getList"  :placeholder="placeholder">
        <i class="fa fa-times-circle" aria-hidden="true" v-show="showClose" @click="chean_input"></i>
     </div>
<!--     <div class="music_list">
          <div class="item" v-for="music in musicList">
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
     </div>-->
     <loading :isLoading="isLoading"></loading>

 </div>
</template>

<script>
    import {mapMutations} from "vuex"
    import {mapGetters} from "vuex"
    import loading from "../common/loading.vue"
    export  default{
        data(){
            return{
                showClose:false,
                searchQuery:undefined,
                isLoading:false,
            }
        },
        components:{loading},
        computed:{
            ...mapGetters([
                "musicList"
            ])
        },
        props:{
            placeholder:{
                type:String,
                default:"搜索",
            },
        },
        methods:{
            ...mapMutations([
                "updateMusicList"
           ]),
            chean_input(){
              this.searchQuery = null;
            },
            getList(){
                this.isLoading = true;
                this.axios.get(REMOTE_PROXY+'http://s.music.163.com/search/get?type=1&s='+this.searchQuery)
                    .then(function (res) {
                        var soneList = res.data.result.songs ;
                        var musicList = [];
                        soneList.forEach(function (e) {
                            var music ={};
                            music.name = e.name;
                            music.id = e.id;
                            music.author = e.artists[0].name;
                            music.src = e.audio;
                            music.pic =e.album.picUrl;
                            musicList.push(music);
                        })
                        this.isLoading = false;
                        this.updateMusicList(musicList);
                    }.bind(this))
                    .catch(function(error){
                        console.log(error)
                    })
            },
            updateMusicList(musicList){
                this.$store.commit("updateMusicList",{
                    musicList
                })
            }
        },
        watch:{
            searchQuery:function(newVal,oldVal){
                if(this.searchQuery===undefined || this.searchQuery===null || this.searchQuery.length==0){
                    this.showClose = false;
                }
                else{
                    this.showClose = true;
                }
            },
        }
    }
</script>

<style lang="less">
    .search{
    .search_box{
        height:30px;
        line-height: 30px;
        width:100%;
        border-bottom: 1px solid darkgray;
        padding:5px;
        font-size: 14px;
        .input-search{
            width:80%;
            height:20px;
            padding:4px;
            border:none;
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
    }
</style>