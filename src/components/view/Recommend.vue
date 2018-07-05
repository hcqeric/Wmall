<template>
    <div class="recommend" v-if="comment">
      <EvaluationGoods  :hasEvaluationTime="true" :comment="comment"></EvaluationGoods>
      <div class="recommend-info">
        <div class="rating">
          <el-rate
            v-model="comment.score"
            disabled
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>
        </div>
        <div class="user-commend">
          <p>{{comment.content}}</p>
          <img  v-show="hasReply" :src="item.picUrl" alt="" v-for="item in items"/>
        </div>
      </div>
      <div class="reply"  v-if="comment.replyContent">
          <p><span>商家回复：</span>{{comment.replyContent}}</p>
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
          value: 0,
          items: items,
          popupVisible1: true,
        }
      },
      components:{
        EvaluationGoods
      },
      computed: {
          // commentItem(){
          //   return this.props.comment.replyContent == ''
          // }
      },
      props:{
          hasReply:{
            type: Boolean,
            default: false
          } ,
        comment:null
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

