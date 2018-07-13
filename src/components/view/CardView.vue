<template>
  <el-card shadow="always">
    <div class="count">
      <div class="trans-count">
        <p>{{countTitle}}:</p>
        <input type="text"  @change="transBonus" v-model="bonus">
      </div>
      <img src="http://p90m90efq.bkt.clouddn.com/money.png" alt="">
    </div>
    <div class="score-total">
      <p>{{totalTitle}}：<span>{{scores}}</span></p>
    </div>
  </el-card>
</template>

<script>
    export default {
        name: "CardView",
      data(){
          return {
            bonus:''
          }
      },
      props:{
          countTitle:String,
          totalTitle:String,
          scores:String
      },
      methods:{
        transBonus(){
          this.$emit("changeBonus", this.bonus)
        }
      }
    }
</script>

<style scoped>
.count{
  display: flex;
  justify-content: space-between;
}
.count img{
  height: 80px;
}
.trans-count{
  color: #000;
}
.trans-count p{
  font-size: 14px;
}
  .trans-count input{
    outline: none;
    border: none;
    border-bottom: 1px solid rgba(153,153,153,0.2);
    width: 100px;
    padding: 8px 0;
    font-size: 26px;
  }
  .score-total{
    margin-top: 40px;
  }
  .score-total p{
    font-size: 14px;
  }
.score-total p span{
  color: #FF659B;
}
</style>
