<template>
    <div class="cart-container">
      <mt-header fixed title="购物车">
        <mt-button class="delete" slot="right" @click.native="deleteAllGoods" size="large">删除</mt-button>
      </mt-header>

      <div class="cart-list">
        <div class="page-infinite">
          <div class="page-infinite-wrapper" ref="wrapper" >
            <div class="record-content" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
              <div class="cart-item" v-for="(item,index) in cartList" :key="index">
                <!--<Goods :ableCheck="true" :cartGoodsItem="item" :cartIndex="index" ref="child"></Goods>-->
                <div class="goods-item">
                  <div class="item-check">
                    <el-checkbox v-model="item.checked" @change="handleCheckItem(item)"></el-checkbox>
                  </div>
                  <div class="goods-intro">
                    <div class="goods">
                      <img :src="item.goods.goodsImg" alt="">
                      <div class="intro">
                        <p>{{item.goods.name}}</p>
                        <p v-if="item.goods.type == 1">{{item.goods.sellPrice | moneyFormat}}</p>
                        <p v-if="item.goods.type == 2">{{item.goods.bonusPrice}}积分</p>
                      </div>
                      <div class="goods-counter">
                        <span :class="item.goodsNum <= 1 ? 'btn-disable' : ''" @click="minusGoodsCount(item)">-</span>
                        <input type="text" module="goodsCount" v-model="item.goodsNum">
                        <span @click="addGoodsCount(item)">+</span>
                      </div>
                    </div>
                    <div class="price">
                      <p v-if="item.goods.type == 1">
                        合计：<span>{{item.goods.sellPrice * item.goodsNum|moneyFormat}}</span>
                      </p>
                      <p v-if="item.goods.type == 2">
                        合计：<span>{{item.goods.bonusPrice * item.goodsNum}}积分</span>
                      </p>
                    </div>
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

        <div class="cart">
          <el-checkbox v-model="checkAll" @change="selectedAllGoods">全选</el-checkbox>
          <div>
            <p>应付款：<span>{{totalFee | moneyFormat}}</span></p>
            <p>应付积分：<span>{{totalScore}}</span></p>
          </div>
          <button @click="gotoPayment">去结算</button>
        </div>
      </div>
      <div class="nolist" v-if="isNoList">
        <img src="../../assets/img/nolist.png" />
        <p>购物车空空如也</p>
      </div>
    </div>
</template>

<script>
  import Goods from '@/components/view/Goods'
  import {getCartList, deleteCart, addCart} from "../../http/getData";
  import {getLocalStorage} from "../../custom/mixin";
  import * as Constants from '../../custom/constants'
  import { MessageBox, Toast } from 'mint-ui';
  import {mapActions} from 'vuex'
    export default {
      name: "ShopCart",
      data(){
        return {
          id:'',
          token:'',
          checkAll: false,
          itemChecked: false,
          totalFee:0,
          totalScore: 0,
          page: 1,
          limit: '10',
          loading: false,
          allLoaded: true,
          info:'',
          isNoList:false,
          cartList:[],
          scoreGoodsCount:0,
          moneyGoodsCount:0
        }
      },
      components:{
        Goods
      },
      methods:{
        ...mapActions({
          setConfirmGoods: 'setConfirmGoods'
        }),
        computedTotalFee() {
          let computedFee = 0, computeScore = 0,
            selectedMoneyCounter = 0, selectedScoreCounter = 0;

          this.cartList.map(item => {
            if (item.checked) {
              if (item.goods.type == 1){
                computedFee += parseFloat(item.goods.sellPrice * item.goodsNum)
                selectedMoneyCounter++

              }else if(item.goods.type == 2){
                computeScore += parseFloat(item.goods.bonusPrice * item.goodsNum)
                selectedScoreCounter++
              }
            }
          })
          this.scoreGoodsCount = selectedScoreCounter
          this.moneyGoodsCount = selectedMoneyCounter
          console.log(this.scoreGoodsCount)
          console.log(this.moneyGoodsCount)
          this.totalScore = computeScore
          this.totalFee = computedFee
        },

        deleteAllGoods() {
          MessageBox({
            title: '删除商品',
            message: '亲，确定要删除选中商品吗？',
            showCancelButton: true,
            confirmButtonText:'删除',
            cancelButtonText:'再想想'
          }).then(action=>{
            if (action === 'confirm'){
              let checkedList = []
              this.cartList.map((item, index)=>{
                if (item.checked == true){
                  checkedList.push(item)
                }
              })
              let ids = []
              checkedList.map(item=>{
                ids.push(item.id)
              })
              console.log(ids)
              deleteCart({
                token: this.token
              },ids).then(response=>{
                ids.forEach(id=>{
                  this.cartList.forEach((item, index)=>{
                    if (item.id == id){
                      this.cartList.splice(index, 1)
                    }
                  })
                })
                console.log(this.cartList)
                if(this.cartList.length == 0){
                  this.isNoList = true
                }
                this.computedTotalFee()
              })
            }else{
              console.log("quxiaole")
            }
          });
        },

        gotoPayment(){
          let selectedGoodsList = [];
          this.cartList.map(item => {
            if (item.checked) {
              selectedGoodsList.push(item)
            }
          })
          if (selectedGoodsList.length == 0) return Toast({
            message: '请选择商品',
            position: 'middle'
          });
          this.setConfirmGoods({
            selectedGoodsList: selectedGoodsList
          })
          this.$router.push('/payment')
        },
        loadMore() {
          if(!this.allLoaded){
            this.loading = true;
            this.loadData()
          }
        },
        loadData(){
          getCartList({
            token: this.token
          }, {
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
              // this.info = "~~数据已全部加载完毕了~~"
              this.allLoaded = true
            } else if (response.result.totalPage < response.result.currPage) {
              // this.info = "~~数据已全部加载完毕了~~"
              this.allLoaded = true
              return
            }else{
              this.allLoaded = false
            }
            response.result.list.map(item=>{
              this.$set(item, "checked", false)
              this.cartList.push(item)
            })
            this.id = response.result.list.id
            this.page++
          }).catch(error=>{
            console.log(error);
            this.loading = false
            this.allLoaded = true
            this.info = "~~数据加载异常，请稍后再试~~"
          })
        },
        selectedAllGoods(){
          this.cartList.map(item => {
            item.checked = this.checkAll
          })
          this.selectedAll = this.selectedAll;
          this.computedTotalFee();
        },
      //  goods
        handleCheckItem(item) {
          item.checked = item.checked
          console.log(item)
          let count = 0;
          this.cartList.map(item => {
            if (item.checked) return count++;
          })
          if (count === this.cartList.length) {
            this.checkAll = true
          }else{
            this.checkAll = false
          }
          this.computedTotalFee();
        },
        addGoodsCount(item) {
          this.newGoodsCount(item, 1)
        },
        minusGoodsCount(item) {
          if (item.goodsNum <= 1) {
            item.goodsNum = 1
          } else {
            this.newGoodsCount(item,  -1)
          }
        },
        newGoodsCount(item,count) {
          let tk = getLocalStorage(Constants.TOKEN)
          addCart({
            token: tk
          }, {
            goodsId: item.goodsId,
            goodsNum: count
          }).then(response => {
            console.log(response)
            item.goodsNum = item.goodsNum + count
            this.computedTotalFee()
          })
        }
      //  goods
      },
      mounted(){
        this.cartList = []
        let tk = getLocalStorage(Constants.TOKEN)
        this.token = tk
        this.loading = true;
        this.loadData()
      }
    }
</script>

<style>
  .cart-container{
    position: relative;
    width: 100%;
    height: 100vh;
  }
  .mint-header.is-fixed{
    background-color: #bf54f9;
    height: 48px;
    z-index:999
  }
  .cart-list{
    position: absolute;
    width: 100%;
    top: 48px;
    left: 0;
    right: 0;
    bottom: 96px;
    background-color: #efefef;
    overflow-y: scroll;
  }
  .cart{
    position: fixed;
    left: 0;
    bottom: 50px;
    height: 58px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    z-index:99;
  }
  .el-checkbox{
    margin-left: 16px;
  }
  .cart button{
    border: none;
    background-color:  #bf54f9;
    outline-color: transparent;
    color: #fff;
    height: 100%;
    padding: 8px 24px;

  }
  .cart p{
    font-size: 14px;
  }
  .cart p span{
    color: #FF659B;
  }
  .delete{
    padding: 8px;
  }

  .mint-msgbox-cancel{
    color: #FF659B;
  }
  .mint-msgbox-confirm{
    color: #FF659B;
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
    border-bottom: 1px solid #efefef;
    z-index:999
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

  /*goods-item*/
  .goods-item {
    box-sizing: border-box;
    height: 160px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .goods-intro {
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    background-color: white;
    box-shadow: 2px 2px 3px white;
    border-radius: 5px;
    flex: 1;
    margin: 0 8px;

  }

  .goods {
    display: flex;
    flex-direction: row;
    position: relative;
    margin: 8px;
  }

  .goods img {
    height: 90px;
    width: 100px;
  }

  .goods .intro {
    margin-left: 8px;

  }

  .goods .intro p:first-child {
    font-size: 16px;
  }

  .goods .intro p:last-child {
    margin-top: 8px;
    font-size: 14px;
  }

  .goods-counter {
    position: absolute;
    bottom: 8px;
    right: 0;
  }

  .goods-counter {
    height: 36px;
    line-height: 36px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .goods-counter span {
    display: inline-block;
    font-size: 30px;
  }

  .btn-disable {
    color: #999;
  }

  .goods-counter input {
    outline-color: transparent;
    background-color: #efefef;
    border: none;
    height: 30px;
    width: 40px;
    border-radius: 5px;
    margin: 0 8px;
    text-align: center;
  }

  .price {
    border-top: 1px solid #efefef;
    height: 40px;
    line-height: 40px;
  }

  .price p {
    text-align: end;
    margin-right: 8px;
    font-size: 18px;
  }

  .price p span {
    color: #FF659B;
  }
  /*goods-item*/

</style>
<style>
  .cart .el-checkbox__inner{
    border-color: #606266;
  }
  .cart .el-checkbox__inner:hover {
    border-color: #606266;
  }
  .cart .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #bf54f9;
    border-color: #bf54f9;
  }
  .cart .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #bf54f9;
  }

  .item-check .el-checkbox__inner {
    border-color: #606266;
  }

  .item-check .el-checkbox__inner:hover {
    border-color: #606266;
  }

  .item-check .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #bf54f9;
    border-color: #bf54f9;
  }
</style>
