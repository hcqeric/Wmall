<template>
  <div class="container">
    <div class="form-container">
      <el-row class="avatar">
        <img src="../assets/img/app-logo.png" alt="avatar">
      </el-row>
      <div class="content">
        <div :model="ruleForm" ref="ruleForm" label-position="left" label-width="100px"
             class="demo-ruleForm">
          <div prop="recommender" class="item">
            <div slot="label" class="labels">
              <img src="../assets/img/tuij.png" alt="">
              <span>推荐人：</span>
            </div>
            <span>{{recommender.nickname}}</span>
          </div>
          <div prop="mobile" class="item">
            <div slot="label" class="labels">
              <img src="../assets/img/shouj.png" alt="" class="phone">
              <span>手机号码</span>
            </div>
            <div class="form-content">
              <el-input v-model="ruleForm.mobile" auto-complete="off" placeholder="请输入手机号码" ref="mobile"></el-input>
            </div>
          </div>
          <div prop="verify" class="item">
            <div slot="label" class="labels">
              <img src="../assets/img/duanx.png" alt="">
              <span>短信验证</span>
            </div>
            <div class="form-content">
              <el-input v-model="ruleForm.verify" auto-complete="off" placeholder="请输入验证码"></el-input>
              <button type="text" @click="sendCode('ruleForm')" ref="btnCode">发送验证码</button>
            </div>
          </div>
          <div prop="password" class="item">
            <div slot="label" class="labels">
              <img src="../assets/img/yaos.png" alt="">
              <span>设置密码</span>
            </div>
            <div class="form-content">
              <el-input :type="delivery ?  'text' : 'password'" v-model="ruleForm.password"
                        placeholder="请输入密码"></el-input>
              <el-switch v-model="delivery"></el-switch>
            </div>
          </div>
          <div class="agreement">
            <el-checkbox v-model="ruleForm.checked"></el-checkbox>
            <span>已阅读并同意</span><span @click="showAgreement = true" class="agreement-span">《用户服务协议》</span>
          </div>
          <div class="goto">
            <button @click="doRegister">注册</button>
          </div>
          <div class="behavior">
            <router-link to="/login">
              <p>已有账户， <span>直接登录>></span></p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <mt-popup v-model="showAgreement" position="bottom" class="modal-popup-agreement"  >
      <div class="user-agreement">
        <i class="el-icon-close close-agreement" @click="showAgreement = false"></i>
        <article>
          <h3>《美健智韵会员协议》</h3>
          <!--<p>发布日期：待定</p>-->
          <p>特别提示：</p>
          <p class="need-indent">河南美健智韵电子商务有限公司（以下简称“美健智韵”）在此特别提醒您在正式成为会员之前，请认真阅读本《美健智韵会员协议》（以下简称“本协议”），确保您充分理解本协议中各条款。请您审慎阅读并选择接受或不接受本协议。除非您接受本协议所有条款，否则您无权注册、登录或使用本协议所涉服务,无法成为美健智韵的会员，无法享受会员的任何权益。您的点击同意、注册通过、使用本公司网站及手机APP等行为将视为对本协议的接受，视为同意接受本协议各项条款的约束。</p>
          <p class="need-indent">本协议约定美健智韵与会员之间关于美健智韵产品服务（以下简称“服务”）的权利义务。“会员”是指注册并使用本服务的个人。美健智韵可为会员提供相关会员增值服务来提升会员体验。本协议可由美健智韵随时更新，会员可在本网站查阅最新版协议条款，更新后的协议条款一旦公布即代替原来的协议条款，恕不再另行通知。在美健智韵修改协议条款后，如果会员不接受修改后的条款，请立即停止使用美健智韵提供的服务，会员继续使用美健智韵提供的服务将被视为接受修改后的协议。</p>

          <p>一、注册成为美健智韵会员须知悉以下内容：</p>

          <p>1、申请人须保证所填写内容的真实有效，并承诺承担因不实信息而引起的不利后果；</p>

          <p>2、申请成为会员须同时提交本人的中国居民身份证复印件；</p>

          <p>3、会员保证符合美健智韵对会员加入的要求，年满22周岁，并非无民事行为能力或者限制民事行为能力的人员、全日制在校学生、教师、医务人员、公务员、现役军人、境外人员及法律、行政法规规定不得从事兼职的其他人员；同时，申请成为会员应遵纪守法、无刑事故意犯罪记录，且不属于我国政府禁止的任何邪教和非法组织成员。</p>

          <p>4、会员需准确提供真实有效个人信息及账户信息资料，美健智韵将通过申请人提供的账户发放销售报酬及退款。若会员未能及时提供符合要求的银行账户及相关资料的，可能导致报酬或退款延迟发放，这将由会员本人自行承担相应的法律后果，且不得因此问责美健智韵；</p>

          <p>5、美健智韵善意提醒所有注册成功的会员按照各自实际承受能力购买及推销产品，严格遵守各项会员管理规定；</p>

          <p>6、美健智韵依法保护会员的个人信息安全；美健智韵只认可经过核准的账户注册成为会员，不认可代为注册、代为登陆、代为购买产品、代为经营等各种理由，也不认可一个账户的多人共同所有或共同经营。</p>

          <p>7、申请成为会员者需按照公司规定完成会员培训、考试及领证手续；</p>

          <p>8、美健智韵保留最终是否接受您申请成为会员的权利。</p>

          <p>二、APP服务内容</p>

          <p>本服务的具体内容由美健智韵根据实际情况提供，包括但不限于：</p>

          <p>1、美健智韵产品的介绍；</p>

          <p>2、授权会员通过其账号进行产品购买；</p>

          <p>3、会员对于一定时段内产品购买记录的查询；</p>

          <p>4、美健智韵可以对其APP提供的服务予以合理变更。</p>

          <p>三、账户管理</p>

          <p>1、 会员有责任妥善保管本人注册账号信息及账号密码的安全，因会员保管不善可能导致遭受盗号或密码失窃，责任由会员自行承担。会员需要对注册账号以及密码下的行为承担法律责任。会员同意在任何情况下不使用其他会员的账号或密码，也不得让其他会员使用自己的会员账户及密码。在会员怀疑他人使用其账号或密码时，会员需立即通知美健智韵，否则由此造成的一切后果，由会员承担。</p>

          <p>2、会员应遵守本协议的各项条款，正确、适当地使用本服务，如因会员违法或违反本协议中的任何条款，美健智韵有权依据本协议中断或终止对违约会员账号提供服务，而后通知会员。</p>

          <p>四、风险承担</p>

          <p>1、会员理解并同意，会员必须为自己注册账号下的一切行为负责，包括会员在报单平台上的操作以及由此产生的任何后果。会员应对服务中的内容自行加以判断，并承担因使用内容而引起的所有风险，包括因对内容的正确性、完整性或实用性的依赖而产生的风险。美健智韵无法且不会对因会员个人行为而导致的任何损失或损害承担责任。</p>

          <p>如果会员发现任何人违反本协议约定或以其他不当的方式使用本服务，请立即向美健智韵举报或投诉，美健智韵将依本协议约定进行处理。</p>

          <p>2、会员理解并同意，因业务发展需要，美健智韵保留单方面对本公司、公众号、APP等服务的全部或部分服务内容变更、暂停、终止或撤销的权利，会员不同意即视为退出，需承担因此带来的风险。</p>
          <p>五、法律责任</p>

          <p>1、基于APP平台的法定责任，如果美健智韵发现或收到他人举报或投诉会员违反本协议约定的，美健智韵有权随时对相关会员户籍进行审查、删除，并视情节轻重对违规账号处以包括但不限于警告、账号封禁、功能封禁的处罚，且可能公示处理结果。</p>

          <p>2、因违反会员协议被封禁的会员，可向美健智韵提交申诉，美健智韵将对申诉进行审查，并自行合理判断决定是否变更处罚措施。</p>

          <p>3、会员应在会员权益内遵守美健智韵相关业务及会员管理规定，会员在会员权益外的个人行为需遵守中华人民共和国各项法律法规。会员需理解并同意，美健智韵有权依合理判断对违反有关法律法规或本协议规定的行为进行处理，对违法违规的任何会员采取适当的法律行动，并依据法律法规保存有关信息向有关部门报告等，会员应承担由此而产生的一切法律责任，如由此给美健智韵造成损失，应承担赔偿责任。</p>

          <p>4、会员理解并同意，因会员违反本协议约定，导致或产生的任何第三方主张的任何索赔、要求或损失，包括合理的律师费等为实现债权而产生的费用，会员应当赔偿美健智韵并使之免受损害。</p>

          <p>5、会员理解并同意，法律规定之外的任何利益诉求均无法得到美健智韵的支持，因会员的这些诉求不符合法律规定、行业惯例及美健智韵的规则，在会员得到美健智韵的解释说明后仍然固执请求的，美健智韵有权向国家信用管理部门申报该会员的信用缺失状况，并有权向社会公布。</p>

          <p>六、不可抗力及其他免责事由</p>

          <p>1、会员理解并确认，在使用本服务的过程中，可能会遇到不可抗力等风险因素，使本服务发生中断。不可抗力是指不能预见、不能克服并不能避免且对一方或双方造成重大影响的客观事件，包括但不限于自然灾害如洪水、地震、瘟疫流行和风暴等以及社会事件如战争、动乱、政府行为等。出现上述情况时，美健智韵将努力在第一时间与相关单位配合，及时进行修复，但是由此给会员或第三方造成的损失，美健智韵及合作单位在法律允许的范围内免责。</p>

          <p>2、会员理解并确认，在使用本服务过程中存在来自非美健智韵的任何他人的包括误导性的、欺骗性的、威胁性的、诽谤性的、令人反感的或非法的信息，或侵犯他人权利的匿名或冒名的信息，以及伴随该等信息的行为，因此导致的会员或第三方的任何损失，美健智韵不承担任何责任。</p>

          <p>3、美健智韵依据法律法规、本协议约定获得处理违法违规或违约内容的权利，该权利不构成美健智韵的义务或承诺，美健智韵不能保证及时发现违法违规或违约行为或进行相应处理。</p>

          <p>七、服务的变更、中断、终止</p>

          <p>1、会员同意美健智韵有权随时变更、中断或终止部分或全部的服务。美健智韵变更、中断或终止的服务，美健智韵应当在变更、中断或终止之前通知会员，并应向受影响的会员提供等值的替代性的服务。</p>

          <p>2、如发生下列任何一种情形，美健智韵有权变更、中断或终止向会员提供的免费服务或收费服务，而无需对会员或任何第三方承担任何责任：</p>

          <p>(1) 根据法律规定会员应提交真实信息，而会员提供的个人资料不真实、或与注册时信息不一致又未能提供合理证明；</p>

          <p>(2) 会员违反相关法律法规或本协议的约定；</p>

          <p>(3) 按照法律规定或有权机关的要求，但需遵守法律法规规定而后通知会员；</p>

          <p>(4) 出于安全的原因或其他必要的情形。</p>

          <p>八、会员权利</p>

          <p>1、会员有权每月根据其本人直接向消费者销售产品的业绩获得相应报酬。会员应根据公司书面文件获取美健智韵的准确信息，美健智韵不对个别人解读及传达公司政策的偏差负责。</p>

          <p>2、会员购买公司产品，有权按照《经销商退换货管理制度》对所购买商品享有退换货权益。</p>

          <p>3、会员发现其本人在美健智韵的相关权益如身份证复印件、会员号等受到侵害，有权向美健智韵提出要求处理的请求。</p>

          <p>4、会员发现其他会员违反法律、法规及美健智韵制定的各项守则、制度规定及危害美健智韵利益的行为，有权向美健智韵举报和投诉，美健智韵希望提出书面材料并详细说明被举报人信息。</p>

          <p>5、会员有权享受美健智韵提供的服务，并有权参与美健智韵的各项市场活动。</p>

          <p>6、会员有权参加美健智韵面对正式会员提供的各类免费培训和专题讲座。</p>

          <p>7、会员有权销售美健智韵系列产品，服务顾客。</p>

          <p>九、会员义务</p>

          <p>1、会员应严格遵守中华人民共和国法律、法规，履行本协议全部规定的有关会员的所有义务。</p>

          <p>2、会员应保证遵守美健智韵颁布的关于会员的所有活动细则、规章制度及其修正的规定。</p>

          <p>3、会员不应做损害美健智韵名誉或非法的行为，诚实履行美健智韵规章制度，不得侵害消费者权益，不得干扰公司的正常经营秩序。</p>
          <p>4、会员只可使用美健智韵官方制作的文字、录音、影像等宣传资料开展业务活动；会员使用非法资料产生的后果由会员本人承担，与美健智韵无关；美健智韵拒绝一切依据非美健智韵官方资料的权益主张，因此使美健智韵权益遭受损失的，美健智韵将依法追究其法律责任。</p>

          <p>5、会员应以诚信经营，透明经营的原则开展业务活动，依法经营，依法纳税。</p>

          <p>6、会员应保证只在本人所隶属分支机构所在的省（自治区、直辖市）已经设立服务网点的地区开展营销活动。</p>

          <p>7、会员应遵守购货及销货规定：</p>

          <p>(1)会员不得冒用他人的名义订货；</p>

          <p>(2)会员应公平交易，统一按产品标价开展销售，不得擅自收取任何附加费用，也不得有削价或变相削价等不公平竞争的行为。严禁抬价或削价转售给他人；</p>

          <p>(3)会员应努力学习产品知识，深刻了解产品功效；严格按照美健智韵提供的产品资料介绍推广产品。进行产品示范，不得对产品的用途、性能等进行夸大、失实或招人误解的虚假宣传，否则美健智韵将按照有关规定进行处理，情节严重的，应承担所引发的法律责任；</p>

          <p>(4)未经消费者同意，会员不得进入消费者住所强行推销产品，消费者要求其停止推销活动的，应立即停止，并离开消费者住所；</p>

          <p>(5)会员应以礼貌的语言为消费者服务，对消费者对产品的投诉应立即反馈回应，并按照美健智韵规定的程序处理产品退换事宜；</p>

          <p>(6)成交前，会员应向消费者详细介绍美健智韵的退货制度；</p>

          <p>十、产品订购与报酬</p>

          <p>1、美健智韵为产品的提供者，向购买者提供产品是美健智韵的天然义务。美健智韵无法逐一核实会员购买产品数量的合理性，默认所有购买者均具有合法合理的销售渠道或者消费能力。</p>

          <p>2、美健智韵视会员订购的货款为正常消费目的，是会员基于自身需要的自主行为。会员数量巨大，订单量巨大，美健智韵无法逐一核实每一笔订单支付的自愿性，默认所有支付的货款均为会员充分具备消费能力的支付行为。</p>

          <p>3、美健智韵允许会员在购买7日内（因货物破损，订单与实物不相符）原因退货，会员主张货款退回的最长周期仅为确认收货后7日，且需要退回合乎美健智韵要求的产品。超过7日后美健智韵默认客户对于所购买商品无异议，不接受任何理由退货退款。若会员受他人蛊惑、误导而错过退货期限的，所产生的后果和经济损失由责任人承担。</p>
          <p>4、向会员支付销售报酬，依据美健智韵通过商务部行业平台向社会公示的报酬制度。其他方的解释、解读、示例等均无法代表美健智韵的官方。</p>

          <p>5、以超越实际消费承担能力等历来为美健智韵反对的购买行为为基础，去获得销售报酬、促销奖励等均不符合美健智韵产品销售的初衷，行为人应承担因此引起的法律责任，因此违反法律法规，给美健智韵或其他会员带来损失的，行为人应依法赔偿。会员遇到其他会员类似集资、传销等非法模式操作的，有义务及时制止，并及时向美健智韵举报。</p>

          <p>6、向会员讲解销售报酬的前瞻性陈述、过往案例及展望性示例并不构成对于会员的实质承诺，请会员自我衡量自身市场资源，特别注意经营风险。甄别对于产品及销售收益的夸大性讲解是会员长期稳健经营的基础，切勿轻信和传播。</p>

          <p>7、美健智韵所在的美业领域同样面对宏观经济波动、行业监管及产业政策变化风险、行业竞争及经营模式转型等非美健智韵无法避免无法克服的潜在风险，会员需要关注经营的各种风险，并准备应对措施。</p>

          <p>8、销售报酬的领取需正确地缴纳税收，美健智韵作为代扣义务人，须履行法规赋予的法定责任。美健智韵无法与任何会员探讨税收的缴纳比例或方式及其灵活性。</p>

          <p>十一、促销</p>

          <p>1、基于美健智韵为生产企业，向会员出售产品，是基于生产型企业正常的销售目的；会员向本公司购买产品，公司视其为出于自身需要的自主消费产品的目的，货款与产品交付完成，视为已经达到双方的合同目的；</p>

          <p>2、美健智韵出台促销的目的是促进零售，促进经销商向消费者、会员正常推销产品而设定辅助零售的计划。离开这一目的，仅为获得计划的奖励而参与的人，是对促销计划的恶意利用及破坏。一经发现此类非正常消费行为，公司有权终止其参与促销计划的资格；</p>

          <p>3、美健智韵开展与偶或开展促销或者其他类似性质的活动，不改变前款所述购销双方的合同目的。公司所开展一切促销活动均默认参与的消费者为上述正常消费目的，仅为获得计划奖励目的的人不得主张继续获得计划奖励；</p>

          <p>4、美健智韵促销活动的时间可以在公司认为必要时的期限截止后结束，而无需关注消费参与者消费产品之外的其他诉求。视本公司的活动为无限时间既不符合商业惯例，也不符合实际情况，因此公司无法负责给会员带来的预期利益损失的风险；</p>

          <p>5、美健智韵拒绝接受以参与促销活动未经仔细衡量自己的经济状况和承担能力，从而影响自身正常生计等的申诉理由。会员本人须对由此而导致的一切财务损失和风险负责；</p>

          <p>6、美健智韵与会员之间不存在促销计划正式文本之外的任何保证，不存在无损失方面的协议。任何个人解读均不代表美健智韵，美健智韵也无法监督到市场覆盖的全部区域。一夜暴富、长期坐享固定收益等从不是美健智韵的承诺。</p>
          <p>十二、其他</p>

          <p>1、美健智韵郑重提醒会员注意本协议中免除美健智韵责任和限制会员权利的条款，请会员仔细阅读，自主考虑风险。</p>

          <p>2、本协议的效力、解释及纠纷的解决，适用于中华人民共和国法律。若会员和美健智韵之间发生任何纠纷或争议，首先应友好协商解决，协商不成的，会员同意将纠纷或争议提交美健智韵住所地有管辖权的人民法院管辖。</p>

          <p>3、本协议的任何条款无论因何种原因无效或不具可执行性，其余条款仍有效，对双方具有约束力。</p>

          <p>4、美健智韵与会员双方均认可《中华人民共和国电子签名法》，认可依据《中华人民共和国电子签名法》赋予本协议正式的法律效力。一经点击“同意”，本协议即具有了法律赋予的合同效力。</p>

          <h4>河南美健智韵电子商务有限公司</h4>
        </article>
      </div>
    </mt-popup>
  </div>
</template>

<script type="es6">
  import * as Constants from '../custom/constants'
  import { Toast } from 'mint-ui';
  import url from '../http/url.js'
  import {mapActions} from 'vuex'
  import {getUserInfoById} from "../http/getData";
  import {getSessionStorage} from "../custom/mixin";

  export default {
    name: "RecommendReg",
    data() {
      return {
        recommendUserId:'',
        recommender:{},
        showAgreement: false,
        delivery:false,
        ruleForm: {
          mobile: '',
          verify: '',
          password: '',
          checked:true
        },
        recommendType: 0
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
      async storeState(token){
        await localStorage.setItem(Constants.TOKEN, token)
        await  this.setToken(token)
        await  this.loginState(true)
      },
      goBack() {
        this.$router.back()
      },
      sendCode(formName) {
        if (this.ruleForm.mobile === '') {
          Toast({
            message: '手机号不能为空',
            position: 'middle',
            duration: 1000
          })
          return
        } else if (!(/^1(3|4|5|7|8|9)\d{9}$/.test(this.ruleForm.mobile))) {
          Toast('手机号码格式不正确')
          return
        }
        this.$refs.btnCode.disabled = true;
        this.axios.post(url.verify, {
          mobile: this.ruleForm.mobile,
          codeType: "0"
        }).then(response => {
          if (response.data.code === 0) {
            let btnCode = this.$refs.btnCode;
            let second = 60
            btnCode.innerHTML = second + 'S后重发'
            let timer = setInterval(() => {
              second--
              btnCode.innerHTML = second + 'S后重发'
              if (second <= 0) {
                clearInterval(timer)
                btnCode.innerHTML = '重发验证码'
                this.$refs.btnCode.disabled = false
              }
            }, 1000)
          } else if (response.data.code === 500) {
            Toast(response.data.msg);
          }
        }).catch(function (error) {});
      },
      doRegister() {
        if (this.ruleForm.mobile === ''){
          Toast({
            message: '手机号不能为空',
            position: 'middle',
            duration: 1000})
          return
        }else if(!(/^1(3|4|5|7|8|9)\d{9}$/.test(this.ruleForm.mobile))){
          Toast('手机号码格式不正确')
          return
        }
        if (this.ruleForm.password === '') {
          Toast({
            message: '密码不能为空',
            position: 'middle',
            duration: 1000
          });
          return false
        } else {
          if (!(/^[\w.]{6,20}$/.test(this.ruleForm.password))) {
            Toast({
              message: '密码长度需为6-20位',
              position: 'middle',
              duration: 1000
            });
            return false
          }
        }
        if (!this.ruleForm.checked) {
          Toast({
            message: '您尚未同意用户服务协议',
            position: 'middle',
            duration: 1000
          });
          return false
        }
        this.axios.post(url.reg, {
          mobile: this.ruleForm.mobile,
          password: this.ruleForm.password,
          code: this.ruleForm.verify,
          recommendUserId: this.recommendUserId,
          selected: this.ruleForm.checked ? "0" : "1"
        }).then(response => {
          if (response.data.code === 0) {
            console.log(response)
            let data = response.data
            let userId = response.data.result.userId
            this.storeState(data.result.token).then(() => {
              if (this.recommendType == 0){
                if(this.isWeiXin()){
                  let authUrl = url.baseUrl + url.wxAuth + userId
                  window.location.href = authUrl
                }else{
                  this.$router.push('/mallindex')
                }
              } else{
                this.$router.push('/cart')
              }
            })
          } else if (response.data.code === 500) {
            Toast(response.data.msg);
          }
        }).catch(function (error) {});
      }
    },
    mounted(){

      let {id} = this.$route.params
      this.recommendUserId = id
      this.recommendType = 0
      let userId = getSessionStorage("userId")
      if (userId){
        this.recommendUserId = userId
        this.recommendType = 1
      }
      getUserInfoById({
        id: this.recommendUserId
      }).then(response=>{
        this.recommender = response.result
      })
    }
  }
</script>

<style scoped>
  .container{
    width: 100%;
    height: 100vh;
    background: #fff;
  }
  .form-container{
    padding-top: 50px;
  }
  .avatar{
    text-align: center;
    margin-bottom: 50px;
  }
  .avatar img{
    width: 80px;
    height: 80px;
  }
  .content{
    padding: 0 30px;
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
    left: 0;
    bottom: 0px;
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
  .form-content button{
    border: none;
    outline: none;
    background: #fff;
    color: #000;
    width: 100px;
  }
  .agreement{
    margin: 30px 0;
    text-align: center;
  }
  .agreement-span{
    color: #e742b8;
  }
  .goto{
    margin:0 auto 0;
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
    justify-content: flex-start;
    margin-top: 16px;
  }
  .behavior p span{
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
  .item .el-form-item__label{
    padding: 0;
  }
  .item .el-input__inner{
    border: none;
    flex: 1;
  }
  .item .el-button--text{
    color: #000;
  }
  .content .el-form-item {
    margin-bottom: 8px;
  }
  .item .el-input__inner{
    padding: 0;
  }
  .item .el-switch.is-checked .el-switch__core {
    background-color: #e742b8;
    border-color: #e742b8;
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
