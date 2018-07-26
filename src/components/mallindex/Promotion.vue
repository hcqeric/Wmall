<template>
  <div class="promotion">
    <div class="goods-nav">
      <div :class="selected==1 ? 'is-selected' : ''" @click="changeTab('1')">我要推广</div>
      <div :class="selected==2 ? 'is-selected' : ''" @click="changeTab('2')">发现</div>
      <div :class="selected==3 ? 'is-selected' : ''" @click="changeTab('3')">新闻动态</div>
    </div>
    <div v-if="selected==1">
      <div>
        <SlideRender :templateList="templateList"></SlideRender>
      </div>
    </div>
    <div v-if="selected==2">
      <Find></Find>
    </div>
    <div v-if="selected==3">
      <router-view to="/news"></router-view>
    </div>
  </div>
</template>

<script>
  import SlideRender from '@/components/mallindex/common/SlideRender'
  import Find from '@/components/promotion/Find'
  import News from '@/components/promotion/News'
  import {getShareList} from "../../http/getData";
  import * as Constants from '../../custom/constants'
  import {getLocalStorage} from "../../custom/mixin";

  export default {
      name: "Promotion",
      data() {
        return {
          selected: '',
          templateList:[]
        };
      },
      methods: {
        changeTab(tab) {
          this.selected = tab
          if (tab == 3) {
            this.$router.push('/promotion/news')
          }else{
            this.$router.push('/promotion')
          }
        }
      },
      components: {
        SlideRender,
        Find,
        News
      },
      mounted(){
        let tk = getLocalStorage(Constants.TOKEN)
        getShareList({
          token: tk
        }).then(response=>{
          response.result.map(item=>{
            this.templateList.push(item)
          })
          this.changeTab('1')
        })
      }
    }
</script>

<style scoped>
  .promotion{
    background-color: #f6f7f9;
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: hidden;
    left: 0;
    top:0;
  }
  .goods-nav{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .goods-nav div{
    color: #fff;
    flex: 1;
    background-color: #bf54f9;
    text-align: center;
    padding: 16px;
    text-shadow: 0px 0px 1px #FF659F;
  }
  .goods-nav div.is-selected{
    color: #fff;
    font-weight: bold;
    border: none;
    position: relative;
    text-shadow: none;
  }

  .goods-nav div.is-selected:after{
    position: absolute;
    content: '';
    bottom: 8px;
    left: 50%;
    margin-left: -20px;
    height: 3px;
    width: 40px;
    background-color: #fff;
  }
</style>
