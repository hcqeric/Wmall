<template>
    <div>
      <mt-header fixed title="购物车">
        <mt-button class="delete" slot="right" @click.native="deleteAllGoods" size="large">删除</mt-button>
      </mt-header>
      <div class="cart-list">
        <div class="cart-item">
          <Goods></Goods>
        </div>
        <div class="cart">
          <el-checkbox v-model="checked">全选</el-checkbox>
          <p>应付款：<span>¥ 1430.00</span>(免运费)</p>
          <button @click="gotoPayment">去结算</button>
        </div>
      </div>
    </div>
</template>

<script>
  import Goods from '@/components/view/Goods'
  import { MessageBox } from 'mint-ui';
    export default {
      name: "ShopCart",
      data(){
        return {
          checked: true,
        }
      },
      components:{
        Goods
      },
      methods:{
        deleteAllGoods() {
          MessageBox({
            title: '删除商品',
            message: '亲，确定要删除选中商品吗？',
            showCancelButton: true,
            confirmButtonText:'删除',
            cancelButtonText:'再想想'
          }).then(action=>{
            if (action === 'confirm'){
              console.log("quedingle")
            }else{
              console.log("quxiaole")
            }
          });
        },
        gotoPayment(){
          console.log(this.$router.push('/payment'))
        }
      }
    }
</script>

<style>
  .mint-header{
    background-color: #1ABC9C;
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
    background-color:  #1ABC9C;
    background-image: url(../../assets/img/color.png);
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

  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #1ABC9C;
    border-color: #1ABC9C;
  }
  .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #1ABC9C;
  }
</style>
