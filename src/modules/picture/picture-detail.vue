<template>
<div class="picture_detail">
    <header-back :title="title"></header-back>
    <div class="picture_detail_container">
        <swipe class="my-swipe" :showIndicators="false" :curIndex="curIndex" :auto="-1">
                <swipe-item class="slider_item" v-for="item in pictureList">
                    <span></span>
                    <img :src="item.url" alt="">
                    <img :src="item.url" class="slider_bg" alt="">
                </swipe-item>
        </swipe>
    </div>
</div>
</template>

<script>
    import headerBack from "../common/header-back.vue"
    import swipe from '../../lib/vue-swipe/src/swipe.vue';
    import swipeItem from '../../lib/vue-swipe/src/swipe.vue';
    import {mapMutations} from "vuex"
    import {mapGetters} from "vuex"
    export  default{
        data(){
            return{
            }
        },
        components:{
            swipe,swipeItem,headerBack
        },
        computed:{
            ...mapGetters([
                "pictureList","curIndex"
            ]),
            getSrc(){
                return this.pictureList[this.curIndex].url;
            },
            title(){
                return this.pictureList[this.curIndex].who;
            }
        },
    }

</script>

<style lang="less">
    .picture_detail{
        height:100%;
        .picture_detail_container{
            height:100%;
            .slider_item{
                &  *{
                    vertical-align: middle;
                }
                span{
                    height:100%;
                    width:0px;
                    vertical-align: middle;
                    display: inline-block;
                }
                img{
                    width: 100%;
                    max-height: 100%;
                    margin-left: -2%;
                }
                .slider_bg{
                    width:100%;
                    heigth:100%;
                    position:absolute;
                    left:0px;
                    top:0px;
                    transform: scale(5);
                    opacity: 0.1;
                }
            }
        }
    }
</style>