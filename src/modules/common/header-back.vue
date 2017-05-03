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
    export  default{
        data(){
            return{

            }
        },
        props: {
            title: {
                type:String,
                required: true,
            }
        },
        methods:{
            back(){
                this.$router.back()
            }

        }
        }
</script>

<style lang="less">

</style>