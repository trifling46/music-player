/**
 * Created by Administrator on 2017/4/28.
 */
export default [
    {
        path:"/",
        redirect:"/music"
    },
    {
        path:"/music",
        component:resolve => require(["../modules/music/music-home.vue"],resolve),
    },
    {
        path:"/picture",
        component:resolve => require(["../modules/picture/picture-list.vue"],resolve),
    },
    {
        path:"/joke",
        component:resolve => require(["../modules/joke/joke-list.vue"],resolve),
    },
    {
        name:"music-list",
        path:"/music-list/:id/:title",
        component:resolve => require(["../modules/music/music-list.vue"],resolve)
    },
    {
        name:"music-play",
        path:"/music-play/:index",
        component:resolve => require(["../modules/music/music-play.vue"],resolve)
    },
    {
        name:"picture-detail",
        path:"/picture-detail/:index",
        component:resolve => require(["../modules/picture/picture-detail.vue"],resolve)
    },
    {
        path:"*",
        redirect:"/music"
    },
]