<template>
    <div class="notification">
      <img src="../../assets/img/laba.png" alt="">
      <div class="notice">
        <p v-text="title"></p>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
</template>

<script>
    export default {
      name: "Notification",
      props:{
          title: String
      }
    }
</script>

<style scoped>
.notification{
  box-sizing: border-box;
  width: 100%;
  height: 42px;
  background-color: #FFEDF9;
  padding: 8px 16px;
  display: flex;
  align-items: center;
}
.notification img{
  width: 22px;
}
  .notice{
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    color: #b535fa;
    margin-left: 8px;
  }
  .notice i{
    font-weight: bold;
  }
</style>
