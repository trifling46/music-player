<template>
    <div class="loading" v-show="isLoading">
        <span class="station"></span>
        <mt-spinner type="fading-circle" :size="60" color="white" class="loading-spinner"></mt-spinner>
    </div>
</template>

<script>
    export  default{
        data(){
            return{
            }
        },
        props:{
            isLoading:{
                type:Boolean,
                default:false,
            }

        }

    }
</script>

<style lang="less">
    .loading{
        position:fixed;
        top:0px;
        left:0px;
        height:100%;
        width:100%;
        text-align:center;
        background:black;
        opacity: 0.5;
        z-index: 99;
        .loading-spinner{
            display: block;
            position: relative;
            left: 45%;
            margin-top: 80%;
            z-index: 100;
        }
    }
    .station{
        display: inline-block;
        position:relative;
        left:50%;
        margin-left:-30px;
    }
</style>