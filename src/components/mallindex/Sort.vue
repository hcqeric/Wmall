<template>
  <div class="sort-container">
    <Header/>
    <!--<ul>-->
      <!--<li v-for="item in list" class="sort-item" @click="gotoDetail(item)">-->
        <!--<img  :src="item.url" />-->
        <!--<div class="serial"><span>{{item.name}}</span></div>-->
      <!--</li>-->
    <!--</ul>-->
    <div  class="sort-content">
      <div class="nav-left">
        <div class="nav-list" id="nav">
          <div class="nav-item" v-for="(item, index) in serials" :class="index == selected ? 'selected' : ''" @click="changeItem(index)">{{item.name}}</div>
        </div>
      </div>
      <div class="goods-right">
        <div class="goods-list">
          <div class="page-infinite">
            <div class="page-infinite-wrapper" ref="wrapper" >
              <div class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
                <div class="masonry">
                  <div class="column">
                    <div v-for="item in oddGoodsList">
                      <GoodsItem goodsType="2" :goodsItem="item"  class="item"></GoodsItem><!-- more items -->
                    </div>
                  </div>
                  <div class="column">
                    <div v-for="item in evenGoodsList">
                      <GoodsItem goodsType="2" :goodsItem="item"   class="item"></GoodsItem> <!-- more items -->
                    </div>
                  </div>
                </div>
              </div>
              <p v-show="loading" class="page-infinite-loading">
                <mt-spinner type="fading-circle"></mt-spinner>
                加载中...
              </p>
              <p v-show="allLoaded" class="nodata">{{info}}</p>
            </div>
          </div>
          <div class="no-serial-goods" v-if="showNoGoods">
            <img src="../../assets/img/nolist.png" />
            <span>该分类下暂无商品</span>
          </div>
        </div>
      </div>
    </div>
    <div class="nolist" v-if="isNoList">
      <img src="../../assets/img/nolist.png" />
      <p>该系列下暂无商品</p>
    </div>
  </div>

</template>

<script>
    import Header from "@/components/mallindex/common/Header"
    import GoodsItem from '@/components/view/GoodsItem'
    import {getAllSerials, getSerialGoods} from "../../http/getData";
    import { getLocalStorage } from '@/custom/mixin';
    import * as Constants from '../../custom/constants'
    export default {
        name: "Sort",
      data(){
          return {
            page:1,
            limit:'10',
            goodsTypeId:'',
            isNoList: false,
            loading: false,
            allLoaded: true,
            info:'',
            categoryId:'',
            oddGoodsList:[],
            evenGoodsList:[],
            list: [],
            selected: 0,
            serials:[],
            showNoGoods: false
          }
      },
      methods: {
        getCategoryGoods() {
          if (this.serials.length > 0) {
            getSerialGoods({
              page: this.page.toString(),
              limit: this.limit,
              goodsTypeId: this.categoryId.toString()
            }).then(response => {
              if(response.result.list == undefined){
                this.showNoGoods = true
              }else{
                this.showNoGoods = false
              }
              this.loading = false;
              if(response.result.currPage == 1 && response.result.totalPage < response.result.currPage) {
                this.allLoaded = true
                return
              }else if(response.result.currPage == 1 && response.result.totalCount < response.result.currPage * 10){
                // this.info = "~~数据已全部加载完毕了~~"
                this.allLoaded = true
              }
              else if (response.result.currPage != 1 && response.result.totalPage < response.result.currPage) {
                // this.info = "~~数据已全部加载完毕了~~"
                this.allLoaded = true
                return
              }else{
                this.allLoaded = false
              }
              response.result.list.map((item,index)=>{
                if(index % 2 == 0){
                  this.oddGoodsList.push(item)
                }else{
                  this.evenGoodsList.push(item)
                }
              })
              this.page++
            })
          }
        },

        loadMore() {
          if(!this.allLoaded){
            this.loading = true;
            this.getCategoryGoods()
          }
        },
        changeItem(n) {

          this.selected = n
          if (this.serials[n].proId != undefined) {
            this.categoryId = this.serials[n].id
          }

          this.loading = true
          this.page = 1
          this.info = ''
          this.oddGoodsList = []
          this.evenGoodsList = []
          this.getCategoryGoods()
        }
      },
      mounted(){
        let tk = getLocalStorage(Constants.TOKEN)

        getAllSerials({
          token: tk
        }).then(response=>{
          response.result.map(item => {
            this.serials.push(item)
          })

          if(this.serials.length > 0){
            this.changeItem(0)
          }else{
            this.isNoList = true
          }
        })

      },
      components:{
          Header,
        GoodsItem
      }
    }
</script>

<style scoped>
  .sort-container{
    min-height: 100vh;
    background: #efefef;
    /* overflow-y: scroll; */
    /*margin-bottom: 50px;*/
    position: relative;
  }

  .sort-content{
    position: absolute;
    top: 58px;
    bottom: 50px;
    width: 100vw;
    display: flex;
    overflow: hidden;
  }


  .nav-left{
    flex: 2;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
  }
  .nav-list{
    flex: 1;
  }
  .nav-item{
    box-sizing: border-box;
    display: flex;
    align-items: center;
    text-align: center;
    height: 12vh;
    padding: 0 8px;
    /*border-bottom: 2px solid #efefef;*/
  }
  .nav-item.selected{
    position: relative;
    background: #fff;
    color: #c053fa;
  }
  .nav-item.selected:after{
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 12vh;
    width: 2px;
    background-color: #c053fa;
  }

  .goods-right{
    flex: 8;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    background: #fff;
  }

  .goods-list {
    flex: 1;
  }
  .masonry{
    display: flex;
    flex-direction: row;
  }
  .column {
    display: flex;
    flex-direction: column;
    width: calc(100%/2);
  }
  .column .item{
    padding: 8px;
    width: 100%;
  }


  /*去除滚动条样式*/
  .nav-left::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  .nav-left::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }

  .nav-left::-webkit-scrollbar-track {
    box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
  .goods-right::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  .goods-right::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }

  .goods-right::-webkit-scrollbar-track {
    box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
  /*去除滚动条样式*/


  /* no-use */
  /*.sort-item{*/
    /*margin-top: 8px;*/
    /*position: relative;*/
    /*display: block;*/
  /*}*/
  /*.serial{*/
    /*position: absolute;*/
    /*padding: 4px 26px 4px 30px;*/
    /*right: 0;*/
    /*top: 0;*/
    /*color: #fff;*/
    /*background-image: url("../../assets/img/sorttag.png");*/
    /*background-repeat: no-repeat;*/
    /*background-size: cover;*/
  /*}*/
  /*img{*/
    /*height: 200px;*/
    /*width: 100%;*/
    /*object-fit: cover;*/
    /*object-position: center;*/
    /*display: block;*/
  /*}*/
  /* no-use */

  .no-serial-goods{
    margin-top: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .no-serial-goods>img{
    width: 80px;
  }
  .no-serial-goods>span{
    margin-top: 8px;
    font-size: 18px;
    color: #999;
  }

  .nolist{
    position: fixed;
    top:54px;
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
</style>
