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
        path:"*",
        redirect:"/music"
    },
]