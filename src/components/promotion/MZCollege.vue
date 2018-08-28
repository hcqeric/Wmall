<template>
  <div class="container">
    <mt-header title="美智学院">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <!-- 商业教育体系 -->
        <div class="edu-system-items">
          <div class="system-nav">
            <img src="../../assets/img/bussiness.png" alt="">
            <span>商业教育体系</span>
          </div>
          <div class="system-sorts">
            <div class="edu-item">
              <div class="edu-sys-name">
                <button>产品</button>
              </div>
              <div class="edu-sys-name">
                <button>营销</button>
              </div>
              <div class="edu-sys-name">
                <button>运营</button>
              </div>
              <div class="edu-sys-name">
                <button>讲师</button>
              </div>
              <div class="edu-sys-name">
                <button>商业模式</button>
              </div>
              <div class="edu-sys-name">
                <button>股权</button>
              </div>
            </div>
          </div>
        </div>
      <!-- 心灵教育系统 -->
      <div class="edu-system-items">
        <div class="system-nav">
          <img src="../../assets/img/hearts.png" alt="">
          <span>心灵教育系统</span>
        </div>
        <div class="system-sorts">
          <div class="edu-item">
            <div class="edu-sys-name">
              <button>情绪管理</button>
            </div>
            <div class="edu-sys-name">
              <button>亲子教育</button>
            </div>
            <div class="edu-sys-name">
              <button>情商</button>
            </div>
            <div class="edu-sys-name">
              <button>心理咨询</button>
            </div>
            <div class="edu-sys-name">
              <button>教练技术</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 技能教育系统 -->
      <div class="edu-system-items">
        <div class="system-nav">
          <img src="../../assets/img/skills.png" alt="">
          <span>技能教育系统</span>
        </div>
        <div class="system-sorts">
          <div class="edu-item">
            <div class="edu-sys-name">
              <button>茶艺</button>
            </div>
            <div class="edu-sys-name">
              <button>音乐</button>
            </div>
            <div class="edu-sys-name">
              <button>舞蹈</button>
            </div>
            <div class="edu-sys-name">
              <button>形象设计</button>
            </div>
            <div class="edu-sys-name">
              <button>财商</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MXCollege",
    data() {
      return {

      }
    },
    methods: {
      goBack() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .container{
    min-height: 100vh;
    background: #eeeeee;
  }
  .mint-header{
    background-color: #000;
    height: 48px;
  }
  .edu-system-items{
    background: #fff;
    display: flex;
    margin-top: 8px;
    padding: 16px 8px;
    align-items: center;
    justify-content: space-between;
  }
  .system-nav{
    display: flex;
    flex: 3;
    align-items: center;
  }
  .system-nav img{
    height: 30px;
    margin-right: 8px;
  }
  .system-nav span{
    display: inline-block;
    font-size: 16px;
  }
  .system-sorts{
    position: relative;
    flex: 7;
    padding-left: 16px;
  }
  .system-sorts:before{
    position: absolute;
    left: 0;
    width: 1px;
    height: 100%;
    content: '';
    background: #eee;
  }

  .system-sorts:after{
    position: absolute;
    top: 50%;
    left: 0;
    margin-top: -4px;
    display:block;
    content:'';
    border-width:8px;
    border-style:solid;
    border-color:transparent transparent transparent #eee;
  }
  .edu-item{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }
  .edu-sys-name{
    width: 33.333%;
    margin: 10px 0px;
    display: flex;
    justify-content: center;
  }
  .edu-sys-name button{
    outline: none;
    background-color: transparent;
    background-image: url("../../assets/img/bg-white.png");
    border: 1px solid #999;
    font-size: 13px;
    height: 26px;
    padding: 0 10px;
    border-radius: 13px;
    color: #000;
  }
</style>
