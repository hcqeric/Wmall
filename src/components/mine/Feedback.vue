<template>
  <div class="container">
    <mt-header fixed title="意见反馈">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
    <div class="posts">
      <div class="comment">
        <textarea placeholder="提出您的意见和反馈" rows="3" :maxlength="max" @input="descInput"
                v-model="content"></textarea>
        <p class="pay-service-textarea-text"><span>{{remnant}}</span>/{{max}}</p>
      </div>
      <div class="pictures">
        <el-upload :action="uploadUrl" :file-list="appraisesImgList" :on-error="uploadError" :on-success="uploadSuccess" list-type="picture-card" :on-remove="handleRemove" :on-progress="handleProgress" :limit="4"  ref="upload">
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
      <div class="contact">
        <div class="input-cell">
          <div class="cell-left">
            <p>手机号:</p>
          </div>
          <div class="cell-right">
            <input type="text" placeholder="留下您的手机号，方便我们联系到您" v-model="mobile">
          </div>
        </div>
      </div>
      <div class="goto">
        <button @click="postAppraises">提交</button>
      </div>
    </div>
    </div>
  </div>
</template>

<script>

  import {saveFeedback} from "../../http/getData";
  import * as Constants from '../../custom/constants'
  import {getLocalStorage} from "../../custom/mixin"
  import {Toast} from 'mint-ui'

  export default {
        name: "Feedback",
      data() {
        return {
          uploadUrl:'',
          productId:'0',
          mobile:'',
          content:'',
          num: 1,
          remnant:0,
          max: 300,
          dialogImageUrl: '',
          appraisesImgList:[]
        }
      },
      methods: {
        goBack() {
          this.$router.back()
        },
        descInput() {
          var txtVal = this.content.length;
          this.remnant = txtVal;
        },
        handleRemove(file, fileList) {

        },
        handleProgress(event, file, fileList) {
          if(document.getElementsByClassName('.el-progress .el-progress--circle') != undefined) {
            document.getElementsByClassName('.el-progress .el-progress--circle').style = 'display: none';
          }
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

          this.appraisesImgList.forEach(item=>{
            let order = item.order
            let type = item.type
            let url = item.url
            fileList.push({order:order, type: type, url: url})
          })

          let tk = getLocalStorage(Constants.TOKEN)
          saveFeedback({
            token: tk
          },{
            productId:this.productId,
            content:this.content,
            mobile:this.mobile,
            fileList: fileList
          }).then(response=>{
            console.log(response)
            Toast({
              message: '意见反馈成功',
              position:'middle'
            })
            this.$router.replace('/user')
          }).catch(error=>{})
        }
      },
      mounted(){
        let tk = getLocalStorage(Constants.TOKEN)
        this.uploadUrl = `http://120.79.16.221:8777/app/file/ftpUpload/appraisesImg/0?token=` + tk
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


  .contact .input-cell {
    min-height: 48px;
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
  }

  .contact .input-cell:after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 1px;
    background-color: rgba(239, 239, 239, 0.9);
  }

  /*.input-cell:last-of-type:after {*/
    /*height: 0;*/
  /*}*/

  .contact .cell-left {
    display: flex;
    align-items: center;
  }

  .contact .cell-left i {
    font-size: 26px;
    margin-right: 8px;
  }

  .contact .cell-left p {
    margin-right: 16px;
    font-size: 14px;
    color: #000;
  }

  .contact .cell-right {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
  }

  .contact .cell-right input {
    border: none;
    outline: none;
    padding: 4px;
    flex: 1;
    margin-right: 8px;
    height: 26px;
    font-size: 14px;
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
