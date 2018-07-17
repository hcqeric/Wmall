<template>
  <div class="container">
    <mt-header fixed :title="title">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="posts">
        <div class="goods">
          <RefundApplyGoods :orderItem="backRefunds"></RefundApplyGoods>
        </div>
        <div class="comment">
        <textarea placeholder="请说明您的原因" rows="3" :maxlength="max" @input="descInput"
                  v-model="content"></textarea>
          <p class="pay-service-textarea-text"><span>{{remnant}}</span>/{{max}}</p>
        </div>
        <div class="pictures">
          <el-upload :action="uploadUrl" :file-list="appraisesImgList" :on-error="uploadError" :on-success="uploadSuccess" list-type="picture-card" :on-remove="handleRemove" :on-progress="handleProgress" :limit="3"  ref="uload">
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
  import {refundApply} from "../../http/getData";
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
        if(document.getElementsByClassName('.el-progress .el-progress--circle') != undefined) {
          document.getElementsByClassName('.el-progress .el-progress--circle').style = 'display: none';
        }
      },
      hidePictureCardUpload() {
        document.getElementsByClassName('el-upload el-upload--picture-card')[0].style.display = 'none';
      },
      uploadSuccess (response) {
        this.appraisesImgList.push(response.result)
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
        refundApply({
          token: tk
        },{
          id:this.id,
          tradeStatus:this.type,
          remarks:this.content,
          imgString: imgs
        }).then(response=>{
          console.log(response)
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
      this.uploadUrl = `http://120.79.16.221:8777/app/file/ftpUpload/appraisesImg/0?token=` + tk
      let {type} = this.$route.params
      this.type = type
      if(type == 5){
        this.title = "退款"
      }else if(type == 6){
        this.title = "退货退款"
      }
      this.backRefunds = this.$store.state.shop.backRefunds
      this.id = this.backRefunds.id
      console.log(this.backRefunds)
      console.log(this.id)
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
  .goods{
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

