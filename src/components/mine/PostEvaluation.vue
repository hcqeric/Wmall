<template>
  <div class="container">
    <mt-header fixed title="发表评价">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
    <div class="posts">
      <EvaluationGoods></EvaluationGoods>
      <div class="rate">
        <el-rate
          v-model="value"
          text-color="#ff9900"
          score-template="{value}">
        </el-rate>
      </div>
      <div class="comment">
        <textarea placeholder="商品满足你的期待吗？说说你的使用心得，分享给想买的他们吧" rows="3" :maxlength="max" @input="descInput"
                v-model="desc"></textarea>
        <p class="pay-service-textarea-text"><span>{{remnant}}</span>/{{max}}</p>
      </div>
      <div class="pictures">
        <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-remove="handleRemove" :on-progress="handleProgress" :limit="3"  ref="upload">
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
      <div class="goto">
        <button>提交评价</button>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import EvaluationGoods from '@/components/view/EvaluationGoods'
    export default {
        name: "PostEvaluation",
      data() {
        return {
          value: 0,
          num: 1,
          remnant:0,
          max: 100,
          dialogImageUrl: '',
        }
      },
      methods: {
        goBack() {
          this.$router.back()
        },
        handleChange(value) {
          console.log(value);
        },
        descInput() {
          var txtVal = this.desc.length;
          this.remnant = txtVal;
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handleProgress(event, file, fileList) {
          document.getElementsByClassName('.el-progress .el-progress--circle')[0].style.display = 'none';
        },
        hidePictureCardUpload() {
          document.getElementsByClassName('el-upload el-upload--picture-card')[0].style.display = 'none';
        }
      },
      components:{
        EvaluationGoods
      },
      mounted(){
        this.$refs.upload.hidePictureCardUpload();
      }
    }
</script>

<style scoped>
  .container{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: #fff;
    overflow: scroll;
  }
  .mint-header{
    background-color: #000;
    height: 48px;
    z-index: 9999;
  }
  .content{
    margin-top: 48px;
  }
  .posts{
    padding: 16px;
  }
  .rate{
    text-align: center;
    height: 36px;
    line-height: 36px;
    margin: 16px 0;
  }
  .comment{
    position: relative;
  }
  .comment textarea{
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    height: 160px;
    resize: none;
    font-size: 16px;
    outline-color: transparent;
    border: 1px solid rgba(239,239,239,0.9);
    border-radius: 3px;
  }
  .comment p{
    position: absolute;
    bottom:10px;
    right: 10px;
    font-size: 12px;
    color: #000;
  }
  .comment textarea::placeholder{color:#999;}
  .pictures{
    padding: 12px 0;
    border-bottom: 1px solid rgba(239,239,239,0.9);
  }
  .goto{
    margin-top: 58px;
    text-align: center;
  }
  .goto button{
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
<style>
  .rate .el-rate__icon{
    font-size: 30px;
  }
  .rate .el-rate__icon.hover {
     transform: scale(1);
  }
  .pictures .el-upload--picture-card{
    height: 100px;
    width: 100px;
    line-height: 98px;
  }

  .pictures .el-upload-list__item {
    height: 100px;
    width: 100px;
  }

</style>
