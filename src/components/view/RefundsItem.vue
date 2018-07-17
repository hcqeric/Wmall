<template>
  <div class="refunds-item">
    <p>订单号：12345678901</p>
    <div class="item-info">
      <img src="http://p90m90efq.bkt.clouddn.com/goods.png" alt="">
      <div class="goods">
        <p>肌透修复眼部密集精华露</p>
        <p>单价：￥560.00/瓶</p>
        <p>数量：x 1</p>
      </div>
    </div>
    <p >仅退款/退货退款
      <span v-if="refundInfo.refundStatus == 0">待申请</span>
      <span v-if="refundInfo.refundStatus == 1">申请中</span>
      <span v-if="refundInfo.refundStatus == 2" class="refund-succ">申请成功</span>
      <span v-if="refundInfo.refundStatus == 3">申请失败</span>
    </p>
  </div>
</template>

<script>
    export default {
      name: "RefundsItem",
      props: {
          refundInfo:Object
      }
    }
</script>

<style scoped>
.refunds-item{
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 0 16px;
}
.refunds-item>p{
  box-sizing: border-box;
  padding: 16px 0;
  font-size: 14px;
  color: #000;
  position: relative;
  width: 100%;
}
.refunds-item>p:after{
  position: absolute;
  bottom: -1px;
  left: 0;
  content: '';
  height: 1px;
  width: 100%;
  background-color: rgba(239,239,239,0.9);
}
.refunds-item>p:last-child{
  text-align: end;
}
.refunds-item>p:last-child span{
  color: #FF659F;
}
  .item-info{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px 0;
    position: relative;
  }
.item-info:after{
  position: absolute;
  bottom: -1px;
  left: 0;
  content: '';
  height: 1px;
  width: 100%;
  background-color: rgba(239,239,239,0.9);
}
.item-info img{
  width: 100px;
  height: 100px;
  margin-right: 8px;
}
  .goods p{
    color: #999;
    padding: 4px 0;
    font-size: 12px;
  }
.goods p:first-child{
  color: #000;
  font-size: 14px;
}
</style>
