<template>
  <div class="page-infinite">
    <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
        <li v-for="item in list" class="page-infinite-listitem">
          <RecommendGoods />
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
    color: #1ABC9C;
    text-align: center;
    padding: 8px 0;
  }

  .page-infinite-loading span {
    display: block;
    text-align: center;
    margin: 0 auto;
  }

  .news-item {
    box-sizing: border-box;
    margin: 0 24px;
    padding-top: 16px;
    border-bottom: 1px solid #ccc;
  }

  .news-item img {
    width: 100%;
  }

  .news-item p {
    font-size: 18px;
    color: #666;
    text-align: center;
  }
  li{
    list-style: none;
  }
</style>

