<template>
  <div class="evaorder-item" v-if="orderItem"  @click="gotoDetail(orderItem.orderNum.toString())">
    <div class="order-number">
      <p>订单号：{{orderItem.orderNum}}</p>
      <p v-if="orderItem.tradeStatus == 3">已完成</p>
    </div>
    <OrderEvaluationGoods :orderItem="orderItem" :goodsIndex="goodsIndex"></OrderEvaluationGoods>
  </div>
</template>

<script>
  import { mapActions} from 'vuex'
  import {getLocalStorage} from "../../custom/mixin";
  import * as Constants from '../../custom/constants'
  import {cancelOrder} from "../../http/getData";
  import OrderEvaluationGoods from '@/components/view/OrderEvaluationGoods'

  export default {
    name: "OrderEvaluationItem",
    data(){
      return {
        token:''
      }
    },
    components:{
      OrderEvaluationGoods
    },
    props:{
      orderItem:null,
      goodsIndex: Number
    },
    methods:{
      ...mapActions({
        setOrderNum: 'setOrderNum',
        setBackRefunds: 'setBackRefunds'
      }),
      gotoDetail(orderNum){
        this.setOrderNum(orderNum)
        this.$router.push('/orderdetail/'+ orderNum)
      },
      cancelOrder(id){
        cancelOrder({
          token:this.token
        },{
          id:id
        }).then(response=>{
          this.$emit('orderItem', this.orderItem)
          console.log(response)
        })
      },
      postEvaluation(orderItem){
        this.setBackRefunds(orderItem)
        this.$router.push('postevaluation')
      }
    },
    mounted(){
      let tk = getLocalStorage(Constants.TOKEN)
      this.token = tk
    }
  }
</script>

<style scoped>
  .evaorder-item{
    display: flex;
    flex-direction: column;
    padding: 0 16px;
    background: #fff;
  }
  .evaorder-item .order-number{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 16px 0;
    background-color: #fff;
  }
  .evaorder-item .order-number p{
    font-size: 14px;
    color: #000;
  }
  .evaorder-item .order-number p:last-child{
    color: #FF659F;
  }
</style>
