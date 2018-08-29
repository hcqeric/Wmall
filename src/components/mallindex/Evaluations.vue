<template>
  <div class="container">
    <mt-header fixed title="查看评价">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="page-infinite">
        <div class="page-infinite-wrapper" ref="wrapper" >
          <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
            <div class="recommend-list" v-for="item in appraisesList">
              <Recommend  :comment="item"></Recommend>
            </div>
          </ul>
          <p v-show="loading" class="page-infinite-loading">
            <mt-spinner type="fading-circle"></mt-spinner>
            加载中...
          </p>
          <p v-show="allLoaded" class="nodata">{{info}}</p>
        </div>
      </div>
    </div>
    <div class="nolist" v-if="isNoList">
      <img src="../../assets/img/nolist.png" />
      <p>该商品暂无评价</p>
    </div>
  </div>
</template>

<script>
  import Recommend from '@/components/view/Recommend'
  import {getGoodsAppraises} from "../../http/getData"

  export default {
    name: "Evaluations",
    data(){
      return {
        page:1,
        limit: '15',
        loading: false,
        allLoaded: true,
        info:'',
        goodsNum:'',
        appraisesList:[],
        isNoList:false,
        appraisesItem:null
      }
    },
    components:{
      Recommend
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      loadMore() {
        if(!this.allLoaded){
          this.loading = true;
          this.loadData()
        }
      },
      loadData(){
        getGoodsAppraises({
          page: this.page.toString(),
          limit: this.limit,
          goodsId:this.goodsNum
        }).then(response=>{

          this.loading = false;
          if(response.result.currPage == 1 && response.result.totalPage < response.result.currPage) {
            this.isNoList = true
            this.allLoaded = true
            return
          }
          else if (response.result.currPage != 1 && response.result.totalPage < response.result.currPage) {
            this.info = "~~数据已全部加载完毕了~~"
            this.allLoaded = true
            return
          }else{
            this.allLoaded = false
          }
          response.result.list.map((item)=>{
            this.appraisesItem = null
            this.appraisesItem = item
            this.$set(this.appraisesItem,"goods", response.goods)
            this.appraisesList.push(this.appraisesItem)
          })
          this.page++
        }).catch(error=>{
          console.log(error);
          this.loading = false
          this.allLoaded = true
          this.info = "~~数据加载异常，请稍后再试~~"
        })
      }
    },
    mounted(){
      let {id} = this.$route.params
      this.goodsNum = id
      this.loading = true;
      this.loadData()
    }
  }
</script>

<style scoped>
  .container{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: #efefef;
    overflow: scroll;
  }
  .mint-header{
    background-color: #000;
    height: 48px;
    z-index: 9999;
  }
  .content{
    margin-top: 48px;
  }
  .recommend-list{
    margin-bottom: 10px;
  }


  .nolist{
    position: fixed;
    top:48px;
    width: 100%;
    bottom:0;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .nolist img{
    width: 80px;
  }
  .nolist p{
    margin-top: 20px;
    text-align: center;
    font-size: 20px;
    color: #999;
  }
  .page-infinite-list{
    background: #efefef;
  }

  .nodata{
    padding:16px 0;
    text-align: center;
  }
</style>

