<template>
<div class="container">
  <mt-header fixed :title="title">
    <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
  </mt-header>
  <div class="content">
    <div class="instructions" v-if="type == 0">
      <p class="need-indent">为回馈广大客户对我公司的长期支持和信赖，河南美健智韵电子商务公司推出个人综合积分兑换业务，相关规则及条款如下：</p>
      <p class="need-indent need-margin"> 一、基本规定</p>
      <p class="need-indent">1.在我公司APP平台消费客户均可享受综合积分服务。</p>
      <p class="need-indent">2.客户须满足会员账户状态正常，信用状况良好。</p>
      <p class="need-indent">3.在以下任一情况下，河南美健智韵电子商务有限公司有权采取积分锁定、积分清零、停止使用等措施，并保留进一步追索的权利：</p>
      <p class="need-indent">（1）违反《河南美健智韵智电子商务有限公司会员协议》及其他个人综合积分相关协议和业务规则的；</p>
      <p class="need-indent">（2）账户被冻结、止付、注销等不正常状态；</p>
      <p class="need-indent">（3）涉嫌利用虚假交易骗取积分（包括但不限于为他人刷卡交易）；</p>
      <p class="need-indent">（4）在交易中若发生违反国家有关法律法规及相关监管规定、洗钱、欺诈等交易行为，如上述行为可能构成犯罪的，我公司有权向公安机关报案并向司法机关提供相关资料和信息。</p>
      <p class="need-indent">4.河南美健智韵电子商务有限公司有理由认为客户存在前款规定情形的，有权要求客户提供消费交易发票、购买凭证等材料，以核实其交易真实性；如客户无法提交相关资料，河南美健智韵电子商务有限公司有权依照本规则采取相关措施。</p>
      <p class="need-indent need-margin">二、积分累积规则</p>
      <p class="need-indent">累积规则：使用我公司APP消费，包括本外币消费，外币消费按照系统外币折算表转化为人民币后进行积分计算，我公司保留根据汇率变化调整积分外币折算率的权利。符合积分采集条件的，每消费人民币1元累积1分。</p>
      <p class="need-indent need-margin">三、积分查询</p>
      <p class="need-indent">会员可以通过以下方式获知积分情况：</p>
      <p class="need-indent">客户可通过我公司APP渠道查询个人综合积分余额及交易明细。</p>
      <p class="need-indent need-margin">四、积分有效期</p>
      <p class="need-indent">个人综合积分自积分采集之日起，有效期最长5年（以日历年度计算）。当年12月31日（含）前采集的积分记为第一年度积分，在第五年12月30日（含）之前兑换有效。逾期没有兑换的个人综合积分清零处理。</p>
      <p class="need-indent need-margin">五、积分兑换</p>
      <p class="need-indent">1. 客户可使用的个人综合积分为该客户名下个人综合积分账户内的综合积分。</p>
      <p class="need-indent">2. 积分兑换方式：</p>
      <p class="need-indent">（1）目前，客户可登录我公司APP积分兑换栏目，申请兑换精选礼品。</p>
      <p class="need-indent">（2）客户可参加我公司组织的全国或各地区商户消费积分兑换活动，以积分抵扣部分现金兑换礼品。个人综合积分可实现跨地区兑换，但须遵循当地积分兑换的标准和要求。</p>
      <p class="need-indent">3. 如客户所兑换礼品由礼品供应商（含合作商户）提供，其质量、数量、款式、颜色、售后服务等问题均由供应商负责，河南美健智韵不提供任何形式的担保和承诺。如客户兑换的积分礼品发生了相应税款，则由客户自行承担和申报。</p>
      <p class="need-indent need-margin">六、说明</p>
      <p class="need-indent">1. 个人综合积分不可转让给其他持卡人或任何第三人，任何转让对河南美健智韵均不产生效力。</p>
      <p class="need-indent">2. 积分兑换属回馈活动，不提供发票。若非质量问题，礼品一经兑换，不可撤消、退货、换货、退积分或兑换现金，不可变更。</p>
      <p class="need-indent need-margin">七、修改与终止</p>
      <p class="need-indent">河南美健智韵电子商务有限公司保留根据需要取消或修改上述相关规则的权利。</p>
    </div>
    <div class="instructions" v-if="type == 1">
      <p class="need-indent">河南美健智韵电子商务有限公司（以下简称“美健智韵公司”）在此特别提醒您在正式成为会员之前，请认真阅读本《美健智韵公司好友推荐须知》（以下简称“本须知”）内容，以确保您充分理解本须知中各项条款。请您审阅并选择接受或不接受本须知:</p>
      <p class="need-indent">1、成功扫码关注我们美智甄品的朋友即可成为我们美智智嚢团团员</p>
      <p class="need-indent">2、确定购买美智甄品任意一款产品并确认收货后，您将拥有自己的个人分享二维码，自己晋升为A团长（ABC字母以自己名字命名）</p>
      <p class="need-indent">3、通过扫描A团长分享的二维码成功购买产品并确认收货后，自己晋升为B团长，原A团长晋升为A一级团长，A—级团长可获得订单金额 15%的返佣</p>
      <p class="need-indent">4、通过扫描B团长分享的二维码成功购买产品并确认收货后，自己晋升为C团长，同时B团长晋升为B—级团长，A团长晋升为A二级团长，B—级团长可获得15%订单金额返佣，A二级团长可获得10%订单金额返佣</p>
      <p class="need-indent">5、通过扫描C团长分享的二维码成功购买产品并确认收货后，自己晋升为D团长，同时C团长晋升为C一级团长，B—级团长晋升为B二级团长，A二级团长晋升为A三级团长，C一级团长可获得15%订单金额返佣，B二级团长可获得10%订单金额返佣，A三级团长可获得5%订单金额返佣</p>
      <p class="need-indent">6、通过扫描D团长分享的二维码成功购买产品并确认收货后，自己晋升为E团长，同时D团长晋升为D一级团长，C—级团长晋升为C二级团长，B二级团长晋升为B三级团长，D一级团长可获得15%订单金额返佣，C二级团长可获得10%订单金额返佣，B三级团长可获得5%订单金额返佣 , A三级团长无任何返佣</p>
      <p class="need-indent">7、当三级团长直接推荐10名团长且三级之内业绩累计达到10万，三级团长即可晋升为黄铜团长，可获得美健智韵公司奖励省内旅游名额1个 ；当黄铜团长直接推荐20名团长且三级之内业绩累计达到20万，黄铜团长晋升为白银团长，可获得美健智韵公司奖励国内旅游名额1个；当白银团长直接推荐50名团长，且三级之内业绩累计达到50万，白银团长晋升为黄金团长，可获得美健智韵公司奖励泰国旅游名额1个；当黄金团长直接推荐100名团长且三级之内业绩达累计到100万，黄金团长晋升为铂金团长，可获得美健智韵公司奖励欧洲旅游名额1个；当铂金团长直接推荐200名团长，且三级之内业绩累计达到200万，铂金团长晋升为钻石团长，可获得美健智韵公司奖励豪华迪拜旅游名额1个。</p>
      <p class="need-margin"><strong>河南美健智韵电子商务有限公司保留根据需要取消或修改上述相关规则的权利。</strong></p>
    </div>
  </div>
</div>
</template>

<script>
    export default {
      name: "SelectTemplate",
      data() {
        return {
          type: -1,
          title: null
        }
      },
      methods: {
        goBack() {
          this.$router.back()
        }
      },
      mounted(){
        let {type} = this.$route.params
        this.type = type
        console.log(type)
        if(type == 0){
          this.title = "积分兑换须知"
        }else if(type == 1){
          this.title = "好友推荐须知"
        }
      }
    }
</script>

<style scoped>
.container{
  background-color: #fff;
  position: absolute;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  left: 0;
  top:0;
}
.mint-header{
  background-color: #000;
  height: 48px;
  z-index: 9999;
}
.content{
  margin-top: 58px;
}
  .instructions{
    margin: 16px;
  }
  .instructions p{
  line-height: 24px;
  font-size: 14px;
}
.need-indent{
  text-indent: 2em;
}
  .need-margin{
    margin-top: 16px;
  }
  .color-red{
    color: red;
  }
  .color-blue{
    color: #00b0f0;
  }
</style>
