<template>
<div class="container">
  <div class="search-header">
    <i @click="back" class="el-icon-back"></i>
    <div class="search">
      <i class="mintui mintui-search"></i>
      <input type="text" v-model="keywords" placeholder="请输入关键字">
    </div>
    <button @click="searchContent" >搜索</button>
  </div>
  <div class="content">
    <div class="page-infinite">
      <div class="page-infinite-wrapper" ref="wrapper" >
        <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
          <li v-for="item in searchGoodsList" class="page-infinite-listitem">
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
  </div>
</div>
</template>

<script>
    import RecommendGoods from "@/components/view/RecommendGoods";
    import {getSearchList} from "../../http/getData";
    import {Toast} from 'mint-ui'
    import {getLocalStorage} from "../../custom/mixin";
    import * as Constants from '../../custom/constants'

    export default {
      name: "SearchList",
      data(){
        return {
          searchGoodsList:[],
          loading: false,
          allLoaded: true,
          keywords:'',
          info:'',
          page:1,
          limit:'10',
          token:''
        }
      },
      methods:{
        back(){
          this.$router.back()
        },
        searchContent(){
          if(this.keywords === ''){
            Toast({
              message: '请输入关键词',
              position: 'middle'
            })
          }
          this.loading = true;
          this.loadData()
        },
        loadMore() {
          if(!this.allLoaded){
            this.loading = true;
            this.loadData()
          }
        },
        loadData(){
          getSearchList({
            token:this.token
          },{
            query:this.keywords,
            page: this.page.toString(),
            limit: this.limit
          }).then(response=>{
            this.loading = false;
            if (response.result.totalPage < response.result.currPage) {
              this.info = "~~数据已全部加载完毕了~~"
              this.allLoaded = true
              return
            }else{
              this.allLoaded = false
            }
            response.result.list.map(item=>{
              this.searchGoodsList.push(item)
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
      components:{
        RecommendGoods
      },
      mounted(){
        this.token = getLocalStorage(Constants.TOKEN)
      }
    }
</script>

<style scoped>
.container{
  min-height: 100vh;
}
.search-header{
  background-color: #bf54f9;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
}
  .search-header i{
    color: #fff;
    font-size:20px;
  }
  .search{
    flex: 1;
    display: flex;
    align-items: center;
    background: #fff;
    height: 26px;
    border-radius: 15px;
    margin: 0 8px;
    padding:0 8px;
  }

.search i {
  color: #999;
  font-size: 16px;
  margin-right: 4px;
}

.search input:focus {
  color: #999;
}

.search input {
  outline: none;
  border: none;
  flex: 1;
  text-shadow: 0px 0px 0px #000;
  -webkit-text-fill-color: transparent;
}

  .search-header button{
    border: none;
    outline: none;
    /*background-image: url("../../assets/img/bg-white.png");*/
    background-color: transparent;
    color: #fff;
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
