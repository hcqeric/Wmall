<template>
  <el-card class="box-card">
    <div slot="header" class="notice-header">
      <div class="title">
        <i class="el-icon-bell"></i>
        <span>小公告</span>
      </div>
      <span>2018-04-12  17:00:23</span>
    </div>
    <div class="text-content">
      推荐好友升级会员用户，由奖励200积分调整为300积分,还不赶紧邀请你的好友加入，一起赚大钱~
    </div>
  </el-card>
</template>

<script>
    export default {
        name: "NoticeCard"
    }
</script>

<style scoped>
  .notice-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title{
    font-size: 16px;
    display: flex;
    align-items: center;
  }
  .title i{
    font-size: 22px;
    color: #ff6d9e;
    font-weight: 700;
    margin-right: 8px;
  }
  .text-content{
    font-size: 14px;
    color: #000;
  }
</style>
<style>
  .box-card .el-card__header{
    padding:10px 16px;
  }
  .box-card .el-card__body{
    padding: 8px;
  }
</style>
