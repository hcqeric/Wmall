<template>
  <div class="container">
    <mt-header fixed title="兑换详情">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="trans">
        <img src="http://p90m90efq.bkt.clouddn.com/header-bg.jpg" alt="">
      </div>
    </div>
    <div class="ex-msg">
      <div class="ex-states">
        <el-steps direction="vertical" :active="1">
          <el-step ><div slot="title">
            <div>
              <p>12:00:00</p>
              <p>提交兑换申请</p>
            </div>
            <p>2017-04-01</p>
          </div>
          </el-step>
          <el-step ><div slot="title">
            <div>
              <p>12:00:00</p>
              <p>提交兑换申请</p>
            </div>
            <p>2017-04-01</p>
          </div>
          </el-step>
          <el-step ><div slot="title">
            <div class="time-state">
              <p>12:00:00</p>
              <p>提交兑换申请</p>
            </div>
            <p>2017-04-01</p>
          </div>
          </el-step>
          <!--<el-step title="步骤 2"></el-step>-->
          <!--<el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>-->
        </el-steps>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "ExchangeDetail",
      methods: {
        goBack() {
          this.$router.back()
        }
      }
    }
</script>

<style scoped>
  .container{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: #efefef;
    display: flex;
    flex-direction: column;
  }
  .mint-header{
    background-color: #000;
    height: 48px;
    z-index: 9999;
  }
  .content{
    margin-top: 48px;
    display: flex;
    flex-direction: column;

  }
  .trans{
    position: relative;
  }
  .trans img{
    width: 100%;
  }
  .ex-msg{
    position: relative;
    flex: 1;
    background-color: #fff;
  }
  .ex-states{
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    background-color: #fff;
    padding: 16px;
    border-radius: 15px 15px 0 0;
    top: -30px;
    left: 0;
  }
</style>
