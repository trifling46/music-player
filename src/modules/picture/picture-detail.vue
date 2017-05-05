<template>
<div class="picture_detail">
    <header-back :title="title"></header-back>
    <div class="picture_detail_container">
        <img :src="getSrc" alt="">
    </div>
</div>
</template>

<script>
    import headerBack from "../common/header-back.vue"
    import {mapMutations} from "vuex"
    import {mapGetters} from "vuex"
    export  default{
        data(){
            return{
            }
        },
        components:{
            headerBack,
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
        mounted:function(){

        },
        methods:{

        }
    }

</script>

<style lang="less">
    .picture_detail{
        height:100%;
        .picture_detail_container{
            display: flex;
            align-items: center;
            justify-content: center;
            height:100%;
            img{
                width:100%;
                max-height:100%
            }
        }
    }
</style>