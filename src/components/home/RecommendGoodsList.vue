<template>
  <div class="page-infinite">
    <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
        <li v-for="item in list" class="page-infinite-listitem">
          <RecommendGoods class="goods-item"  />
        </li>
      </ul>
      <p v-show="loading" class="page-infinite-loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        加载中...
      </p>
    </div>
  </div>
</template>

<script>
  import RecommendGoods from "@/components/view/RecommendGoods";
  export default {
    name: "RecommendGoodsList",
    data(){
      return {
        list:[],
        loading: false,
        allLoaded: false,
        wrapperHeight: 0
      }
    },
    components:{
      RecommendGoods
    },
    mounted(){
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
      for (let i = 1; i <= 1; i++) {
        this.list.push(i);
      }
    },
    methods:{
      loadMore() {
        this.allLoaded = true;
        this.loading = true;

        setTimeout(() => {
          let last = this.list[this.list.length - 1];
          for (let i = 1; i <= 5; i++) {
            this.list.push(last + i);
          }
          this.loading = false;
        }, 2500);
      }
    }

  }
</script>

<style scoped>
  .page-infinite-loading {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bf54f9;
    text-align: center;
    padding: 8px 0;
  }

  .page-infinite-loading span {
    display: block;
    text-align: center;
    margin: 0 auto;
  }
  li{
    list-style: none;
  }
  .goods-item{
    position: relative;
  }
  .goods-item:after{
    position: absolute;
    bottom: 1px;
    height: 1px;
    background-color: #eee;
    width: 100%;
    content: '';
  }
  .goods-item:last-of-type:after{
    height: 0;
  }
</style>

