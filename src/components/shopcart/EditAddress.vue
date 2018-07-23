<template>
  <div class="container">
    <mt-header v-if="title" fixed :title="title">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
      <mt-button slot="right" @click="saveAddress">保存</mt-button>
    </mt-header>
    <div class="content">
      <div class="address-info">
        <div class="info-item" @click="choiceArea">
          <span>收货地址</span><input type="text" placeholder="请选择收货地址" v-model="fullLevelAddress"
                                  readonly="readonly"><span><i class="el-icon-arrow-right"></i></span>
        </div>
        <div class="info-item">
          <span>详细地址</span><input placeholder="例：6号楼108室" type="text" v-model="addressInfo.address">
        </div>
        <div class="info-item">
          <span>联系人</span><input placeholder="联系人姓名" type="text" v-model="addressInfo.consignee">
        </div>
        <div class="info-item">
          <span>手机号码</span><input placeholder="联系人电话" type="text" v-model="addressInfo.mobile">
        </div>
      </div>
      <div class="goto" v-if="id == 2">
        <button @click="deleteAddress">删除收货地址</button>
      </div>
    </div>
    <mt-popup v-model="popupAddressVisible" position="bottom" class="mint-popup-address">
      <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5" value-key="name"
                 :show-toolbar="true">
        <div class="picker-toolbar">
          <span class="mint-datetime-action mint-datetime-cancel" @click="cancleaddress">取消</span>
          <span class="mint-datetime-action mint-datetime-confirm" @click="selectaddress">确定</span>
        </div>
      </mt-picker>
    </mt-popup>
  </div>

</template>

<script>
  import {addAddress, updateAddress, deleteAddress} from "../../http/getData";
  import {mapActions} from 'vuex'
  import {getLocalStorage, equalParamReplace, deepCopy, isObjectValueEqual, objectAllEmpty} from "../../custom/mixin";
  import * as Constants from '../../custom/constants'
  import {Toast} from 'mint-ui'
  import threeLevelAddress from '../../assets/json/threeLevelAddress.json'

  export default {
    name: "EditAddress",
    data() {
      return {
        token: null,
        title: null,
        id: null,
        addressPicker:'',
        fullLevelAddress: '',
        popupAddressVisible: false,
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
            values: this.getCountyArr("北京市", "直辖区"),
            className: 'slot5',
            textAlign: 'center'
          }],
        addressInfo: {
          id: '',
          consignee: '',
          province: '110000000000',
          city: '110100000000',
          district: '110101000000',
          address: '',
          mobile: ''
        },
        addressCopy: null
      }
    },
    methods: {
      ...mapActions({
        setAddress: 'setAddress'
      }),
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
        console.log(arr)
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
        console.log(obj)
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
        console.log(obj)
        return obj
      },
      choiceArea() {
        this.popupAddressVisible = true
        if (this.addressInfo.province != '' && this.addressInfo.city != '' && this.addressInfo.district != '') {
          let proItem = this.getCurrProvince(this.addressInfo.province)
          let cityItem = this.getCurrCity(this.addressInfo.province, this.addressInfo.city)
          let countyItem = this.getCurrCounty(this.addressInfo.province, this.addressInfo.city, this.addressInfo.district)

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

        this.addressInfo.province = this.addressPicker.getSlotValue(0)["areaCode"]
        this.addressInfo.city = this.addressPicker.getSlotValue(1)["areaCode"]
        this.addressInfo.district = this.addressPicker.getSlotValue(2)["areaCode"]

        this.fullLevelAddress = this.addressPicker.getSlotValue(0)["name"] + this.addressPicker.getSlotValue(1)["name"] + this.addressPicker.getSlotValue(2)["name"];

        this.popupAddressVisible = false
      },
      onAddressChange(picker, values){
        this.addressPicker = picker
        //给市、县赋值
        picker.setSlotValues(1, this.getCityArr(values[0]["name"]));
        picker.setSlotValues(2, this.getCountyArr(values[0]["name"], values[1]["name"]));

      },
      goBack() {
        this.$router.back()
      },
      deleteAddress() {
        deleteAddress(
          {
            token: this.token
          }, {
            id: this.addressInfo.id
          }).then(response => {
          console.log(response)
          objectAllEmpty(this.addressCopy)
          this.setAddress(this.addressCopy)
          Toast({
            message: "地址删除成功",
            position: 'middle'
          })
          this.$router.go(-1)
        }).catch(error => {
        })
      },
      saveAddress() {
        if (this.id == 1) {
          addAddress({
            token: this.token
          }, {
            consignee: this.addressInfo.consignee,
            province: this.addressInfo.province,
            city: this.addressInfo.city,
            district: this.addressInfo.district,
            address: this.addressInfo.address,
            mobile: this.addressInfo.mobile
          }).then(response => {
            console.log(response)
            this.$router.go(-1)
            Toast({
              message: "亲，已为您保存收货地址",
              position: 'middle'
            })
          }).catch(error => {})
        } else if (this.id == 2) {
          if (!isObjectValueEqual(this.addressInfo, this.addressCopy)) {
            updateAddress({
              token: this.token
            }, {
              id: this.addressInfo.id,
              consignee: this.addressInfo.consignee,
              province: this.addressInfo.province,
              city: this.addressInfo.city,
              district: this.addressInfo.district,
              address: this.addressInfo.address,
              mobile: this.addressInfo.mobile
            }).then(response => {
              console.log(response)
              Toast({
                message: "亲，已为您保存收货地址",
                position: 'middle'
              })
              equalParamReplace(this.addressCopy, this.addressInfo)
              this.setAddress(this.addressCopy)
              this.$router.go(-1)
            }).catch(error => {
            })
          }
        }
      }
    },
    mounted() {
      let {id} = this.$route.params
      this.id = id
      if (id == 1) {
        this.title = "添加收货地址"
      } else if (id == 2) {
        this.title = "编辑收货地址"
        let address = this.$store.state.user.address
        this.addressCopy = deepCopy(address)
        equalParamReplace(this.addressInfo, address)
        if (this.addressInfo.province != '' && this.addressInfo.city != '' && this.addressInfo.district != '') {
          let proItem = this.getCurrProvince(this.addressInfo.province)
          let cityItem = this.getCurrCity(this.addressInfo.province, this.addressInfo.city)
          let countyItem = this.getCurrCounty(this.addressInfo.province, this.addressInfo.city, this.addressInfo.district)

          this.fullLevelAddress = proItem["name"] + cityItem["name"] + countyItem["name"];
        }
      }
      let tk = getLocalStorage(Constants.TOKEN)
      this.token = tk
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
  }

  .address-info {
    padding: 0 16px;
    background-color: #fff;
  }

  .info-item {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(239, 239, 239, 0.9);
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .info-item span {
    display: inline-block;
  }

  .info-item span:first-child {
    width: 80px;
    color: #999;
  }

  .info-item input {
    border: none;
    outline-color: transparent;
    height: 40px;
    flex: 1;
  }

  .info-item span:last-child {
    width: 30px;
    text-align: center;
  }

  i {
    font-size: 16px;
    color: #000;
  }

  .goto {
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 44px 0;
    width: 100%;
    text-align: center;
  }

  .goto button {
    border: none;
    outline: none;
    height: 35px;
    line-height: 35px;
    border-radius: 17px;
    background-color: transparent;
    background-image: url("../../assets/img/button-bg.png");
    background-repeat: no-repeat;
    background-size: contain;
    width: 290px;
    text-align: center;
    color: #fff;
    margin: 0 auto;
  }

  input[disabled], input:disabled {
    border: none;
    background-color: transparent;
    color: #000;
  }

  .mint-popup-address{
    width: 100%;
  }
</style>
