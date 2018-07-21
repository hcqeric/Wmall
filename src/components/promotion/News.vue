<template>
  <div class="page-infinite">
    <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
        <li v-for="item in newsList" class="page-infinite-listitem">
          <div class="news-item">
            <img v-if="item.fileList != undefined" :src="item.fileList[0].url" alt="">
            <p>{{item.title}}</p>
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
      <p>暂时还没有新闻动态</p>
    </div>
  </div>

</template>

<script>
  import {getNewsList} from "../../http/getData";

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
            info:''
          }
      },
      mounted(){
        // this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        this.loadData()
      },
      methods:{
        loadMore() {
          if(!this.allLoaded){
            this.loading = true;
            this.loadData()
          }
        },
        loadData(){
          getNewsList({
            page: this.page.toString(),
            limit: this.limit
          }).then(response=>{
            console.log(response)
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
  .page-infinite {
    overflow: scroll;
    position: absolute;
    top: 48px;
    bottom: 48px;
    width: 100%;
    background-color: #fff;
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

  .nolist{
    position: fixed;
    top:48px;
    width: 100%;
    bottom:50px;
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
</style>
