<template>
  <div>
    <div class="user-header">
      <img src="../../assets/img/avatar.jpg" alt="avatar">
      <span>张三</span>
    </div>
    <!--我的信息-->
    <a class="item" href="">
      <div class="item-left">
        <i class="icon-heart"></i>
        <span>我的信息</span>
      </div>
      <div class="item-right">
        <i class="el-icon-arrow-right"></i>
      </div>
    </a>
    <!--我的订单-->
    <a class="item" href="">
      <div  class="item-left">
        <i class="icon-menu"></i>
        <span>我的订单</span>
      </div>
      <div class="item-right">
        <span>查看更多订单</span>
        <i class="el-icon-arrow-right"></i>
      </div>
    </a>
    <div class="order-state-row">
      <a href="" class="order-state-item">
        <i class="icon-cart"></i>
        <span>待付款</span>
      </a>
      <a href="" class="order-state-item">
        <i class="icon-cart"></i>
        <span>待付款</span>
      </a>
      <a href="" class="order-state-item">
        <i class="icon-cart"></i>
        <span>待付款</span>
      </a>
      <a href="" class="order-state-item">
        <i class="icon-cart"></i>
        <span>待付款</span>
      </a>
      <a href="" class="order-state-item">
        <i class="icon-cart"></i>
        <span>退货退款</span>
      </a>

    </div>
    <!--我的评价-->
    <a class="item" href="">
      <div class="item-left">
        <i class="icon-heart"></i>
        <span>我的评价</span>
      </div>
      <div class="item-right">
        <i class="el-icon-arrow-right"></i>
      </div>
    </a>
    <!--我的账户-->
    <a class="item" href="">
      <div class="item-left">
        <i class="icon-heart"></i>
        <span>我的账户</span>
      </div>
      <div class="item-right">
        <i class="el-icon-arrow-right"></i>
      </div>
    </a>
    <!--团队业绩-->
    <a class="item" href="">
      <div  class="item-left">
        <i class="icon-menu"></i>
        <span>团队业绩</span>
      </div>
      <div class="item-right">
        <span>500，000</span>
      </div>
    </a>
    <!--我的积分-->
    <router-link class="item" to="/scores/11">
      <div class="item-left">
        <i class="icon-heart"></i>
        <span>我的积分</span>
      </div>
      <div class="item-right">
        <i class="el-icon-arrow-right"></i>
      </div>
    </router-link>
    <!--我的好友-->
    <a class="item" href="">
      <div class="item-left">
        <i class="icon-heart"></i>
        <span>我的好友</span>
      </div>
      <div class="item-right">
        <i class="el-icon-arrow-right"></i>
      </div>
    </a>

    <div class="system-service">
      <!--联系客服-->
      <a class="item" href="">
        <div class="item-left">
          <i class="icon-heart"></i>
          <span>联系客服</span>
        </div>
      </a>
      <!--系统设置-->
      <a class="item" href="">
        <div class="item-left">
          <i class="icon-heart"></i>
          <span>系统设置</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
    export default {
        name: "UserCenter"
    }
</script>

<style scoped>
  .user-header{
    height: 80px;
    display: flex;
    flex-direction: row;
    padding: 16px 0 10px 0;
    background-color: #1ABC9C;
    box-sizing: border-box;
    align-items: center;
  }

  .user-header img{
    height: 50px;
    width: 50px;
    margin-left: 20px;
    border-radius: 25px;
  }
  .user-header span{
    color: #fff;
    margin-left: 10px;
    font-size: 26px;
    font-weight: bold;
  }

  .item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 48px;
    width: 100%;
    background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-size: 120% 1px;
    background-repeat: no-repeat;
    background-position: bottom left;
    background-origin: content-box;
  }

  .item-left{
    display: flex;
    align-items: center;
    margin-left: 16px;
  }
  .item-left i{
    font-size: 24px;
    color: #FF5D3D;
  }
  .item-left span{
    font-size: 16px;
    color: #000;
    margin-left: 8px;
  }
  .item-right{
    display: flex;
    align-items: center;
    margin-right: 16px;
  }
  .item-right i{
    font-size: 24px;
    color: #999999;
  }
  .item-right span{
    color: #999999;
    font-size: 16px;
  }
  .order-state-row{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    box-sizing: border-box;
    padding: 8px 10px;
    min-height: 48px;
    width: 100%;
    background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-size: 120% 1px;
    background-repeat: no-repeat;
    background-position: bottom left;
    background-origin: border-box;
  }
  .order-state-item{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .order-state-item i{
    font-size: 24px;
    color: #FF5D3D;
  }
  .order-state-item span{
    font-size: 14px;
    color: #000;
  }

  .system-service{
    margin-top: 10px;
    width: 100%;
    background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-size: 120% 1px;
    background-repeat: no-repeat;
    background-position: top left;
    background-origin: border-box;
  }
  a{
    text-decoration: none;
  }


</style>
