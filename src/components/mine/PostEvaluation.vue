<template>
  <div class="container">
    <mt-header fixed title="发表评价">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
    <div class="posts">
      <EvaluationGoods :hasEvaluationTime="false" :comment="comment"></EvaluationGoods>
      <div class="rate">
        <el-rate
          v-model="value"
          text-color="#ff9900"
          score-template="{value}">
        </el-rate>
      </div>
      <div class="comment">
        <textarea placeholder="商品满足你的期待吗？说说你的使用心得，分享给想买的他们吧" rows="3" :maxlength="max" @input="descInput"
                v-model="content"></textarea>
        <p class="pay-service-textarea-text"><span>{{remnant}}</span>/{{max}}</p>
      </div>
      <div class="pictures">
        <el-upload :action="uploadUrl" :file-list="appraisesImgList" :on-error="uploadError" :on-success="uploadSuccess" list-type="picture-card" :on-remove="handleRemove" :on-progress="handleProgress" :limit="3"  ref="upload">
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
      <div class="goto">
        <button @click="postAppraises">提交评价</button>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import EvaluationGoods from '@/components/view/EvaluationGoods'
  import {addAppraises} from "../../http/getData";
  import * as Constants from '../../custom/constants'
  import {getLocalStorage} from "../../custom/mixin"
  import {Toast} from 'mint-ui'

  export default {
        name: "PostEvaluation",
      data() {
        return {
          uploadUrl:'',
          comment:{
            goods:{
              name:"买肾丸",
              goodsImg:"http://p90m90efq.bkt.clouddn.com/commend1.png"
            }
          },
          orderId:'',
          goodsId:'',
          content:'',
          value: 0,
          num: 1,
          remnant:0,
          max: 100,
          dialogImageUrl: '',
          appraisesImgList:[]
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
          var txtVal = this.content.length;
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
        },
        uploadSuccess (response) {
          this.appraisesImgList.push(response.result)
          console.log('上传文件', response)
        },
        // 上传错误
        uploadError (response) {
          console.log('上传失败，请重试！',response)
        },
        postAppraises(){
          let fileList = []
          console.log(this.appraisesImgList)
          this.appraisesImgList.forEach(item=>{
            let order = item.order
            let type = item.type
            let url = item.url
            fileList.push({order:order, type: type, url: url})
          })
          console.log(fileList)
          let tk = getLocalStorage(Constants.TOKEN)
          addAppraises({
            token: tk
          },{
            orderId:'0',
            goodsId:'2',
            content:this.content,
            score:this.value,
            fileList: fileList
          }).then(response=>{
            console.log(response)
            Toast({
              message: '评论发表成功',
              position:'middle'
            })
            this.$router.replace('/ordercenter/all')
          }).catch(error=>{})
        }
      },
      components:{
        EvaluationGoods
      },
      mounted(){
        let tk = getLocalStorage(Constants.TOKEN)
        this.uploadUrl = `http://120.79.16.221:8777/app/file/ftpUpload/appraisesImg/0?token=` + tk
        //this.uploadUrl = `http://192.168.0.147:8080/app/file/ftpUpload/appraisesImg/0?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNSIsImlhdCI6MTUzMTEwMTQ2NiwiZXhwIjoxNTMxNzA2MjY2fQ.In0xprJoYh6mePqJk9E0IGVSiQpiznhehyYCSZa1GqmpGjdSrylun9DPgPwTfWFGNmDtQVao7ynD4P4SBDWfcQ`
        console.log(this.uploadUrl)
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
    height: 35px;
    line-height: 35px;
    border-radius: 17px;
    background-color: transparent;
    background-image: url("../../assets/img/button-bg.png");
    background-repeat: no-repeat;
    background-size: contain;
    outline: none;
    width: 290px;
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
