<template>
  <div class="material-container">
    <div class="material-content">
      <div class="material-arr">
        <img src="../../assets/img/md-trans-bg.png" alt="">
        <img src="../../assets/img/md-trans-bg.png" alt="">
        <img src="../../assets/img/md-trans-bg.png" alt="">
        <div class="material-items">
          <div class="material-item">
            <img src="../../assets/img/md-newest.png" alt="">
            <p>最新素材</p>
          </div>
          <div class="material-item">
            <img src="../../assets/img/md-hot.png" alt="">
            <p>爆款推荐</p>
          </div>
          <div class="material-item">
            <img src="../../assets/img/md-official.png" alt="">
            <p>官方图</p>
          </div>
          <div class="material-item">
            <img src="../../assets/img/md-sellshow.png" alt="">
            <p>买家秀</p>
          </div>
          <div class="material-item">
            <img src="../../assets/img/md-poster.png" alt="">
            <p>励志语录</p>
          </div>
          <div class="material-item">
            <img src="../../assets/img/md-b-poster.png" alt="">
            <p>招商海报</p>
          </div>
          <div class="material-item">
            <img src="../../assets/img/md-event.png" alt="">
            <p>大事件</p>
          </div>
          <div class="material-item">
            <img src="../../assets/img/md-qa.png" alt="">
            <p>问与答</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Materials"
    }
</script>

<style scoped>
  .material-container{
    position: absolute;
    top: 48px;
    bottom: 50px;
    width: 100%;
    background-image: url("../../assets/img/material-bg.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  .material-content{
    position: absolute;
    bottom: 16px;
    width: 100%;

  }
  .material-arr{
    position: relative;
    margin: 0 16px;
    height: 246px;
    overflow: hidden;
  }
  .material-arr>img{
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 100%;
  }
  .material-arr>img:first-child{
     bottom: 0px;
   }
  .material-arr>img:last-of-type{
    bottom: -16px;
  }
  .material-items{
    display: flex;
    position: absolute;
    flex-wrap: wrap;
    bottom: 0;
    left: 0;
  }
  .material-item{
    width: 25%;
    height: 115px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .material-item img{
    width: 46px;
    height: 46px;
    margin-bottom: 4px;
  }
</style>
