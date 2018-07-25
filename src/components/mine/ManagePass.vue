<template>
  <div class="container">
    <mt-header fixed title="密码管理">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="setting-list">
        <div class="input-cell" @click="updateLoginPass">
          <div class="cell-left">
            <i class="iconfont icon-suoding"></i>
            <p>登录密码</p>
          </div>
          <div class="cell-right">
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <div class="input-cell" @click="updateTransPass" v-if="hasPayPass">
          <div class="cell-left">
            <i class="iconfont icon-jinbiduihuan"></i>
            <p>兑换密码</p>
          </div>
          <div class="cell-right">
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getLocalStorage} from "../../custom/mixin";
  import * as Constants from '../../custom/constants'

  export default {
    name: "ManagePass",
    data(){
      return{
        hasPayPass: false
      }
    },
    computed:{
      ...mapGetters({
        setPayPass: 'setPayPass'
      })
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      updateLoginPass(){
        this.$router.push('/updatepass/login')
      },
      updateTransPass(){
        this.$router.push('/updatepass/trans')
      }
    },
    mounted(){
      let paypass = getLocalStorage(Constants.SETUPPAYPASS)
      if (paypass == 0){
        this.hasPayPass = true
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
    padding-top: 1px;
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

  .icon-suoding{
    color: #b535fa;
  }
  .icon-jinbiduihuan{
    color: #b535fa;
  }
</style>
