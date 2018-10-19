<template>
  <div class="refunds-item">
    <p>订单号：{{refundInfo.orderNum}}</p>
    <div class="refund-infos">
    <div class="item-info" v-for="item in refundInfo.orderDetailList">
      <img :src="item.goodsImg" alt="">
      <div class="goods">
        <p>{{item.goodsName}}</p>
        <p v-if="item.buyType == 0">单价：{{item.sellPrice| moneyFormat}}/{{item.unit}}</p>
        <p>数量：x {{item.number}}</p>
      </div>
    </div>
    <Address :address="address" v-if="refundInfo.orderReturn != undefined"></Address>
    <p class="refund-remark" v-if="refundInfo.tradeStatus == 6">备注：{{refundInfo.orderReturn.handleRemarks}}</p>
    </div>
    <p class="refunds-status-p" v-if="refundInfo.tradeStatus == 5">{{renderType}}
      <span v-if="refundInfo.orderRefund.refundStatus == 0" class="refund-fail">待申请</span>
      <span v-if="refundInfo.orderRefund.refundStatus == 1" class="refund-fail">申请中</span>
      <span v-if="refundInfo.orderRefund.refundStatus == 2" class="refund-succ">退款成功</span>
      <span v-if="refundInfo.orderRefund.refundStatus == 3" class="refund-fail">退款失败</span>
      <span v-if="refundInfo.orderRefund.refundStatus == 4" class="refund-fail">退款失败</span>
    </p>
    <p class="refunds-status-p" v-if="refundInfo.tradeStatus == 6">{{renderType}}
      <span v-if="refundInfo.orderReturn.refundStatus == 0" class="refund-fail">待申请</span>
      <span v-if="refundInfo.orderReturn.refundStatus == 1" class="refund-fail">退货中</span>
      <span v-if="refundInfo.orderReturn.refundStatus == 2" class="refund-fail">已收货，待退款</span>
      <span v-if="refundInfo.orderReturn.refundStatus == 3" class="refund-succ">退货退款成功</span>
      <span v-if="refundInfo.orderReturn.refundStatus == 4" class="refund-fail">退货退款失败</span>
    </p>
  </div>
</template>

<script>
    import Address from '@/components/view/RefundAddress'
    export default {
      name: "RefundsItem",
      data(){
        return {
          address:{
            consignee:'',
            mobile:'',
            fullAddress:''
          }
        }
      },
      computed:{
        renderType(){
          if (this.refundInfo.tradeStatus == 5){
            return "仅退款"
          }else if(this.refundInfo.tradeStatus == 6){
            return "退货退款"
          }
        }

      },
      components:{
        Address
      },
      props: {
          refundInfo:Object
      },
      mounted(){
        if(this.refundInfo.orderReturn != undefined){
          this.address.consignee = this.refundInfo.orderReturn.shName
          this.address.mobile = this.refundInfo.orderReturn.shTel
          this.address.fullAddress = this.refundInfo.orderReturn.shAds
        }
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
/*.item-info:after{*/
  /*position: absolute;*/
  /*bottom: -1px;*/
  /*left: 0;*/
  /*content: '';*/
  /*height: 1px;*/
  /*width: 100%;*/
  /*background-color: rgba(239,239,239,0.9);*/
/*}*/
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
  .refund-fail{
    color: #f00;
  }
  .refund-succ{
    color: #00cc99;
  }
  .refund-infos{
    position: relative;
  }
  .refund-infos:after{
    position: absolute;
    content: '';
    height: 1px;
    width: 100%;
    background: #eee;
    bottom: 0;
    left: 0;
  }

  .refund-remark{
    font-size: 14px;
    color: #999;
    padding-bottom: 8px;
  }
</style>
