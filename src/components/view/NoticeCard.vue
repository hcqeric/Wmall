<template>
  <el-card class="box-card">
    <div slot="header" class="notice-header">
      <div class="title">
        <i class="el-icon-bell"></i>
        <span>小公告</span>
      </div>
      <span>{{notificationItem.updateTime | DateFormat("yyyy-MM-dd hh:mm:ss")}}</span>
    </div>
    <div class="text-content">
      {{notificationItem.content}}
    </div>
  </el-card>
</template>

<script>
    export default {
      name: "NoticeCard",
      props:{
        notificationItem: Object
      }
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
    color: #bf54f9;
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
