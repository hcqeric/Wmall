<template>
  <div class="container">
    <mt-header fixed title="系统设置">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="setting-list" >
        <!--<InputCell></InputCell>-->
        <div class="input-cell" @click="turnToManagePassword">
          <div class="cell-left">
            <i class="el-icon-view"></i>
            <p>管理密码</p>
          </div>
          <div class="cell-right">
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <div class="input-cell" @click="turnToSystemNotification">
          <div class="cell-left">
            <i class="el-icon-bell"></i>
            <p>系统通知</p>
          </div>
          <div class="cell-right">
            <i class="red-dot"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "SystemSetting",
      methods: {
        goBack() {
          this.$router.back()
        },
        turnToManagePassword(){
          this.$router.push('/managepass')
        },
        turnToSystemNotification(){
          this.$router.push('/sysnotice')
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

  .setting-list {
    background-color: #fff;
    padding: 0 16px;
  }

  .input-cell {
    min-height: 48px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
  .cell-left i:last-of-type{
    font-size: 24px;
  }
  .cell-left p {
    width: 100px;
    font-size: 14px;
    color: #000;
  }
  .cell-right {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .cell-right i{
    font-size: 20px;
    color: #999;
  }
  .red-dot{
    position: relative;
  }
  .red-dot:before{
    position: absolute;
    content: '';
    height: 8px;
    width: 8px;
    left: -12px;
    top: -4px;
    background-color: #b535fa;
    border-radius: 50%;
  }
  .el-icon-view{
    color: #b535fa;
  }
  .el-icon-bell{
    color: #b535fa;
  }
</style>
