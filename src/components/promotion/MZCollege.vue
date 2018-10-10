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
                <button @click="toBranchDetail">产品</button>
              </div>
              <div class="edu-sys-name">
                <button @click="toBranchDetail">营销</button>
              </div>
              <div class="edu-sys-name">
                <button @click="toBranchDetail">运营</button>
              </div>
              <div class="edu-sys-name">
                <a href="http://mezhizp.com/download/leader.docx" download >讲师</a>
              </div>
              <div class="edu-sys-name">
                <button @click="toMZCollegeBranchPdfs(3)">商业模式</button>
              </div>
              <div class="edu-sys-name">
                <button @click="toBranchDetail">股权</button>
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
              <button @click="toMZCollegeBranchDocs(2)">情绪管理</button>
            </div>
            <div class="edu-sys-name">
              <button @click="toMZCollegeBranchDocs(0)">亲子教育</button>
            </div>
            <div class="edu-sys-name">
              <button  @click="toMZCollegeBranchDocs(1)">情商</button>
            </div>
            <div class="edu-sys-name">
              <button @click="toMZCollegeBranchPdfs(5)">心理咨询</button>
            </div>
            <div class="edu-sys-name">
              <button @click="toMZCollegeBranchPdfs(4)">教练技术</button>
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
              <button @click="toMZCollegeBranchPdfs(2)">茶艺</button>
            </div>
            <div class="edu-sys-name">
              <!--<button @click="downloadFile(1)">音乐</button>-->
              <a href="http://mezhizp.com/download/music.doc" download >音乐</a>
            </div>
            <div class="edu-sys-name">
              <button @click="toBranchDetail">舞蹈</button>
            </div>
            <div class="edu-sys-name">
              <button @click="toMZCollegeBranchPdfs(1)">形象设计</button>
            </div>
            <div class="edu-sys-name">
              <button @click="toMZCollegeBranchPdfs(0)">财商</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  export default {
    name: "MXCollege",
    data() {
      return {

      }
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      toMZCollegeBranchDocs(id){
        this.$router.push('/mzcolbranchdoc/' + id)
      },
      toMZCollegeBranchPdfs(id){
        this.$router.push('/mzcolbranchpdf/' + id)
      },
      toBranchDetail(){
        Toast({
          message: '当前内容暂未开放中，请耐心等待',
          position:'middle',
          duration: 1000
        })
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
    font-size: 12px;
    height: 26px;
    width: 64px;
    border-radius: 13px;
    color: #000;
  }
  .edu-sys-name>a{
    background-image: url("../../assets/img/bg-white.png");
    border: 1px solid #999;
    font-size: 12px;
    height: 24px;
    line-height: 26px;
    text-align: center;
    width: 62px;
    border-radius: 13px;
    color: #000;
  }
</style>
