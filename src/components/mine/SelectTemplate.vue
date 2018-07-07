<template>
<div class="container">
  <mt-header :title="title">
    <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
  </mt-header>
  <div class="content">
    <SlideRender></SlideRender>
  </div>
</div>
</template>

<script>
  import SlideRender from '@/components/mallindex/common/SlideRender'
    export default {
      name: "SelectTemplate",
      data() {
        return {
          index: 0,
          turnToPrev: false,
          turnToNext: false,
          isAutoPlay: false,
          isLoop: false,
          isShowDot: true,
          speed: 400,
          threshold: 0.3,
          interval: 4000,
          title: null
        }
      },
      methods: {
        goBack() {
          this.$router.back()
        }
      },
      mounted(){
        let {type} = this.$route.params
        console.log(type)
        if(type == 0){
          this.title = "积分须知"
        }else if(type == 1){
          this.title = "好友须知"
        }
      },
      components:{
        SlideRender
      }
    }
</script>

<style scoped>
.container{
  background-color: #f6f7f9;
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
  left: 0;
  top:0;
}
.mint-header{
  background-color: #000;
  height: 48px;
  z-index: 9999;
}
</style>
