<template>
  <div class="friends" >
    <img :src="friendItem.logoUrl" alt="">
    <div class="friend-info">
      <p>{{friendItem.nickname}}</p>
      <p><!--<img src="../../assets/img/flower.png" alt=""> 5--></p>
    </div>
  </div>
</template>

<script>
    export default {
      name: "FreiendItem",
      props:{
         friendItem:Object
      }
    }
</script>

<style scoped>
  .friends {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 8px 0;
    position: relative;
  }
  .friends:after{
    position: absolute;
    width: 100%;
    content: '';
    height: 1px;
    background-color: rgba(239,239,239,0.9);
    bottom: 0;
    left: 0;
  }
  .friends img{
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
  .friend-info{
    margin-left: 8px;
  }
  .friend-info p{
    padding: 4px;
    font-size: 14px;
    color: #000;
  }
  .friend-info p:last-child{
    display: flex;
    align-items: center;
    color: #999;
  }
  .friend-info p img{
    width: 21px;
    height: 21px;
    margin-right: 4px;
  }
</style>
