<template>
        <mt-tabbar class="app-theme footer">
            <div class="mint-tab-item"  @click="changeTitle('笑话')" >
                <router-link to="/joke">
                    <div class="mint-tab-item-icon">
                        <i aria-hidden="true" class="fa fa-book"></i>
                    </div>
                    <div class="mint-tab-item-label">
                        笑话
                      </div>
                </router-link>
            </div>

            <div class="mint-tab-item" @click="changeTitle('音乐')">
                <router-link to="/music"  >
                    <div class="mint-tab-item-icon">
                        <i aria-hidden="true" class="fa fa-music"></i>
                    </div>
                    <div class="mint-tab-item-label">
                        音乐
                       </div>
                </router-link>
            </div>

            <div class="mint-tab-item" @click="changeTitle('图片')">
                <router-link to="/picture"  >
                    <div class="mint-tab-item-icon">
                        <i aria-hidden="true" class="fa fa-picture-o"></i>
                    </div>
                    <div class="mint-tab-item-label">
                        图片
                    </div>
                </router-link>
            </div>
        </mt-tabbar>
</template>

<script>
    export  default{
        data(){
            return{

            }
        },
        methods:{
            changeTitle(val){
                console.log(val)
                this.$emit("changeTitle",{
                    title:val,
                })
            }
        }

    }
</script>

<style lang="less">
    .footer {
        position: fixed !important;
        height:55px;
        a{
            color: #eae5e5;
        }
        a:hover{
            color:#ffffff;
        }

    }
</style>