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
              <input type="text" placeholder="输入手机号码" :value="user.mobile">
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
              <input type="text" placeholder="输入详细地址" :value="user.address">
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
          addressSlots: [
            {
              flex: 1,
              values: this.getProvinceArr(),
              defaultIndex: 0,
              className: 'slot1',
              textAlign: 'center'
            }, {
              divider: true,
              content: '-',
              className: 'slot2'
            }, {
              flex: 1,
              values: this.getCityArr("110000000000"),
              defaultIndex: 0,
              className: 'slot3',
              textAlign: 'center'
            }, {
              divider: true,
              content: '-',
              className: 'slot4'
            }, {
              flex: 1,
              values: this.getCountyArr("110000000000","110100000000"),
              defaultIndex: 0,
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
        //遍历json，返回市级对象数组
        getCityArr(province) {
          // console.log("省：" + province);
          let cityArr = [];
          threeLevelAddress.forEach(function (item) {
            if (item.areaCode == province) {
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
        //遍历json，返回县级对象数组
        getCountyArr(province, city) {
          let countyArr = [];
          threeLevelAddress.forEach(function (item) {
            if (item.areaCode == province) {
              item.children.forEach(function (args) {
                if (args.areaCode == city) {
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
        getDefaultIndexes(index1, index2, index3){
          let indexes = [];
          threeLevelAddress.forEach((proItem,index)=>{
            if(proItem.areaCode == index1){
              indexes.push(index)
              proItem.children.forEach((cityItem,index)=>{
                if(cityItem.areaCode == index2){
                  indexes.push(index)
                  cityItem.children.forEach((countyItem, index)=>{
                    if(countyItem.areaCode == index3){
                      indexes.push(index)
                    }
                  })
                }
              })
            }
          })

          return indexes
        },
        choiceArea: function () {
          this.popupAddressVisible = true
          // // 设置默认选中
          if (this.userinfo.province !== '' && this.userinfo.city !== '' && this.userinfo.county != '') {
            // this.areaPicker.setSlotValue(0, this.data.privinceName)
            // this.areaPicker.setSlotValue(1, this.data.cityName)
            // console.log(this.data.privinceName + '-' + this.data.cityName)
          }
        },
        cancleaddress: function () {
          this.popupAddressVisible = false
          // this.areaPicker.setSlotValue(0, this.data.privinceName)
          // this.areaPicker.setSlotValue(1, this.data.cityName)
        },
        selectaddress() {
          this.popupAddressVisible = false
          let [index1, index2, index3 ] = this.getDefaultIndexes(this.addressProvinceCode,this.addressCityCode,this.addressCountCode)
          console.log(index1, index2, index3)
          this.addressSlots[0].defaultIndex = index1
          this.addressSlots[2].defaultIndex = index2
          this.addressSlots[4].defaultIndex = index3
          this.fullLevelAddress = this.addressSlots[0].values[index1]["name"] + this.addressSlots[2].values[index2]["name"] + this.addressSlots[4].values[index3]["name"];
          // this.fullLevelAddress = values[0]["name"] + values[1]["name"] + values[2]["name"];
          // this.data.privinceName = this.addressProvince
          // this.data.cityName = this.addressCity
          // this.data.provinceId = this.addressProvinceId
          // this.data.cityId = this.addressCityId
          // this.data.areaText = this.data.privinceName + this.data.cityName
        },
        onAddressChange(picker, values){

          // console.log(this.addressProvinceCode)
          // console.log(this.addressCityCode)
          // console.log(this.addressCountCode)
          //
          // let [index1, index2, index3 ] = this.getDefaultIndexes(this.addressProvinceCode,this.addressCityCode,this.addressCountCode)
          // this.addressSlots[0].defaultIndex = index1
          // this.addressSlots[2].defaultIndex = index2
          // this.addressSlots[4].defaultIndex = index3
          //给市、县赋值
          // picker.setSlotValues(1, this.getCityArr(values[0]["name"]));
          // picker.setSlotValues(2, this.getCountyArr(values[0]["name"], values[1]["name"]));
          if (this.regionInit){
            //取值并赋值
            // this.region = values[0]["name"] + values[1]["name"] + values[2]["name"];
            // this.province = values[0]["name"];
            // this.city = values[1]["name"];
            // this.county = values[2]["name"];
            // this.provinceCode = values[0]["code"];
            // this.cityCode = values[1]["code"];
            // this.countyCode = values[2]["code"];
            // this.fullLevelAddress = values[0]["name"] + values[1]["name"] + values[2]["name"];
            // console.log(picker.getSlotValue(0));
            // console.table(picker.getSlotValues(0));
            // console.table(picker.getValues());


            //给市、县赋值
            picker.setSlotValues(1, this.getCityArr(values[0]["areaCode"]));
            picker.setSlotValues(2, this.getCountyArr(values[0]["areaCode"], values[1]["areaCode"]));
            this.addressProvinceCode = values[0]["areaCode"]
            this.addressCityCode = values[1]["areaCode"]
            this.addressCountCode = values[2]["areaCode"]

            console.log(this.addressProvinceCode,this.addressCityCode,this.addressCountCode)
          }else {
            this.regionInit = true;
          }

        },
        handleAvatarSuccess(res,file){
          console.log(res)
          this.imageUrl = URL.createObjectURL(file.raw);
          this.userinfo.logoUrl = res.result.url
          console.log(this.userinfo.logoUrl)
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
          this.userinfo.birthday = GMTToDateStr(value)
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
              province:this.userinfo.province,
              city:this.userinfo.city,
              district:this.userinfo.district,
              address:this.userinfo.address,
              logoUrl:this.userinfo.logoUrl,
              gender:this.userinfo.gender,
              birthday:this.userinfo.birthday
            }).then(response=>{
              console.log(response)
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

        let {province, city, district} = this.userinfo
        console.log(province, city, district)
        let [index1, index2, index3] = this.getDefaultIndexes(province, city, district)
        this.addressSlots[0].defaultIndex = index1
        this.addressSlots[2].defaultIndex = index2
        this.addressSlots[4].defaultIndex = index3
        this.fullLevelAddress = this.addressSlots[0].values[index1]["name"] + this.addressSlots[2].values[index2]["name"] + this.addressSlots[4].values[index3]["name"];
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
