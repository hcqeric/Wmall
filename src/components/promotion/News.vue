<template>
  <div class="news-container">
    <mt-header fixed :title="title">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="news-content">
      <div class="page-infinite">
        <div class="page-infinite-wrapper" ref="wrapper">
          <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
            <li v-for="item in newsList" class="page-infinite-listitem news-list">
              <div class="news-item" @click="toNewsDetail(item)">
                <div class="news-title">
                  <p>{{item.title}}</p>
                  <p>{{item.updateTime|DateFormat("yyyy-MM-dd hh:mm")}}</p>
                </div>
                <img v-if="item.fileList != undefined" :src="item.fileList[0].url" alt="">
              </div>
            </li>
          </ul>
          <p v-show="loading" class="page-infinite-loading">
            <mt-spinner type="fading-circle"></mt-spinner>
            加载中...
          </p>
          <p v-show="allLoaded" class="nodata">{{info}}</p>
        </div>
        <div class="nolist" v-if="isNoList">
          <img src="../../assets/img/nolist.png" />
          <p>暂时还没有{{title}}</p>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
  import {getNewsList} from "../../http/getData";
  import {mapActions} from 'vuex'

  export default {
      name: "News",
      data(){
          return {
            newsList:[],
            loading: false,
            allLoaded: true,
            wrapperHeight: 0,
            limit:'10',
            page:1,
            isNoList:false,
            info:'',
            type:'',
            title:'',
            newsData: [
              {
                type: 'newsMaterial',
                title: '最新素材'
              },
              {
                type: 'newsRecommend',
                title: '爆款推荐'
              },
              {
                type: 'newsOfficial',
                title: '官方图'
              },
              {
                type: 'newsSellers',
                title: '买家秀'
              },
              {
                type: 'newsEncouragement',
                title: '励志语录'
              },
              {
                type: 'newsMerchants',
                title: '招商海报'
              },
              {
                type: 'newsEvent',
                title: '大事件'
              }
            ]
          }
      },
      mounted(){
        let {type} = this.$route.params
        this.type = type
        this.newsData.forEach(item => {
          if(this.type == item.type){
            this.title = item.title
          }
        })
        this.loadData()
      },
      methods:{
        ...mapActions({
          setNewsContent: 'setNewsContent'
        }),
        goBack(){
          this.$router.back()
        },
        toNewsDetail(item){
          this.setNewsContent(item)
          this.$router.push("/news/" + item.fileList[0].foreignId)
        },
        loadMore() {
          if(!this.allLoaded){
            this.loading = true;
            this.loadData()
          }
        },
        loadData(){
          getNewsList({
            page: this.page.toString(),
            limit: this.limit,
            type: this.type
          }).then(response=>{
            this.loading = false;
            if(response.result.currPage == 1 && response.result.totalPage < response.result.currPage) {
              this.isNoList = true
              this.allLoaded = true
              return
            }else if(response.result.currPage == 1 && response.result.totalCount < response.result.currPage * 10){
              this.info = "~~数据已全部加载完毕了~~"
              this.allLoaded = true
            }
            else if (response.result.currPage != 1 && response.result.totalPage < response.result.currPage) {
              this.info = "~~数据已全部加载完毕了~~"
              this.allLoaded = true
              return
            }else{
              this.allLoaded = false
            }
            response.result.list.map(item=>{
              this.newsList.push(item)
            })
            this.page++
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
  .news-container{
    width: 100vw;
    min-height: 100vh;
  }
  .mint-header{
    height: 48px;
    background: #000;
  }
  .news-content{
    padding-top: 48px;
  }
  .page-infinite {
    /*overflow: scroll;*/
    /*position: absolute;*/
    /*top: 48px;*/
    /*bottom: 48px;*/
    /*width: 100%;*/
    /*background-color: #fff;*/
  }

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

  .news-item {
    position: relative;
    display: flex;
    box-sizing: border-box;
    padding: 16px 0;
  }
  .news-item:after{
    position: absolute;
    width: 100%;
    height: 1px;
    content: '';
    background: #eee;
    bottom: 0;
  }
  /*li:last-child>.news-item::after{*/
    /*height: 0;*/
  /*}*/

  .news-item img {
    width: 80px;
    height: 80px;
  }
  .news-title{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .news-title p{
    font-size: 14px;
    color: #999;
  }
  .news-title p:first-child {
    font-size: 18px;
    color: #000;
  }

  .nolist{
    position: fixed;
    top:48px;
    width: 100%;
    bottom:0px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #efefef
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
  .nodata{
    padding:16px 0;
    text-align: center;
  }
  .news-list{
    margin: 0 16px;
    list-style: none;
  }
</style>
