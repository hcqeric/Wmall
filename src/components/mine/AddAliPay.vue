<template>
  <div class="container">
    <mt-header fixed title="添加支付宝">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="account-list">
        <!--<InputCell></InputCell>-->
        <div class="input-cell">
          <div class="cell-left">
            <p>开户人</p>
          </div>
          <div class="cell-right">
            <input type="text" placeholder="填写开户人姓名">
          </div>
        </div>
        <div class="input-cell">
          <div class="cell-left">
            <p>支付宝账号</p>
          </div>
          <div class="cell-right">
            <input type="text" placeholder="输入支付宝账号">
          </div>
        </div>

      </div>
      <div class="goto">
        <button>添加</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AddAliPay",
    methods: {
      goBack() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .container {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: #efefef;
    overflow: scroll;
  }

  .mint-header {
    background-color: #000;
    height: 48px;
    z-index: 9999;
  }

  .content {
    margin-top: 48px;
  }

  .account-list {
    background-color: #fff;
    padding: 0 16px;
  }

  .input-cell {
    min-height: 48px;
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
  }

  .input-cell:after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 1px;
    background-color: rgba(239, 239, 239, 0.9);
  }

  .input-cell:last-of-type:after {
    height: 0;
  }

  .cell-left {
    display: flex;
    align-items: center;
  }

  .cell-left i {
    font-size: 26px;
    margin-right: 8px;
  }

  .cell-left p {
    width: 100px;
    font-size: 14px;
    color: #000;
  }

  .cell-right {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
  }

  .cell-right input {
    border: none;
    outline: none;
    padding: 4px;
    flex: 1;
    margin-right: 8px;
    height: 26px;
    font-size: 14px;
  }

  .goto {
    margin-top: 100px;
    text-align: center;
  }

  .goto button {
    border: none;
    height: 44px;
    line-height: 44px;
    border-radius: 22px;
    background-color: transparent;
    background-image: url("../../assets/img/color-pink.png");
    width: 280px;
    text-align: center;
    color: #fff;
    margin: 0 auto;
  }
</style>
