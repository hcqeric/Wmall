<template>
    <div class="goods-item" v-if="goodsItem" >
      <div  @click="gotoGoodsDetail">
      <img v-if="goodsType == 1" :src="goodsItem.goodsImg" alt="">
      <img v-if="goodsType == 2" :src="goodsItem.goodsImg" alt="">
      <p>{{goodsItem.name}}</p>
      <p>{{goodsItem.sellPrice|moneyFormat}}<span v-if="goodsItem.bdanPrice != undefined || goodsItem.bdanPrice != ''"><s>{{goodsItem.bdanPrice | moneyFormat}}</s></span></p>
      </div>
      <el-input-number size="small" v-model="goodsItem.buyNum" @change.capture="handleChange" :min="0" label="描述文字"></el-input-number>
    </div>
</template>

<script>
  import {addCart} from "../../http/getData";
  import {getLocalStorage} from "../../custom/mixin";
  import * as Constants from '../../custom/constants'
  import {Toast} from 'mint-ui'
    export default {
        name: "GoodsItem",
        data() {
          return {
            num1: 0
          };
        },
      methods: {
        handleChange(value) {
          let tk = getLocalStorage(Constants.TOKEN)
          addCart({
            token: tk
          },{
            goodsId:this.goodsItem.id,
            goodsNum: value
          }).then(response=>{
            Toast({
              message: "添加购物车成功"
            })
          })
        },
        gotoGoodsDetail(){
          this.$router.push('/goods/' + this.goodsItem.goodsNum)
        }
      },
      props:{
          goodsType:'',
          goodsItem:null
      },
      mounted(){
          this.$set(this.goodsItem, "buyNum", 0)
      }
    }
</script>

<style scoped>
  .goods-item{
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 16px;
    width: 44%;
    box-sizing: border-box;
  }
  .goods-item p{
    padding: 4px 0;
  }
  .goods-item p:first-child{
    font-size: 14px;
    color: #000;
  }
  .goods-item p:last-of-type{
    font-size: 18px;
    color: #c053fa;
  }

  .goods-item p span{
    color: #999;
    padding-left: 8px;
    font-size: 14px;
  }
</style>
