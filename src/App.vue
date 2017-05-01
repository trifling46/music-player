<template>
  <div id="app">
    <mt-header fixed :title="item_title" class="app-theme">
      <mt-button slot="left"><i class="fa fa-bars" aria-hidden="true"></i></mt-button>
      <mt-button slot="right"><i class="fa fa-sign-out" aria-hidden="true"></i></mt-button>
    </mt-header>
    <div class="content">
      <router-view></router-view>
    </div>

    <page-footer @changeTitle="changeTitle"></page-footer>
  </div>
</template>

<script>
    import pageFooter from "./modules/footer/page-footer.vue"
    export default {
        name: 'app',
        data () {
            return {
                'item_title':"lsl"
            }
        },
        components:{
            pageFooter,
        },
        methods:{
            changeTitle(payload){
                this.item_title = payload.title ;
            }
        }
    }
</script>

<style lang="less">
  .content{
    padding:40px 0px 0px 0px;
  }
  .custom{
    background:red;
  }

</style>
