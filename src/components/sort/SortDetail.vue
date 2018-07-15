<template>
    <div class="container">
      <mt-header :title="serialName">
        <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
        <mt-button slot="right">
          <div class="shopcart">
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
            <div class="masonry">
            <div class="column">
              <GoodsItem goodsType="2" v-for="n in 5" class="item"></GoodsItem><!-- more items -->
            </div>
            <div class="column">
              <GoodsItem goodsType="2" v-for="n in 5" class="item"></GoodsItem> <!-- more items -->
            </div>
            </div>
          </div>
        </div>
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
        goodsTypeId:''
      }
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      changeItem(n){
        this.selected = n
        // // let nav = this.$refs.nav
        // let nav = document.getElementById("nav")
        // let items = document.getElementsByClassName("nav-item")
        // let itemHeight = items[0].offsetHeight
        // console.log(nav)
        // if(n >= 2 && n < 10){
        //   let a = (n-1) * itemHeight
        //   // nav.setAttribute("style","transform: translateY("+ -a + "vh);" + "transition: 0.2s ease 0s")
        //   console.log(a)
        //  nav.scrollTo(0, a)
        // }
      }
    },
    mounted(){
      let {proid, id, name} = this.$route.params
      this.proId = proid
      this.parentId = id
      this.serialName = name
      getSerials({
        projectId: this.proId,
        parentId: this.parentId
      }).then(response=>{
        console.log(response)
        response.result.map(item=>{
          this.serials.push(item)
        })
        if(this.serials.length > 0){
          getSerialGoods({
            page: this.page.toString(),
            limit: this.limit,
            goodsTypeId: serials[0].proId
          }).then(response=>{
            console.log(response)
          })
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
</style>
