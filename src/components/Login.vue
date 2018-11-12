<template>
  <div class="container">
    <div class="content">
      <div class="app-logo">
        <img src="../assets/img/app-logo.png" alt="">
      </div>
      <div :model="ruleForm" ref="ruleForm" label-position="left" label-width="100px" :show-message="false" class="demo-ruleForm">
        <div prop="username" class="item">
          <div slot="label" class="labels">
            <img src="../assets/img/shouj.png" alt="" class="phone">
            <span>手机号码</span>
          </div>
          <div class="form-content">
            <el-input v-model="ruleForm.username" auto-complete="off" placeholder="请输入手机号码"></el-input>
          </div>
        </div>
        <div prop="password" class="item">
          <div slot="label" class="labels">
            <img src="../assets/img/yaos.png" alt="">
            <span>登录密码</span>
          </div>
          <div class="form-content">
            <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="请输入登录密码"></el-input>
          </div>
        </div>
        <div class="agreement">
          <el-checkbox v-model="ruleForm.checked"></el-checkbox>
          <span>已阅读并同意</span><span @click="showAgreement = true" class="agreement-span">《用户隐私协议》</span>
        </div>
      </div>
    </div>
    <div class="goto">
      <button  @click="doLogin" ref="btnLogin">登录</button>
    </div>
    <div class="behavior">
      <router-link to="/forgetpass">
        <span>忘记密码</span>
      </router-link>
    </div>
    <!--<span class="beian" @click="toBeiAn">豫ICP备18029678号-1</span>-->
    <span class="beian"><a href="http://www.miitbeian.gov.cn/">豫ICP备18029678号-1</a></span>

    <mt-popup v-model="showAgreement" position="bottom" class="modal-popup-agreement"  >
      <div class="user-agreement">
        <i class="el-icon-close close-agreement" @click="showAgreement = false"></i>
        <article>
          <h3>隐私政策</h3>
          <!--<p>发布日期：待定</p>-->
          <p>本应用尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更有个性化的服务，本应用会按照本隐私权政策的规定使用和披露您的个人信息。但本应用将以高度的勤勉、审慎义务对待这些信息。除本隐私权政策另有规定外，在未征得您事先许可的情况下，本应用不会将这些信息对外披露或向第三方提供。本应用会不时更新本隐私权政策。 您在同意本应用服务使用协议之时，即视为您已经同意本隐私权政策全部内容。本隐私权政策属于本应用服务使用协议不可分割的一部分。</p>

          <p>1. 适用范围</p>

          <p>(a) 在您注册本应用帐号时，您根据本应用要求提供的个人注册信息；</p>

          <p>(b) 在您使用本应用网络服务，或访问本应用平台网页时，本应用自动接收并记录的您的浏览器和计算机上的信息，包括但不限于您的IP地址、浏览器的类型、使用的语言、访问日期和时间、软硬件特征信息及您需求的网页记录等数据；</p>

          <p>(c) 本应用通过合法途径从商业伙伴处取得的用户个人数据。</p>

          <p>您了解并同意，以下信息不适用本隐私权政策：</p>

          <p>(a) 您在使用本应用平台提供的搜索服务时输入的关键字信息；</p>

          <p>(b) 本应用收集到的您在本应用发布的有关信息数据，包括但不限于参与活动、成交信息及评价详情；</p>

          <p>(c) 违反法律规定或违反本应用规则行为及本应用已对您采取的措施。</p>

          <p>2. 信息使用</p>

          <p>(a)本应用不会向任何无关第三方提供、出售、出租、分享或交易您的个人信息，除非事先得到您的许可，或该第三方和本应用（含本应用关联公司）单独或共同为您提供服务，且在该服务结束后，其将被禁止访问包括其以前能够访问的所有这些资料。</p>

          <p>(b) 本应用亦不允许任何第三方以任何手段收集、编辑、出售或者无偿传播您的个人信息。任何本应用平台用户如从事上述活动，一经发现，本应用有权立即终止与该用户的服务协议。</p>

          <p>(c) 为服务用户的目的，本应用可能通过使用您的个人信息，向您提供您感兴趣的信息，包括但不限于向您发出产品和服务信息，或者与本应用合作伙伴共享信息以便他们向您发送有关其产品和服务的信息（后者需要您的事先同意）。</p>

          <p>3. 信息披露</p>

          <p>在如下情况下，本应用将依据您的个人意愿或法律的规定全部或部分的披露您的个人信息：</p>

          <p>(a) 经您事先同意，向第三方披露；</p>

          <p>(b)为提供您所要求的产品和服务，而必须和第三方分享您的个人信息；</p>

          <p>(c) 根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露；</p>

          <p>(d) 如您出现违反中国有关法律、法规或者本应用服务协议或相关规则的情况，需要向第三方披露；</p>

          <p>(e) 如您是适格的知识产权投诉人并已提起投诉，应被投诉人要求，向被投诉人披露，以便双方处理可能的权利纠纷；</p>
          <p>(f) 在本应用平台上创建的某一交易中，如交易任何一方履行或部分履行了交易义务并提出信息披露请求的，本应用有权决定向该用户提供其交易对方的联络方式等必要信息，以促成交易的完成或纠纷的解决。</p>

          <p>(g) 其它本应用根据法律、法规或者网站政策认为合适的披露。</p>

          <p>4. 信息存储和交换</p>

          <p>本应用收集的有关您的信息和资料将保存在本应用及（或）其关联公司的服务器上，这些信息和资料可能传送至您所在国家、地区或本应用收集信息和资料所在地的境外并在境外被访问、存储和展示。</p>

          <p>5. Cookie的使用</p>

          <p>(a) 在您未拒绝接受cookies的情况下，本应用会在您的计算机上设定或取用cookies ，以便您能登录或使用依赖于cookies的本应用平台服务或功能。本应用使用cookies可为您提供更加周到的个性化服务，包括推广服务。</p>

          <p>(b) 您有权选择接受或拒绝接受cookies。您可以通过修改浏览器设置的方式拒绝接受cookies。但如果您选择拒绝接受cookies，则您可能无法登录或使用依赖于cookies的本应用网络服务或功能。</p>

          <p>(c) 通过本应用所设cookies所取得的有关信息，将适用本政策。</p>

          <p>6. 信息安全</p>

          <p>(a) 本应用帐号均有安全保护功能，请妥善保管您的用户名及密码信息。本应用将通过对用户密码进行加密等安全措施确保您的信息不丢失，不被滥用和变造。尽管有前述安全措施，但同时也请您注意在信息网络上不存在“完善的安全措施”。</p>

          <p>(b) 在使用本应用网络服务进行网上交易时，您不可避免的要向交易对方或潜在的交易对</p>

          <p>7.本隐私政策的更改</p>

          <p>(a)如果决定更改隐私政策，我们会在本政策中、本公司网站中以及我们认为适当的位置发布这些更改，以便您了解我们如何收集、使用您的个人信息，哪些人可以访问这些信息，以及在什么情况下我们会透露这些信息。</p>

          <p>(b)本公司保留随时修改本政策的权利，因此请经常查看。如对本政策作出重大更改，本公司会通过网站通知的形式告知。</p>

          <p>请您妥善保护自己的个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息泄密，尤其是本应用用户名及密码发生泄露，请您立即联络本应用客服，以便本应用采取相应措施。</p>

        </article>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import * as Constants from '../custom/constants'
  import url from '../http/url.js'
  import { Toast } from 'mint-ui'
  import {mapActions} from 'vuex'
  export default {
    name: "Login",
    data() {
      return {
        showAgreement: false,
        ruleForm: {
          username: '',
          password: '',
          checked:true
        }
      };
    },
    methods: {
      ...mapActions([
        'loginState',
        'setToken'
      ]),
      isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          return true;
        } else {
          return false;
        }
      },
      goBack() {
        this.$router.back()
      },
      doLogin() {
        if(this.ruleForm.username === ''){
          Toast({
            message: '手机号不能为空',
            position: 'middle',
            duration: 1000})
          return
        }else if(!(/^1(2|3|4|5|6|7|8|9)\d{9}$/.test(this.ruleForm.username))) {
          Toast('手机号码格式不正确')
          return
        }
        if (this.ruleForm.username.password === '') {
          Toast('密码不能为空')
          return
        }
        if (!this.ruleForm.checked) {
          Toast({
            message: '您尚未同意用户隐私协议',
            position: 'middle',
            duration: 1000
          });
          return false
        }
        this.axios.post(url.login, {
          mobile: this.ruleForm.username,
          password: this.ruleForm.password
        }).then(response => {
          if (response.data.code === 0) {
            let token = response.data.result.token
            let userId = response.data.result.userId
            this.storeState(token).then(() => {
              if(this.isWeiXin()){
                let authUrl = url.baseUrl + url.wxAuth + userId
                window.location.href = authUrl
              }else{
                this.$router.push('/mallindex')
              }
            })
          } else if (response.data.code === 500) {
            Toast({
              message:response.data.msg
            });
          }
        }).catch((error) => {
          Toast({
            message: "服务器异常，请稍后再试"
          })
        });
      },
      async storeState(token){
        await localStorage.setItem(Constants.TOKEN, token)
        await  this.setToken(token)
        await  this.loginState(true)
      }
    }
  }
</script>

<style scoped>
  .container{
    width: 100%;
    height: 100vh;
    background: #fff;
  }
  .content{
    padding: 24px;
  }
  .item{
    position: relative;
    display: flex;
    height: 46px;
    align-items: center;
  }
  .item:after{
    position: absolute;
    content: '';
    height: 1px;
    bottom: 0px;
    left: 0;
    width: 100%;
    background-color: #eee;
  }
  .labels{
    display: flex;
    align-items: center;
    width: 100px;
  }
  .labels img{
    width: 20px;
    margin-right: 4px;
  }
  img.phone{
    width: 16px;
  }
  .form-content{
    flex: 1;
    display: flex;
    align-items: center;
  }
  .goto{
    margin:30px auto 0;
    text-align: center;
  }
  .goto button{
    border: none;
    height: 35px;
    line-height: 35px;
    border-radius: 17px;
    background-color: transparent;
    background-image: url("../assets/img/button-bg.png");
    background-repeat: no-repeat;
    background-size: contain;
    outline: none;
    width: 290px;
    text-align: center;
    color: #fff;
    margin: 0 auto;
  }
  .behavior{
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    margin-left: 44px;
  }
  .el-form{
    margin-top: 40%;
  }
  /*.demo-ruleForm{*/
    /*margin-top: 20vh;*/
  /*}*/
  .app-logo{
    height: 30vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .app-logo img{
    width: 20vw;
    height: 20vw;
  }
  .beian{
    margin-top: 30px;
    display: block;
    font-size: 16px;
    text-align: center;
  }
  /*ios隐私协议*/
  .agreement{
    margin: 30px 0 0;
    text-align: center;
  }
  .agreement-span{
    color: #e742b8;
  }
  .modal-popup-agreement{
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
  }
  .need-indent{
    text-indent: 2em;
  }
  .user-agreement{
    margin: 16px;
    position: relative;
  }
  .close-agreement{
    position: absolute;
    right: 0;
    top: 0;
    font-size: 22px;
  }
  .user-agreement article p{
    line-height: 24px;
    font-size: 14px;
  }
  .user-agreement article h3{
    text-align: center;
    margin-bottom: 16px;
  }
  .user-agreement article h4{
    text-align: right;
    margin-top: 16px;
  }
</style>
<style>
  .item .div__label{
    padding: 0;
  }
  .item .el-input__inner{
    border: none;
    flex: 1;
  }
  .item .el-button--text{
    color: #999;
  }
  .content .div {
    margin-bottom: 8px;
  }
  .agreement .el-checkbox__inner{
    border-color: #e742b8;
  }
  .agreement .el-checkbox__inner:hover {
    border-color: #e742b8;
  }
  .agreement .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #e742b8;
    border-color: #e742b8;
  }
</style>

