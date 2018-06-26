<template>
    <div class="input-cell">
      <div class="cell-left">
        <i class="iconfont icon-iconset0291"></i>
        <p>设置兑换密码</p>
      </div>
      <div class="cell-right">
        <input type="text">
        <i class="iconfont icon-lajixiang"></i>
      </div>
    </div>
</template>

<script>
    export default {
        name: "InputCell"
    }
</script>

<style scoped>
.input-cell{
  min-height: 48px;
  width: 100%;
  display: flex;
  align-items: center;
}
  .cell-left{
    display: flex;
    align-items: center;
  }
  .cell-left i{
    font-size: 26px;
    margin-right: 8px;
  }
  .cell-left p{
    width: 100px;
    font-size: 14px;
    color: #000;
  }
  .cell-right{
    display: flex;
    flex: 1;
    justify-content: space-between;
  }
</style>
