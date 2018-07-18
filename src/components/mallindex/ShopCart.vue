<template>
    <div>
      <mt-header fixed title="购物车">
        <mt-button class="delete" slot="right" @click.native="deleteAllGoods" size="large">删除</mt-button>
      </mt-header>

      <div class="cart-list">
        <div class="page-infinite">
          <div class="page-infinite-wrapper" ref="wrapper" >
            <div class="record-content" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
              <div class="cart-item" v-for="(item,index) in cartList" :key="index">
                <Goods :ableCheck="true" :cartGoodsItem="item" :cartIndex="index" ref="child"></Goods>
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
          <el-checkbox v-model="checkAll" @change="handleCheckAll">全选</el-checkbox>
          <p>应付款：<span>¥ 1430.00</span>(免运费)</p>
          <button @click="gotoPayment">去结算</button>
        </div>
      </div>
    </div>
</template>

<script>
  import Goods from '@/components/view/Goods'
  import {getCartList, deleteCart} from "../../http/getData";
  import {getLocalStorage} from "../../custom/mixin";
  import * as Constants from '../../custom/constants'
  import { MessageBox } from 'mint-ui';
    export default {
      name: "ShopCart",
      data(){
        return {
          id:'',
          token:'',
          checkAll: false,
          totalFee:0,
          page: 1,
          limit: '10',
          loading: false,
          allLoaded: true,
          info:'',
          cartList:[]
        }
      },
      components:{
        Goods
      },
      methods:{
        computedTotalFee() {
          let computedFee = 0,
            selectedCounter = 0;
          this.cartList.map(item => {
            if (item.checked) {
              computedFee += parseFloat(item.counter * item.product.price)
              selectedCounter++
            }
          })
          this.selectedCounter = selectedCounter;
          this.selectedAll = selectedCounter === this.cartList.length ? true : false;
          this.totalFee = computedFee.toFixed(2);
        },
        handleCheckAll(val){
          console.log(val)
          if(this.checkAll){
            this.cartList.forEach(item => {
              if (item.checked == undefined) {
                this.$set(item, "checked", true)
              }else{
                item.checked = true
              }
            })
          }else{
            this.cartList.map(item => {
              if (item.checked == undefined) {
                this.$set(item, "checked", false)
              }else{
                item.checked = false
              }
            })
          }
          console.log(this.cartList)
          // this.$refs.child.itemChecked
          // this.computedTotalFee();
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
              deleteCart({
                token: this.token
              },{
                id:this.id
              }).then(response=>{
                console.log(response)
              })
            }else{
              console.log("quxiaole")
            }
          });
        },
        gotoPayment(){
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
            if (response.result.totalPage < response.result.currPage) {
              // this.info = "~~数据已全部加载完毕了~~"
              this.allLoaded = true
              return
            }else{
              this.allLoaded = false
            }
            response.result.list.map(item=>{
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
        }
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
  .mint-header{
    background-color: #bf54f9;
    height: 48px;
  }
  .cart-list{
    position: absolute;
    width: 100%;
    top: 48px;
    left: 0;
    right: 0;
    bottom: 50px;
    background-color: #efefef;
  }
  .cart{
    position: fixed;
    left: 0;
    bottom: 50px;
    height: 46px;
    line-height: 46px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: white;
  }
  .el-checkbox{
    margin-left: 16px;
  }
  .cart button{
    border: none;
    background-color:  #bf54f9;

    outline-color: transparent;
    color: #fff;
    padding: 8px 24px;

  }
  .cart p{
    font-size: 16px;
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
</style>
