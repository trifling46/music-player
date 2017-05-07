<template>
<div class="page_joke">
    <loading :isLoading="isLoading"></loading>
    <mt-navbar v-model="selected">
        <mt-tab-item id="1" class="tab_item">趣图</mt-tab-item>
        <mt-tab-item id="2" class="tab_item">笑话</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
            <div  class="funnyPics" ref="funnyPics">
                <swipe class="my-swipe" :showIndicators="false" :auto="100000000">
                    <swipe-item class="slider_item" v-for="item in funnyPicList">
                        <span></span>
                        <div class="funnyPic_content">
                            <img :src="item.url" alt="">
                            <img :src="item.url" class="funny_bg" alt="">
                            <p v-text="item.content">
                            </p>
                        </div>

                    </swipe-item>
                </swipe>
            </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2" >
            <div  class="jokes" ref="jokes">
                <swipe class="my-swipe" :showIndicators="false" :auto="100000000">
                    <swipe-item class="slider_item" v-for="item in jokeList">
                        <span></span>
                        <div class="joke_content">
                            <p v-text="item.content">
                            </p>
                        </div>

                    </swipe-item>
                </swipe>
            </div>
        </mt-tab-container-item>
    </mt-tab-container>
</div>
</template>

<script>
    import loading from "../common/loading.vue"
    import { Swipe, SwipeItem } from 'vue-swipe';
    import {mapMutations} from "vuex"
    import {mapGetters} from "vuex"
    export  default{
           data(){
               return{
                   selected:2,
                   isLoading:false,
               }
           },
           components:{
               loading,Swipe,SwipeItem
           },
           computed:{
               ...mapGetters([
                   "funnyPicList","jokeList","curFunnyIndex","curJokeIndex","contentHeight"
               ])
           },
           mounted:function () {
               this.loadMoreJoke();
               this.loadMoreFunnyPic();
               this.$refs.funnyPics.style.height = this.contentHeight-60+'px';
               this.$refs.jokes.style.height = this.contentHeight-60+'px';
           },
          methods:{
              ...mapMutations([
                  "updateFunnyPicList","updateJokeList","updateCurFunnyIndex","updateCurJokeIndex"
              ]),
              loadMoreJoke(){
                  this.isLoading = true;
                  this.axios.get('https://bird.ioliu.cn/joke/rand?type=text')
                      .then(function (res) {
                          this.$store.commit("updateJokeList",{
                              jokeList:res.data.data,
                          })
                          this.isLoading = false;
                      }.bind(this))
                      .catch(function (error) {
                          console.log(error)
                      })
              },
              loadMoreFunnyPic(){
                  this.isLoading = true;
                  this.axios.get('https://bird.ioliu.cn/joke/rand')
                      .then(function (res) {
                          this.$store.commit("updateFunnyPicList",{
                              funnyPicList:res.data.data,
                          })
                          this.isLoading = false;
                      }.bind(this))
                      .catch(function (error) {
                          console.log(error)
                      })
              }
          },
        watch:{
            selected(newVal,oldVal){
                console.log(newVal);
            }
        }

    }
</script>

<style lang="less">
.page_joke{
    .tab_item{
        background: #eadee4;
    }
    .funnyPics{
        margin-top:0px;
    }
    .funny_bg{
        position:absolute;
        left:0px;
        top:0px;
        width:100%;
        height:100%;
        opacity: 0.1;
        transform: scale(8);
    }
        .slider_item{
            text-align: center;
            background:#fbf4f7;
            .funnyPic_content {
                display: inline-block;
                width: 100%;
                margin-left: -2%;
            }
            span{
                height:100%;
                width:0px;
                vertical-align: middle;
                display: inline-block;
            }
            & >*{
                vertical-align: middle;
            }
            img{
                max-width: 80%;
                max-height:80%;
            }
            p{
                font-size:14px;
            }
        }
    .joke_content{
        display: inline-block;
        width: 100%;
        margin-left: -2%;
        p{
            line-height:1.5em;
            text-align: left;
            padding: 0px 10px;
        }
    }
    }

</style>