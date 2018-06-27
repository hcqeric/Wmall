<template>
  <div class="container">
    <mt-header v-if="pageInfo" fixed :title='"修改" + pageInfo.title'>
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="account-list">
        <!--<InputCell></InputCell>-->
        <div class="input-cell">
          <div class="cell-left">
            <i class="iconfont icon-suoding"></i>
            <p v-if="pageInfo">原{{pageInfo.title}}</p>
          </div>
          <div class="cell-right">
            <input v-if="pageInfo" type="text" :placeholder='"输入原" + pageInfo.title'>
          </div>
        </div>
        <div class="input-cell">
          <div class="cell-left">
            <i class="iconfont icon-suoding"></i>
            <p>新密码</p>
          </div>
          <div class="cell-right">
            <input v-if="pageInfo" type="text" :placeholder='"输入新" + pageInfo.title'>
          </div>
        </div>
        <div class="input-cell">
          <div class="cell-left">
            <i class="iconfont icon-suoding"></i>
            <p>确认密码</p>
          </div>
          <div class="cell-right">
            <input v-if="pageInfo" type="text" :placeholder='"再次输入新" + pageInfo.title'>
          </div>
        </div>
      </div>
      <div class="goto">
        <button>修改</button>
      </div>
    </div>
  </div>
</template>

<script>
  const page_msg = [
    {
      type:"login",
      title:"登录密码",
      postUrl:"www.baiodu.com"
    },
    {
      type:"trans",
      title: "兑换密码",
      postUrl:"www.baiodu.com"
    }
  ]
  export default {

    name: "UpdatePass",
    data(){
      return {
        pageInfo: null
      }
    },
    methods: {
      goBack() {
        this.$router.back()
      }
    },
    mounted(){
      let {type} = this.$route.params
      if (type == page_msg[0].type) {
        this.pageInfo = page_msg[0]
      }else if(type == page_msg[1].type){
        this.pageInfo = page_msg[1]
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

  .icon-suoding{
    color: #ff6d9e;
  }
</style>


