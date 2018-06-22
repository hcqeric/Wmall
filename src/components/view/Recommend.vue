<template>
    <div class="recommend">
      <EvaluationGoods  :hasEvaluationTime="true"></EvaluationGoods>
      <div class="recommend-info">
        <div class="rating">
          <el-rate
            v-model="value"
            disabled
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>
        </div>
        <div class="user-commend">
          <p>这瓶精华露真的好好用，效果杠杠滴~瞬间年轻10岁有木有~这瓶精华露真的好好用，效果杠杠滴~瞬间年轻10岁有木有~</p>
          <img  v-show="hasReply == true" :src="item.picUrl" alt="" v-for="item in items"/>
        </div>
      </div>
      <div class="reply"  v-show="hasReply == true">
          <p><span>商家回复：</span>谢谢亲的支持~我们会加倍努力提供更好的产品给到您~</p>
      </div>
    </div>
</template>

<script>
  import EvaluationGoods from '@/components/view/EvaluationGoods'
  const items = [
    {
      picUrl: 'http://p90m90efq.bkt.clouddn.com/commend1.png',
      id: 11351
    },
    {
      picUrl: 'http://p90m90efq.bkt.clouddn.com/commend2.png',
      id: 11372
    },
    {
      picUrl: 'http://p90m90efq.bkt.clouddn.com/commend1.png',
      id: 11378
    }
  ]
    export default {
        name: "Recommend",
      data() {
        return {
          value: 3,
          items: items,
          popupVisible1: true,

        }
      },
      components:{
        EvaluationGoods
      },
      mounted() {
        this.hasReply = true
      },
      props:{
          hasReply: Boolean
      }
    }
</script>

<style scoped>
  .recommend {
    background-color: #fff;
    padding: 16px;
    display: flex;
    flex-direction: column;
  }


  .recommend-info{
    padding-top: 16px;
  }
  .user-commend p{
    padding: 8px 0;
    color: #000;
    font-size: 14px;
    line-height: 18px;
  }
  .user-commend img{
    width: 100px;
    height: 100px;
    margin-right: 8px;
  }

  .reply{
    position: relative;
    width: 100%;
    margin-top: 10px;
    padding: 10px 5px;
    background-color: rgba(239,239,239,0.9);
  }
  .reply p {
    color: #333;
    font-size: 12px;
    line-height: 18px;
  }
  .reply p span{
    font-size: 14px;
    margin-right: 8px;
    color: #000;
  }
  .reply::before {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 10px solid rgba(239,239,239,0.9);
    content: '';
    position: absolute;
    top: -10px;
    left: 30px;
  }

</style>
<style>
  .rating .el-rate__icon{
    font-size: 16px;
  }
</style>

