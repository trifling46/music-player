<template>
<div class="page_joke">
    <loading :isLoading="isLoading"></loading>
    <mt-navbar v-model="selected">
        <mt-tab-item id="1">趣图</mt-tab-item>
        <mt-tab-item id="2">笑话</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
            <div  class="funnyPics">

            </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
            <div  class="jokes">

            </div>
        </mt-tab-container-item>
    </mt-tab-container>
</div>
</template>

<script>
    import loading from "../common/loading.vue"
    import {mapMutations} from "vuex"
    import {mapGetters} from "vuex"
    export  default{
           data(){
               return{
                   selected:1,
                   isLoading:false,
               }
           },
           components:{
               loading
           },
           computed:{
               ...mapGetters([
                   "funnyPicList","jokeList","curFunnyIndex","curJokeIndex"
               ])
           },
           mounted:function () {
               this.loadMoreJoke();
               this.loadMoreFunnyPic();
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
          }

    }
</script>

<style lang="less">

</style>