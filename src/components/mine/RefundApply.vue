<template>
  <div class="container">
    <mt-header fixed :title="title">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="posts">
        <div class="refund-goods">
          <RefundApplyGoods :orderItem="backRefunds"></RefundApplyGoods>
        </div>
        <div class="reasons" v-if="type == 6">
          <p>退货原因：</p>
          <el-select v-model="reason" clearable placeholder="请选择退货理由" @change="handleChange">
            <el-option
              v-for="item in reasonOptions"
              :key="item.id"
              :label="item.reason"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="comment">

        <textarea placeholder="请说明您的原因" rows="3" :maxlength="max" @input="descInput"
                  v-model="content"></textarea>
          <p class="pay-service-textarea-text"><span>{{remnant}}</span>/{{max}}</p>
        </div>
        <div class="pictures">
          <el-upload :action="uploadUrl" :file-list="appraisesImgList" :before-upload="handleBeforeUpload" :on-error="uploadError" :on-success="uploadSuccess" list-type="picture-card" :on-remove="handleRemove" :on-progress="handleProgress" :limit="3" :on-exceed="handleExceed" ref="upload">
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
        <div class="goto">
          <button @click="postAppraises">提交申请</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import RefundApplyGoods from '@/components/view/RefundApplyGoods'
  import {refundApply,getReasonList} from "../../http/getData";
  import * as Constants from '../../custom/constants'
  import {getLocalStorage} from "../../custom/mixin"
  import {Toast} from 'mint-ui'

  export default {
    name: "RefundApply",
    data() {
      return {
        title:'',
        type:'',
        uploadUrl:'',
        backRefunds:{},
        orderId:'',
        goodsId:'',
        content:'',
        num: 1,
        remnant:0,
        max: 100,
        dialogImageUrl: '',
        appraisesImgList:[],
        reasonOptions:[],
        reason:'',
        reasonid: -1
      }
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      handleChange(value){
        this.reasonid = value
      },
      descInput() {
        var txtVal = this.content.length;
        this.remnant = txtVal;
      },
      handleBeforeUpload(file){
        let isLt2M = true;
        // let isLt2M = file.size / 1024 / 1024 < 2;
        // if (!isLt2M) {
        //   Toast({
        //     message:'上传头像图片大小不能超过 2MB!',
        //     position: 'middle'
        //   });
        // }
        if(this.appraisesImgList.length >= 3){
          isLt2M = false
        }
        return isLt2M;
      },
      handleRemove(file, fileList) {
        this.appraisesImgList = fileList
      },
      handleExceed(){
        Toast({
          message: '上传文件数已达上限',
          position:'middle'
        })
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
        document.querySelector('.el-upload-list__item>span').remove()
        document.querySelector('.el-upload-list__item>label').remove()
        document.querySelector('.el-upload-list--picture-card .el-upload-list__item .el-icon-close').style.display = 'block'
      },
      // 上传错误
      uploadError (response) {
        console.log('上传失败，请重试！',response)
      },
      postAppraises(){
        let fileList = []
        this.appraisesImgList.forEach(item=>{
          fileList.push(item.url)
        })
        let imgs = fileList.join(',')
        let tk = getLocalStorage(Constants.TOKEN)
        let datas = {
          id:this.id,
          tradeStatus:this.type,
          remarks:this.content,
          imgString: imgs
        }
        if (this.type == 6){
          this.$set(datas, "reasonId", this.reasonid.toString())
        }
        refundApply({
          token: tk
        },datas).then(response=>{
          Toast({
            message: '提交申请成功',
            position:'middle'
          })
          this.$router.replace('/refundsucc')
        }).catch(error=>{})
      }
    },
    components:{
      RefundApplyGoods,
    },
    mounted(){
      let tk = getLocalStorage(Constants.TOKEN)
      this.uploadUrl = `http://api.mezhizp.com/app/file/ftpUpload/appraisesImg/0?token=` + tk
      let {type} = this.$route.params
      this.type = type
      if(type == 5){
        this.title = "退款"
      }else if(type == 6){
        this.title = "退货退款"
        getReasonList().then(response=>{
          response.result.map(item=>{
            this.reasonOptions.push(item)
          })
        })
      }
      this.backRefunds = this.$store.state.shop.backRefunds
      this.id = this.backRefunds.id
      // this.$refs.uload.hidePictureCardUpload();

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
  .refund-goods{
    margin-bottom: 16px;
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
  .reasons{
    display: flex;
    align-items: center;
    margin-bottom:16px;
  }
  .reasons p{
    font-size:15px;
    color: #000;
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
    height: 27vw;
    width: 27vw;
  }

  .pictures .el-upload-list__item img{
    height: 27vw;
    width: 27vw;
  }

  .pictures .el-upload-list--picture-card .el-upload-list__item .el-icon-close {
    display: block;
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    /* opacity: .75; */
    color: red;
  }
  .reasons .el-input__inner{
    border: none;
  }
  .reasons .el-select{
    flex: 1;
  }
</style>

