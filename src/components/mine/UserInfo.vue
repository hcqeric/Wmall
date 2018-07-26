<!--滚不动-->
<template>
  <div class="container">
    <mt-header fixed title="我的信息">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
      <el-button type="text" slot="right" @click="saveInfo">保存</el-button>
    </mt-header>
    <div class="content" v-if="user">
      <div class="info-list">
        <div class="top">
          <div class="input-cell">
            <div class="cell-left">
              <p>我的头像</p>
            </div>
            <div class="cell-right">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <!--<img :src="user.logoUrl" alt="">-->
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
          <div class="input-cell">
            <div class="cell-left">
              <p>我的昵称</p>
            </div>
            <div class="cell-right">
              <input type="text" placeholder="输入昵称" v-model="userinfo.nickname">
            </div>
          </div>
          <div class="input-cell">
            <div class="cell-left">
              <p>手机号码</p>
            </div>
            <div class="cell-right">
              <input type="text" placeholder="输入手机号码" v-model="userinfo.mobile">
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="input-cell">
            <div class="cell-left">
              <p>性别</p>
            </div>
            <div class="cell-right">
              <div @click="sexVisible = true">
              <input type="text" readonly="readonly" :value="userinfo.gender|genderFormat" placeholder="选择性别" >
              <i class="el-icon-arrow-right"></i>
              </div>
              <mt-actionsheet :actions="sexs" v-model="sexVisible" cancel-text="取消"></mt-actionsheet>
            </div>
          </div>
          <div class="input-cell">
            <div class="cell-left">
              <p>出生日期</p>
            </div>
            <div class="cell-right">
              <div @click="open('datepicker')">
                <input type="text" placeholder="选择日期" readonly="readonly" v-model="userbirth">
                <i class="el-icon-arrow-right"></i>
              </div>
              <mt-datetime-picker
                ref="datepicker"
                type="date"
                :startDate="startDate"
                :endDate="endDate"
                v-model="birthday"
                @confirm="handleChange">
              </mt-datetime-picker>
            </div>
          </div>
          <div class="input-cell">
            <div class="cell-left">
              <p>所在区域</p>
            </div>
            <div class="cell-right">
              <div @click="choiceArea">
                <input type="text" placeholder="选择所在区域" readonly="readonly" v-model="fullLevelAddress">
                <i class="el-icon-arrow-right"></i>
              </div>
              <mt-popup v-model="popupAddressVisible" position="bottom" class="mint-popup-address">
                <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5" value-key="name" :show-toolbar="true">
                  <div class="picker-toolbar">
                    <span class="mint-datetime-action mint-datetime-cancel" @click="cancleaddress">取消</span>
                    <span class="mint-datetime-action mint-datetime-confirm" @click="selectaddress">确定</span>
                  </div>
                </mt-picker>
              </mt-popup>
            </div>
          </div>
          <div class="input-cell">
            <div class="cell-left">
              <p>详细地址</p>
            </div>
            <div class="cell-right">
              <input type="text" placeholder="输入详细地址" v-model="userinfo.address">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  import {Toast} from 'mint-ui';
  import {deepCopy,isObjectValueEqual,getLocalStorage,GMTToDateStr} from "../../custom/mixin"
  import * as Constants from '../../custom/constants'
  import {updateUserInfo} from "../../http/getData";
  import threeLevelAddress from '../../assets/json/threeLevelAddress.json'

  export default {
      name: "UserInfo",
      data(){
        return {
          sexs: [],
          birthday:new Date('1903-03-03'),
          startDate: new Date('1900-01-01'),
          endDate: new Date(),
          userbirth:new Date(),
          sexVisible:false,
          uploadUrl:'',
          imageUrl:'',
          popupAddressVisible: false,
          regionInit:false,

          fullLevelAddress:'',
          addressPicker:'',
          addressSlots: [
            {
              flex: 1,
              values: this.getProvinceArr(),
              className: 'slot1',
              textAlign: 'center'
            }, {
              divider: true,
              content: '-',
              className: 'slot2'
            }, {
              flex: 1,
              values: this.getCityArr("北京市"),
              className: 'slot3',
              textAlign: 'center'
            }, {
              divider: true,
              content: '-',
              className: 'slot4'
            }, {
              flex: 1,
              values: this.getCountyArr("北京市","直辖区"),
              className: 'slot5',
              textAlign: 'center'
            }],
          addressProvinceCode: '',
          addressCityCode: '',
          addressCountCode:''
        }
      },
      computed:{
          ...mapGetters({
            user: 'userinfo'
          }),
          userinfo(){
            let userinfo = this.$store.state.user.userInfo
            let myinfo = deepCopy(userinfo)
            return myinfo
          }
      },
      methods: {
        //遍历json，返回省级对象数组
        getProvinceArr() {
          let provinceArr = [];
          threeLevelAddress.forEach(function (item) {
            let obj = {};
            obj.name = item.name;
            obj.areaCode = item.areaCode;
            provinceArr.push(obj);
          });
          return provinceArr;
        },
        getCurrProvince(provinceCode) {
          let arr = threeLevelAddress.filter(item => item.areaCode === provinceCode)
          let obj = {};
          obj.name = arr[0].name;
          obj.areaCode = arr[0].areaCode;
          return obj
        },
        //遍历json，返回市级对象数组
        getCityArr(province) {
          // console.log("省：" + province);
          let cityArr = [];
          threeLevelAddress.forEach(function (item) {
            if (item.name == province) {
              item.children.forEach(function (args) {
                let obj = {};
                obj.name = args.name;
                obj.areaCode = args.areaCode;
                cityArr.push(obj);
              });
            }
          });
          return cityArr;
        },
        getCurrCity(provinceCode, cityCode) {
          let arr = threeLevelAddress.filter(
            item => item.areaCode == provinceCode
          )[0].children.filter(
            item => item.areaCode == cityCode
          )
          let obj = {};
          obj.name = arr[0].name;
          obj.areaCode = arr[0].areaCode;
          return obj
        },
        //遍历json，返回县级对象数组
        getCountyArr(province, city) {
          let countyArr = [];
          threeLevelAddress.forEach(function (item) {
            if (item.name == province) {
              item.children.forEach(function (args) {
                if (args.name == city) {
                  args.children.forEach(function (param) {
                    let obj = {};
                    obj.name = param.name;
                    obj.areaCode = param.areaCode;
                    countyArr.push(obj);
                  })
                }
              });
            }
          });
          return countyArr;
        },
        getCurrCounty(provinceCode, cityCode, countyCode){
          let arr = threeLevelAddress.filter(
            item => item.areaCode == provinceCode
          )[0].children.filter(
            item => item.areaCode == cityCode
          )[0].children.filter(
            item => item.areaCode == countyCode
          )
          let obj = {};
          obj.name = arr[0].name;
          obj.areaCode = arr[0].areaCode;

          return obj
        },
        choiceArea () {

          this.popupAddressVisible = true
          // 设置默认选中
          if (this.userinfo.province != '' && this.userinfo.city != '' && this.userinfo.district != '') {
            let proItem = this.getCurrProvince(this.addressProvinceCode)
            let cityItem = this.getCurrCity(this.addressProvinceCode, this.addressCityCode)
            let countyItem = this.getCurrCounty(this.addressProvinceCode, this.addressCityCode, this.addressCountCode)
            console.log("***********************************************")
            this.addressPicker.setSlotValues(0, this.getProvinceArr())
            this.addressPicker.setSlotValues(1, this.getCityArr(proItem["name"]));
            this.addressPicker.setSlotValues(2, this.getCountyArr(proItem["name"], cityItem["name"]));
          }

        },
        cancleaddress: function () {

          this.popupAddressVisible = false
        },
        selectaddress() {
          this.addressPicker.getSlotValues(1).forEach(item => {
            if (item.name == this.addressPicker.getSlotValue(1).name && item.areaCode != this.addressPicker.getSlotValue(1).areaCode) {
              this.addressPicker.setSlotValue(1, item)
            }
          })
          this.addressPicker.getSlotValues(2).forEach(item => {
              if (item.name == this.addressPicker.getSlotValue(2).name && item.areaCode != this.addressPicker.getSlotValue(2).areaCode) {
                this.addressPicker.setSlotValue(2, item)
              }
            })

          this.addressProvinceCode = this.addressPicker.getSlotValue(0)["areaCode"]
          this.addressCityCode = this.addressPicker.getSlotValue(1)["areaCode"]
          this.addressCountCode = this.addressPicker.getSlotValue(2)["areaCode"]
          this.userinfo.province = this.addressProvinceCode
          this.userinfo.city = this.addressCityCode
          this.userinfo.district =  this.addressCountCode

          this.fullLevelAddress = this.addressPicker.getSlotValue(0)["name"] + this.addressPicker.getSlotValue(1)["name"] + this.addressPicker.getSlotValue(2)["name"];

          this.popupAddressVisible = false
        },
        onAddressChange(picker, values){
          this.addressPicker = picker
          //给市、县赋值
          picker.setSlotValues(1, this.getCityArr(values[0]["name"]));
          picker.setSlotValues(2, this.getCountyArr(values[0]["name"], values[1]["name"]));

        },
        handleAvatarSuccess(res,file){

          this.imageUrl = URL.createObjectURL(file.raw);
          this.userinfo.logoUrl = res.result.url

        },
        beforeAvatarUpload(file){
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isLt2M;
        },
        open(picker) {
          if(this.userinfo.birthday){
            this.birthday = this.userinfo.birthday
            this.userbirth = GMTToDateStr(this.userinfo.birthday)
          }
          this.$refs[picker].open();
        },
        handleChange(value) {
          this.userbirth = GMTToDateStr(value)

          let timestamp = Date.parse(new Date(value))
          this.userinfo.birthday = timestamp
        },
        selectMan: function () {
          this.userinfo.gender = 0
        },
        selectWoman: function () {
          this.userinfo.gender = 1
        },
        goBack() {
          this.$router.back()
        },
        ...mapActions([
          'setUserInfo'
        ]),
        saveInfo(){
          // console.log(this.userinfo.gender)
          // console.log(this.userinfo.birthday)
          // console.log(this.userinfo.logoUrl)
          // return
          if (!isObjectValueEqual(this.userinfo, this.$store.state.user.userInfo)){
            let tk = getLocalStorage(Constants.TOKEN)
            updateUserInfo({
              token: tk
            },{
              nickname:this.userinfo.nickname,
              mobile:this.userinfo.mobile,
              province:this.addressProvinceCode.toString(),
              city:this.addressCityCode.toString(),
              district:this.addressCountCode.toString(),
              address:this.userinfo.address,
              logoUrl:this.userinfo.logoUrl,
              gender:this.userinfo.gender,
              birthday:this.userinfo.birthday
            }).then(response=>{

              this.setUserInfo(this.userinfo)
              Toast({
                message: "信息保存成功",
                position: 'middle'
              });
            })
          }else{
            console.log("meiyougai")
          }
        }
      },
      mounted(){

          this.sexs = [{
            name: '男',
            method: this.selectMan
          }, {
            name: '女',
            method: this.selectWoman
          }]
          this.userbirth = GMTToDateStr(this.userinfo.birthday)
          let tk = getLocalStorage(Constants.TOKEN)
          this.uploadUrl = `http://120.79.16.221:8777/app/file/ftpUpload/headImg/0?token=` + tk
          this.imageUrl = this.userinfo.logoUrl

          if (this.userinfo.province != '' && this.userinfo.city != '' && this.userinfo.district != '') {

            this.addressProvinceCode = this.userinfo.province
            this.addressCityCode = this.userinfo.city
            this.addressCountCode = this.userinfo.district

            let proItem = this.getCurrProvince(this.addressProvinceCode)
            let cityItem = this.getCurrCity(this.addressProvinceCode, this.addressCityCode)
            let countyItem = this.getCurrCounty(this.addressProvinceCode, this.addressCityCode, this.addressCountCode)

            this.fullLevelAddress = proItem["name"] + cityItem["name"] + countyItem["name"];
          }

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
    background-color: #efefef;
  }
  .mint-header{
    background-color: #000;
    height: 48px;
    z-index: 9999;
  }
  .content{
    margin-top: 48px;
  }


  .info-list .top{
    background-color: #fff;
    padding: 0 16px;
  }
  .info-list .bottom{
    background-color: #fff;
    margin-top: 8px;
    padding: 0 16px;
  }
  .input-cell{
    min-height: 58px;
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
  }
  .input-cell:after{
    position: absolute;
    bottom: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 1px;
    background-color:  rgba(239,239,239,0.9);
  }
  .input-cell:last-of-type:after{
    height: 0;
  }
  .cell-left{
    display: flex;
    align-items: center;
  }
  .cell-left i{
    font-size: 26px;
    margin-right: 8px;
  }
  .cell-left p{
    width: 100px;
    font-size: 14px;
    color: #999;
  }
  .cell-right{
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
  }
  .cell-right i{
    font-size: 16px;
    color: #999;
  }

  .cell-right img{
    height: 36px;
    width: 36px;
    border-radius: 50%;
    margin-right: 8px;
  }
  .cell-right input{
    border: none;
    outline: none;
    padding: 4px;
    flex: 1;

    height: 26px;
    font-size: 14px;
    color: #000;
    text-align: right;
  }

  input[disabled]{
    background-color: transparent;
  }
  .el-button--text{
    color: #fff;
  }


  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    height: 36px;
    width: 36px;
    line-height: 36px;
    text-align: center;
  }
  .avatar {
    height: 36px;
    width: 36px;
    display: block;
  }

  .mint-popup-address{
    width: 100%;
  }
</style>
