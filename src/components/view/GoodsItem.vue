<template>
    <div class="goods-item">
      <img src="../../assets/img/goods-big.png" alt="">
      <p>特润修护肌透精华露</p>
      <p>￥590<span><s>￥980</s></span></p>
      <el-input-number size="small" v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
    </div>
</template>

<script>
    export default {
        name: "GoodsItem",
        data() {
          return {
            num1: 1
          };
        },
      methods: {
        handleChange(value) {
          console.log(value);
        }
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
