<template>
  <div class="shop-goods-item">
    <div class="item-check" v-show="ableCheck">
      <el-checkbox v-model="itemChecked" @change="handleCheckItem(cartGoodsItem)"></el-checkbox>
    </div>
    <div class="goods-intro">
      <div class="goods">
        <img :src="cartGoodsItem.goods.goodsImg" alt="">
        <div class="intro">
          <p>{{cartGoodsItem.goods.name}}</p>
          <p>{{cartGoodsItem.goods.sellPrice | moneyFormat}}</p>
        </div>
        <div class="goods-counter">
          <span :class="cartGoodsItem.goodsNum <= 1 ? 'btn-disable' : ''" @click="minusGoodsCount">-</span>
          <input type="text" module="goodsCount" v-model="cartGoodsItem.goodsNum">
          <span @click="addGoodsCount">+</span>
        </div>
      </div>
      <div class="price">
        <p>
          合计：<span>{{cartGoodsItem.goods.sellPrice * cartGoodsItem.goodsNum|moneyFormat}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import {addCart} from "../../http/getData";
  import {getLocalStorage} from "../../custom/mixin";
  import * as Constants from '../../custom/constants'

  export default {
    name: "Goods",
    data() {
      return {
        goodsCount: 1,
        checked: true
      }
    },
    methods: {
      handleCheckItem(item) {
        if (item.checked == undefined) {
          this.$set(item, "checked", true)
        } else {
          item.checked = !item.checked
        }
        console.log(item)
      },
      addGoodsCount() {
        this.newGoodsCount(this.cartGoodsItem.goodsNum + 1)
      },
      minusGoodsCount() {
        if (this.cartGoodsItem.goodsNum <= 1) {
          this.cartGoodsItem.goodsNum = 1
        } else {
          this.newGoodsCount(this.cartGoodsItem.goodsNum - 1)
        }
      },
      newGoodsCount(count) {
        let tk = getLocalStorage(Constants.TOKEN)
        addCart({
          token: tk
        }, {
          goodsId: this.cartGoodsItem.goodsId,
          goodsNum: count
        }).then(response => {
          console.log(response)
          this.cartGoodsItem.goodsNum = count
        })
      }
    },
    computed: {
      itemChecked() {
        if (this.cartGoodsItem.check == undefined) {
          // this.checked = true
          return true
        } else {
          console.log(this.cartGoodsItem.checked + "  sdfdsfsdfdsfa")
          // this.checked = this.cartGoodsItem.checked
          return this.cartGoodsItem.checked
        }
      }
    },
    props: {
      ableCheck: {
        type: Boolean,
        default: false
      },
      cartGoodsItem: Object,
      cardIndex: Number
    }
  }
</script>

<style scoped>
  .shop-goods-item {
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
</style>
<style>
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
