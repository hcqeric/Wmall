<template>
    <div class="order-item">
      <div class="order-number">
        <p>订单号：12345678901</p>
        <p>待付款</p>
      </div>
      <div class="order-info">
        <div class="order-imgs">
          <img v-for="n in goodsCount" src="http://p90m90efq.bkt.clouddn.com/goods.png" alt="">
        </div>
        <div v-if="goodsCount <= 1">
          <p>特润修护透肌精华露</p>
          <p>单价：￥590.00/瓶</p>
        </div>
      </div>
      <div class="item-bottom">
      <div class="order-price">
        <div class="count">
        <p>数量：x {{goodsCount}}</p>
        <p>￥590.00</p>
        </div>
      </div>
      <div class="order-state">
        <p>广东省深圳市宝安区新安街道幸福花园A栋201</p>
        <div class="buttons">
        <button>取消订单</button>
        <button>去支付</button>
        </div>
      </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "OrderItem",
      data(){
          return {
            goodsCount: 1
          }
      }
    }
</script>

<style scoped>
.order-item{
  display: flex;
  flex-direction: column;
}
  .order-number{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 16px;
    background-color: #fff;
  }
  .order-number p{
    font-size: 14px;
    color: #000;
  }
  .order-number p:last-child{
    color: #FF659F;
  }
  .order-info{
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    background-color: #efefef;
    padding: 4px 16px;
    width: 100%;
    align-items: center;
  }
  .order-imgs{
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    overflow-y: hidden;
  }

  /*去除滚动条样式*/
  .order-imgs::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  .order-imgs::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }

  .order-imgs::-webkit-scrollbar-track {
    box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
  /*去除滚动条样式*/

  .order-imgs img{
    width: 100px;
    height: 100px;
    float: left;
    margin-right: 8px;
  }
  .order-imgs img:last-child{
    margin-right: 0;
  }
  .order-info p{
    padding: 8px;
    color: #000;
    font-size: 14px;
  }
  .order-info p:last-child{
    color: #999;
    font-size: 13px;
  }

  .item-bottom{
    padding:0 16px;
    background-color: #fff;
  }
  .order-price{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding:16px 0;
    align-items: center;
    position: relative;

  }
  .order-price:after{
    position: absolute;
    content: '';
    height: 1px;
    width: 100%;
    bottom: -1px;
    background-color: rgba(239,239,239,0.9);
  }
.order-price .count{
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}
.order-price .count p:first-child{
  font-size: 13px;
  color: #000;
}
.order-price .count p:last-child{
  font-size: 18px;
  color: #000;
  margin-left: 8px;
}
  .order-state{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding:16px 0;
    align-items: center;
  }
.order-state p{
  font-size: 12px;
  padding-right: 8px;
  color: #000;
  flex: 1;
}
  .order-state .buttons button{
    outline: none;
    background-color: transparent;
    background-image: url("../../assets/img/bg-white.png");
    border: none;
    font-size: 14px;
    height: 26px;
    padding: 0 18px;
    border-radius: 26px;
    color: #000;
  }
.order-state .buttons button:first-child{
  border: 1px solid #999;
}
.order-state .buttons button:last-child{
  color: #FF659F;
  margin-left: 8px;
  border: 1px solid #FF659F;
}
</style>
