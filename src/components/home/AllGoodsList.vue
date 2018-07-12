<template>
  <div class="page-infinite">
    <div class="page-infinite-wrapper" ref="wrapper" >
      <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
        <li v-for="item in allGoodsList" class="page-infinite-listitem">
          <RecommendGoods class="goods-item" :goodsInfo="item" />
        </li>
      </ul>
      <p v-show="loading" class="page-infinite-loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        加载中...
      </p>
      <p v-show="allLoaded" class="nodata">{{info}}</p>
    </div>
  </div>
</template>

<script>
  import RecommendGoods from "@/components/view/RecommendGoods";
  import {getAllGoods} from "../../http/getData";

  export default {
    name: "AllGoodsList",
    data(){
      return {
        allGoodsList:[],
        loading: false,
        allLoaded: false,
        wrapperHeight: 0,
        page: 1,
        limit: '1',
        info:''
      }
    },
    components:{
      RecommendGoods
    },
    mounted(){
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
      this.allGoodsList = []
      // this.loadData()
    },
    methods:{
      loadMore() {
        if(!this.allLoaded){
          this.loading = true;
          this.loadData()
        }
      },
      loadData(){
        getAllGoods({
          page: this.page.toString(),
          limit: this.limit
        }).then(response=>{
          console.log(response)
          this.loading = false;
          if (response.result.totalCount <= response.result.currPage) {
            this.allLoaded = true
            return
          }
          this.page++
          response.result.list.map(item=>{
            this.recGoodsList.push(item)
          })
        }).catch(error=>{
          console.log(error);
          this.loading = false
          this.allLoaded = true
          this.info = "~~数据加载异常，请稍后再试~~"
        })
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
  .nodata{
    padding:16px 0;
    text-align: center;
  }
</style>

