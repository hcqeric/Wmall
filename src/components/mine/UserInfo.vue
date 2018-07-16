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
              <img :src="user.logoUrl" alt="">
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
                <input type="text" placeholder="选择日期" readonly="readonly" v-model="userbirthday">
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
              <input type="text" placeholder="选择所在区域">
              <i class="el-icon-arrow-right"></i>
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
  import {deepCopy,isObjectValueEqual,getLocalStorage,GMTToStr} from "../../custom/mixin"
  import * as Constants from '../../custom/constants'
  import {updateUserInfo} from "../../http/getData";
  export default {
      name: "UserInfo",
      data(){
        return {
          sexs: [],
          birthday:new Date('1903-03-03'),
          startDate: new Date('1900-01-01'),
          endDate: new Date(),
          userbirthday:new Date(),
          sexVisible:false
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
        open(picker) {
          if(this.userinfo.birthday){
            this.birthday = this.userinfo.birthday
          }
          this.$refs[picker].open();
        },
        handleChange(value) {
          console.log(GMTToStr(value))
          // this.userinfo.birthday = window.moment(value).format('YYYY/MM/DD')
          this.userbirthday = GMTToStr(value)
          this.userinfo.birthday = GMTToStr(value)
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
          console.log(this.userinfo.gender)
          console.log(this.userinfo.birthday)
          return
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
</style>
