<template>
<div class="page_music clearboth">
    <div class="item_container" v-for="album in albums">
        <img class="item_music" :title="album.name" :src="album.bg" @click="showList(album.id,album.name)">
    </div>

</div>
</template>

<script>
    export  default{
        data() {
            return {
                albums:[
                    {
                        name: "飙升榜",
                        id:19723756,
                        bg: require("./img/soar_music.jpg")
                    },
                    {
                        name: "新歌榜",
                        id:3779629,
                        bg:require("./img/new_music.jpg")
                    },
                    {
                        name: "原创榜",
                        id:2884035,
                        bg:require("./img/original_music.jpg")
                    },
                    {
                        name: "KTV麦榜",
                        id:21845217,
                        bg:require("./img/ktv_music.jpg")
                    },
                    {
                        name: "华语金曲榜",
                        id:4395559,
                        bg:require("./img/chinese_music.jpg")
                    },
                    {
                        name: "我的专辑",
                        id:98833242,
                        bg:require("./img/my_music.jpg")
                    },
                ]
            };
        },
        methods:{
            showList(id,title){
              this.$router.push({name:"music-list",params:{id:id,title:title}})
            }
        }
    }
</script>

<style lang="less">
.page_music{
    .item_container{
        width:50%;
        height:200px;
        float:left;
        box-sizing: border-box;
        .item_music{
            width:100%;
            height:100%;
        }
    }
}
</style>