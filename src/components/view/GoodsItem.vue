<template>
    <div class="goods-item" v-if="goodsItem" >
      <div  @click="gotoGoodsDetail">
      <img v-if="goodsType == 1" :src="goodsItem.goodsImg" alt="">
      <img v-if="goodsType == 2" :src="goodsItem.goodsImg" alt="">
      <!--<p>{{goodsItem.name}}</p>-->
      <p v-if="goodsItem.name.length > 8"  class="goods-item-name">{{goodsItem.name.substring(0, 8)}}...</p>
      <p v-else class="goods-item-name">{{goodsItem.name}}</p>
      <p v-if="goodsItem.type == 1">{{goodsItem.sellPrice|moneyFormat}}</p>
      <p v-if="goodsItem.type == 2">{{goodsItem.bonusPrice}}积分</p>
      <div class="bdan-price"><span v-if="goodsItem.bdanPrice != undefined || goodsItem.bdanPrice != ''"><s>{{goodsItem.bdanPrice | moneyFormat}}</s></span></div>
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
          let count = 0
          if (value > this.num1){
            count = 1
          } else{
            count = -1
          }
          this.num1 = value

          let tk = getLocalStorage(Constants.TOKEN)
          addCart({
            token: tk
          },{
            goodsId:this.goodsItem.id,
            goodsNum: count
          }).then(response=>{
            if(count > 0){
              Toast({
                message: "添加购物车成功",
                position: 'middle',
                duration: 1000
              })
            }
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
  .goods-item-name{
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: #000;
  }
  /*.goods-item p:first-child{*/
    /*height: 20px;*/
    /*line-height: 20px;*/
    /*font-size: 14px;*/
    /*color: #000;*/
  /*}*/
  .goods-item p:last-of-type{
    height: 24px;
    line-height: 24px;
    font-size: 16px;
    color: #c053fa;
  }

  .goods-item p span{
    color: #999;
    padding-left: 8px;
    font-size: 14px;
  }
  .goods-item img{
    width: 110px;
    height: 110px;
  }
  .bdan-price{
    font-size: 14px;
    margin-bottom: 4px;
    color: #999;
  }
</style>
<style>
  .goods-item .el-input-number--small {
    width: 120px;
  }
</style>
