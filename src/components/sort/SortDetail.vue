<template>
    <div class="container">
      <mt-header :title="serialName">
        <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
        <mt-button slot="right">
          <div class="shopcart" @click="gotoCart">
            <i class="iconfont icon-gouwuche"></i>
            <mt-badge type="error" size="small">10</mt-badge>
          </div>
        </mt-button>
      </mt-header>
      <div class="content">
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
  import GoodsItem from '@/components/view/GoodsItem'
  import {getSerials, getSerialGoods} from "../../http/getData";

  export default {
    name: "SortDetail",
    data(){
      return {
        selected: 1,
        parentId: '',
        serialName:'',
        proId: '',
        serials:[],
        page:1,
        limit:'10',
        goodsTypeId:'',
        isNoList: false,
        loading: false,
        allLoaded: true,
        info:'',
        categoryId:'',
        oddGoodsList:[],
        evenGoodsList:[]
      }
    },
    methods: {
      loadMore() {
        if(!this.allLoaded){
          this.loading = true;
          this.getCategoryGoods()
        }
      },
      goBack() {
        this.$router.back()
      },
      gotoCart(){
        this.$router.push('/cart')
      },
      changeItem(n){

        this.selected = n
        if(this.serials[n].proId != undefined){
          this.categoryId = this.serials[n].id
        }

        this.loading = true
        this.page = 1
        this.info=''
        this.oddGoodsList = []
        this.evenGoodsList = []
        this.getCategoryGoods()
      },
      getSerialList() {
        return new Promise((resolve, reject) => {
          getSerials({
            projectId: this.proId,
            parentId: this.parentId
          }).then(response => {
            if(response.result.length == 0){
              this.isNoList = true
            }
            response.result.map(item => {
              this.serials.push(item)
            })
            resolve(response)
          },error=>{
            reject(error)
          })
        })
      },
      getCategoryGoods() {
        if (this.serials.length > 0) {
          getSerialGoods({
            page: this.page.toString(),
            limit: this.limit,
            goodsTypeId: this.categoryId.toString()
          }).then(response => {
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
      }
    },
    mounted(){
      let {proid, id, name} = this.$route.params
      this.proId = proid
      this.parentId = id
      this.serialName = name

      this.getSerialList().then(response=>{

        if(this.serials.length > 0){
          this.changeItem(0)
        }
      })
    },
    components:{
      GoodsItem
    }
  }
</script>

<style scoped>
.container{
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f6f7f9;
}

.mint-header {
  background-color: #000;
  height: 48px;
}


.shopcart {
  position: relative;
}

.shopcart .mint-badge {
  position: absolute;
  top: 20px;
  right: 20px;
}

.content{
  flex: 1;
  display: flex;
  flex-direction: row;
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
  padding: 0 12px;
  border-bottom: 2px solid #fff;
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
  padding: 0 0 8px 0;
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
.page-infinite-loading{
  background: #fff;
}
.nodata{
  padding:16px 0;
  text-align: center;
}
</style>
