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
                <div class="picker-toolbar">
                  <span class="mint-datetime-action mint-datetime-cancel" @click="cancleaddress">取消</span>
                  <span class="mint-datetime-action mint-datetime-confirm" @click="selectaddress">确定</span>
                </div>
                <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5" value-key="name"></mt-picker>
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

  const address = {
    '北京': ['北京'],
    '广东': ['广州', '深圳', '珠海', '汕头', '韶关', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮'],
    '上海': ['上海'],
    '天津': ['天津'],
    '重庆': ['重庆'],
    '辽宁': ['沈阳', '大连', '鞍山', '抚顺', '本溪', '丹东', '锦州', '营口', '阜新', '辽阳', '盘锦', '铁岭', '朝阳', '葫芦岛'],
    '江苏': ['南京', '苏州', '无锡', '常州', '镇江', '南通', '泰州', '扬州', '盐城', '连云港', '徐州', '淮安', '宿迁'],
    '湖北': ['武汉', '黄石', '十堰', '荆州', '宜昌', '襄樊', '鄂州', '荆门', '孝感', '黄冈', '咸宁', '随州', '恩施土家族苗族自治州', '仙桃', '天门', '潜江', '神农架林区'],
    '四川': ['成都', '自贡', '攀枝花', '泸州', '德阳', '绵阳', '广元', '遂宁', '内江', '乐山', '南充', '眉山', '宜宾', '广安', '达州', '雅安', '巴中', '资阳', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州'],
    '陕西': ['西安', '铜川', '宝鸡', '咸阳', '渭南', '延安', '汉中', '榆林', '安康', '商洛'],
    '河北': ['石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '保定', '张家口', '承德', '沧州', '廊坊', '衡水'],
    '山西': ['太原', '大同', '阳泉', '长治', '晋城', '朔州', '晋中', '运城', '忻州', '临汾', '吕梁'],
    '河南': ['郑州', '开封', '洛阳', '平顶山', '安阳', '鹤壁', '新乡', '焦作', '濮阳', '许昌', '漯河', '三门峡', '南阳', '商丘', '信阳', '周口', '驻马店'],
    '吉林': ['长春', '吉林', '四平', '辽源', '通化', '白山', '松原', '白城', '延边朝鲜族自治州'],
    '黑龙江': ['哈尔滨', '齐齐哈尔', '鹤岗', '双鸭山', '鸡西', '大庆', '伊春', '牡丹江', '佳木斯', '七台河', '黑河', '绥化', '大兴安岭地区'],
    '内蒙古': ['呼和浩特', '包头', '乌海', '赤峰', '通辽', '鄂尔多斯', '呼伦贝尔', '巴彦淖尔', '乌兰察布', '锡林郭勒盟', '兴安盟', '阿拉善盟'],
    '山东': ['济南', '青岛', '淄博', '枣庄', '东营', '烟台', '潍坊', '济宁', '泰安', '威海', '日照', '莱芜', '临沂', '德州', '聊城', '滨州', '菏泽'],
    '安徽': ['合肥', '芜湖', '蚌埠', '淮南', '马鞍山', '淮北', '铜陵', '安庆', '黄山', '滁州', '阜阳', '宿州', '巢湖', '六安', '亳州', '池州', '宣城'],
    '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴', '金华', '衢州', '舟山', '台州', '丽水'],
    '福建': ['福州', '厦门', '莆田', '三明', '泉州', '漳州', '南平', '龙岩', '宁德'],
    '湖南': ['长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界', '益阳', '郴州', '永州', '怀化', '娄底', '湘西土家族苗族自治州'],
    '广西': ['南宁', '柳州', '桂林', '梧州', '北海', '防城港', '钦州', '贵港', '玉林', '百色', '贺州', '河池', '来宾', '崇左'],
    '江西': ['南昌', '景德镇', '萍乡', '九江', '新余', '鹰潭', '赣州', '吉安', '宜春', '抚州', '上饶'],
    '贵州': ['贵阳', '六盘水', '遵义', '安顺', '铜仁地区', '毕节地区', '黔西南布依族苗族自治州', '黔东南苗族侗族自治州', '黔南布依族苗族自治州'],
    '云南': ['昆明', '曲靖', '玉溪', '保山', '昭通', '丽江', '普洱', '临沧', '德宏傣族景颇族自治州', '怒江傈僳族自治州', '迪庆藏族自治州', '大理白族自治州', '楚雄彝族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州'],
    '西藏': ['拉萨', '那曲地区', '昌都地区', '林芝地区', '山南地区', '日喀则地区', '阿里地区'],
    '海南': ['海口', '三亚', '五指山', '琼海', '儋州', '文昌', '万宁', '东方', '澄迈县', '定安县', '屯昌县', '临高县', '白沙黎族自治县', '昌江黎族自治县', '乐东黎族自治县', '陵水黎族自治县', '保亭黎族苗族自治县', '琼中黎族苗族自治县'],
    '甘肃': ['兰州', '嘉峪关', '金昌', '白银', '天水', '武威', '酒泉', '张掖', '庆阳', '平凉', '定西', '陇南', '临夏回族自治州', '甘南藏族自治州'],
    '宁夏': ['银川', '石嘴山', '吴忠', '固原', '中卫'],
    '青海': ['西宁', '海东地区', '海北藏族自治州', '海南藏族自治州', '黄南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州'],
    '新疆': ['乌鲁木齐', '克拉玛依', '吐鲁番地区', '哈密地区', '和田地区', '阿克苏地区', '喀什地区', '克孜勒苏柯尔克孜自治州', '巴音郭楞蒙古自治州', '昌吉回族自治州', '博尔塔拉蒙古自治州', '石河子', '阿拉尔', '图木舒克', '五家渠', '伊犁哈萨克自治州'],
    '香港': ['香港'],
    '澳门': ['澳门'],
    '台湾': ['台北市', '高雄市', '台北县', '桃园县', '新竹县', '苗栗县', '台中县', '彰化县', '南投县', '云林县', '嘉义县', '台南县', '高雄县', '屏东县', '宜兰县', '花莲县', '台东县', '澎湖县', '基隆市', '新竹市', '台中市', '嘉义市', '台南市']
  };
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
          addressProvince: '北京',
          addressCity: '北京',
          addressCount:'北京'
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
            if (item.name === province) {
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
            if (item.name === province) {
              item.children.forEach(function (args) {
                if (args.name === city) {
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
        choiceArea: function () {
          this.popupAddressVisible = true
          // // 设置默认选中
          // if (this.data.privinceName !== '' && this.data.cityName !== '') {
          //   this.areaPicker.setSlotValue(0, this.data.privinceName)
          //   this.areaPicker.setSlotValue(1, this.data.cityName)
          //   console.log(this.data.privinceName + '-' + this.data.cityName)
          // }
        },
        cancleaddress: function () {
          this.popupAddressVisible = false
          // this.areaPicker.setSlotValue(0, this.data.privinceName)
          // this.areaPicker.setSlotValue(1, this.data.cityName)
        },
        selectaddress(values) {
          this.popupAddressVisible = false
          // this.fullLevelAddress = values[0]["name"] + values[1]["name"] + values[2]["name"];
          // this.data.privinceName = this.addressProvince
          // this.data.cityName = this.addressCity
          // this.data.provinceId = this.addressProvinceId
          // this.data.cityId = this.addressCityId
          // this.data.areaText = this.data.privinceName + this.data.cityName
        },
        onAddressChange(picker, values){
          if (this.regionInit){
            //取值并赋值
            // this.region = values[0]["name"] + values[1]["name"] + values[2]["name"];
            // this.province = values[0]["name"];
            // this.city = values[1]["name"];
            // this.county = values[2]["name"];
            // this.provinceCode = values[0]["code"];
            // this.cityCode = values[1]["code"];
            // this.countyCode = values[2]["code"];
            this.fullLevelAddress = values[0]["name"] + values[1]["name"] + values[2]["name"];
            console.log(picker.getSlotValue(0));
            console.table(picker.getSlotValues(0));
            console.table(picker.getValues());
            //给市、县赋值
            picker.setSlotValues(1, this.getCityArr(values[0]["name"]));
            picker.setSlotValues(2, this.getCountyArr(values[0]["name"], values[1]["name"]));
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
