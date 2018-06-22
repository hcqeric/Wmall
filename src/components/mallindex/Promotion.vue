<template>
  <div class="promotion">
  <mt-navbar v-model="selected">
    <mt-tab-item id="1">我要推广</mt-tab-item>
    <mt-tab-item id="2">发现</mt-tab-item>
    <mt-tab-item id="3">新闻动态</mt-tab-item>
  </mt-navbar>


  <div  v-show="selected==1">
    <div slot="content" class="slid">
      <SlideRender></SlideRender>
    </div>
  </div>
  <div  v-show="selected==2">
    <Find></Find>
  </div>
  <div  v-show="selected==3">
    <News></News>
  </div>
  </div>
</template>

<script>
  import SlideRender from '@/components/mallindex/common/SlideRender'
  import Find from '@/components/promotion/Find'
  import News from '@/components/promotion/News'
    export default {
      name: "Promotion",
      data() {
        return {
          selected: '1'
        };
      },
      methods: {
        handleChange(index) {

        }
      },
      components: {
        SlideRender,
        Find,
        News
      }
    }
</script>

<style scoped>
  .promotion{
    background-color: white;
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: hidden;
    left: 0;
    top:0;
  }

</style>
