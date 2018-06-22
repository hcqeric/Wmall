<template>
  <div class="goods-item">
    <div class="item-check"  v-show="false">
      <el-checkbox v-model="checked"></el-checkbox>
    </div>
    <div class="goods-intro">
      <div class="goods">
        <img src="http://p90m90efq.bkt.clouddn.com/goods.png" alt="">
        <div class="intro">
          <p>特润修护肌透精华露</p>
          <p>¥590</p>
        </div>
        <div class="goods-counter">
          <span class="minus" @click="minusGoodsCount">-</span>
          <input type="text" module="goodsCount" :value="goodsCount">
          <span class="add" @click="addGoodsCount">+</span>
        </div>
      </div>
      <div class="price">
        <p>
          合计：<span>¥ 590.00</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Goods",
      data(){
          return {
            goodsCount: 1,
            checked: true
          }
      },
      methods:{
        addGoodsCount(){
          this.goodsCount += 1;
        },
        minusGoodsCount(){
          if(this.goodsCount <= 1){
            this.goodsCount = 1
          }else{
            this.goodsCount -= 1
          }

        }
      },
      computed:{

      }
    }
</script>

<style scoped>
.goods-item{
  box-sizing: border-box;
  height: 160px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
  .goods-intro{
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    background-color: white;
    box-shadow: 2px 2px 3px white;
    border-radius: 5px;
    flex: 1;
    margin: 0 8px;

  }
  .goods{
    display: flex;
    flex-direction: row;
    position: relative;
    margin: 8px;
  }
  .goods img{
    height: 90px;
    width: 100px;
  }
  .goods .intro{
    margin-left: 8px;

  }
.goods .intro p:first-child{
  font-size: 16px;
}
.goods .intro p:last-child{
  margin-top: 8px;
  font-size: 14px;
}
  .goods-counter{
    position: absolute;
    bottom: 8px;
    right: 0;
  }

  .goods-counter{
    height: 36px;
    line-height: 36px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .goods-counter span{
    display: inline-block;
    font-size: 30px;
  }
  .goods-counter input{
    outline-color: transparent;
    background-color: #efefef;
    border: none;
    height: 30px;
    width: 40px;
    border-radius: 5px;
    margin: 0 8px;
    text-align: center;
  }
  .price{
    border-top: 1px solid #efefef;
    height: 40px;
    line-height: 40px;
  }
  .price p{
    text-align: end;
    margin-right: 8px;
    font-size: 18px;
  }
  .price p span{
    color: #FF659B;
  }
</style>
