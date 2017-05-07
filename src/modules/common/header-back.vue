<template>
    <div class="header-back">
        <mt-header fixed :title="title"  class="app-theme">
            <div  slot="left" @click="back">
                <mt-button icon="back">返回</mt-button>
            </div>
        </mt-header>
    </div>
</template>

<script>
    import {mapGetters} from "vuex"
    import {mapMutations} from "vuex"
    export  default{
        data(){
            return{

            }
        },
        computed: {
            ...mapGetters([
                "musicList", "activeMusic", "isPlay", "musicLyric", "loopList"
            ]),
        },
        props: {
            title: {
                type:String,
                required: true,
            }
        },
        methods:{
            ...mapMutations([
                "updateLoopList"
            ]),
            back(){
                this.$router.back()
            }

        }
        }
</script>

<style lang="less">

</style>