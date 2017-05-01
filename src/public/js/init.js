/**
 * Created by Administrator on 2017/4/28.
 */
window.onload = function () {
   var root = document.getElementsByTagName("html")[0];
   root.style.fontSize = document.documentElement.clientWidth* 0.0625 + "px";
   window.addEventListener("resize",function () {
       root.style.fontSize = document.documentElement.clientWidth* 0.0625 + "px";
   })
}