<template>
<div class="page_picture" ref="pagePicture">
    <div class="picture_item" v-for="(item,index) in pictureList" @click="showPictureDetail(index)">
        <img :src="item.url" alt="">
    </div>
    <loading :isLoading="isLoading"></loading>
</div>
</template>

<script>
    import loading from "../common/loading.vue"
    import {mapMutations} from "vuex"
    import {mapGetters} from "vuex"
    export  default{
        data(){
            return{
                page:0,
                isLoading:false,
            }
        },
        components:{
            loading
        },
        computed:{
            ...mapGetters([
             "pictureList","contentHeight"
            ]),
        },
        mounted:function () {
            this.$refs.pagePicture.addEventListener("scroll",this.scrollPage)
          var  promise  = new Promise(function (resolve,reject) {
              this.loadMore();
               resolve();
          }.bind(this));
         /*   promise.then(function(value) {
                console.log("end")
                this.loadMore();
            }.bind(this), function(error) {
                console.log("error")
            });*/

         },
        methods:{
            ...mapMutations([
                "updatePictureList","updateCurIndex"
            ]),
            loadMore(){
                this.page++;
                this.isLoading = true;
                this.axios.get('https://gank.io/api/data/福利/20/'+this.page)
                    .then(function(res){
                        console.log(res.data.results)
                        this.$store.commit("updatePictureList",{
                            pictureList: res.data.results,
                        })
                        this.isLoading = false;
                    }.bind(this))
                    .catch(function(e){
                        console.log(e)
                    })
            },
            scrollPage(event){
                var height =  this.contentHeight+this.$refs.pagePicture.scrollTop;
                if(this.$refs.pagePicture.scrollHeight-height<global.DISTANCEBTM){
                    this.loadMore();
                }
            },
            showPictureDetail(index){
                this.$store.commit("updateCurIndex",{
                    curIndex:index
                });
                this.$router.push({name:"picture-detail",params:{index:index}});
            }
        }

    }
</script>

<style lang="less">
    .page_picture{
        display: flex;
        flex-wrap: wrap;
        height:100%;
        overflow-y: scroll;
        &:after{
            content: "";
            flex-grow: 10000;
        }
        .picture_item{
            height:100px;
            flex-grow:1;
            flex-shrink: 1;
            margin:2px;
            img{
                max-height:100%;
                min-width: 100%;
            }
        }

    }

</style>