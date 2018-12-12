import Vue from 'vue'
import Router from 'vue-router'

const RecommendReg = () => import('@/components/RecommendReg')
const MallIndex = () => import('@/components/mallindex/MallIndex')
const CartIndex = () => import('@/components/mallindex/CartIndex')
const SortIndex = () => import('@/components/mallindex/SortIndex')
const PromotionIndex = () => import('@/components/mallindex/PromotionIndex')
const UserIndex = () => import('@/components/mallindex/UserIndex')
const Payment = () => import('@/components/shopcart/Payment')
const PaymentSucc = () => import('@/components/shopcart/PaymentSucc')
const OrderDetail = () => import('@/components/mine/OrderDetail')
const SelectAddress = () => import('@/components/shopcart/SelectAddress')
const EditAddress = () => import('@/components/shopcart/EditAddress')
const GoodsDetail = () => import('@/components/mallindex/GoodsDetail')
const Evaluations = () => import('@/components/mallindex/Evaluations')
const PostEvaluation = () => import('@/components/mine/PostEvaluation')
const LogisticsTracing = () => import('@/components/mine/LogisticsTracing')
const MyScore = () => import('@/components/mine/MyScore')
const ScoreTrans = () => import('@/components/mine/ScoreTrans')
const ExchangeScore = () => import('@/components/mine/ExchangeScore')
const ScoreDetail = () => import('@/components/mine/ScoreDetail')
const ExchangeSuccess = () => import('@/components/mine/ExchangeSuccess')
const ExchangeStates = () => import('@/components/mine/ExchangeStates')
const ExchangeDetail = () => import('@/components/mine/ExchangeDetail')
const UserEvaluations = () => import('@/components/mine/UserEvaluations')
const MyAccount = () => import('@/components/mine/MyAccount')
const AddCreditCard = () => import('@/components/mine/AddCreditCard')
const AddAliPay = () => import('@/components/mine/AddAliPay')
const Friends = () => import('@/components/mine/Friends')
const SystemSetting = () => import('@/components/mine/SystemSetting')
const ManagePass = () => import('@/components/mine/ManagePass')
const SystemNotice = () => import('@/components/mine/SystemNotice')
const UpdatePass = () => import('@/components/mine/UpdatePass')
const ScoreTypesState = () => import('@/components/mine/ScoreTypesState')
const ScoreRecord = () => import('@/components/mine/ScoreRecord')
const Repurchase = () => import('@/components/shopcart/Repurchase')
const UserInfo = () => import('@/components/mine/UserInfo')
const OrderCenter = () => import('@/components/mine/OrderCenter')
const Refunds = () => import('@/components/mine/Refunds')
const RefundSuccess = () => import('@/components/mine/RefundSuccess')
const SetPayPass = () => import('@/components/mine/SetPayPass')
const SelectTemplate = () => import('@/components/mine/SelectTemplate')
const Play = () => import('@/components/mine/Play')
const ForgetPass = () => import('@/components/ForgetPass')
const Login = () => import('@/components/Login')
const PromotionDetail = () => import('@/components/promotion/PromotionDetail')
const SortDetail = () => import('@/components/sort/SortDetail')
const SearchList = () => import('@/components/home/SearchList')
const RefundApply = () => import('@/components/mine/RefundApply')
const News = () => import('@/components/promotion/News')
const CompanyIntro = () => import('@/components/promotion/CompanyIntro')
const PaymentFail = () => import('@/components/shopcart/PaymentFail')
const Feedback = () => import('@/components/mine/Feedback')
const NewsDetail = () => import('@/components/promotion/NewsDetail')
const MZCollege = () => import('@/components/promotion/MZCollege')
const MZCollegeBranchDocs = () => import('@/components/promotion/MZCollegeBranchDocs')
const MZCollegeBranchPdfs = () => import('@/components/promotion/MZCollegeBranchPdfs')
const Materials = () => import('@/components/promotion/Materials')
const Find = () => import('@/components/promotion/Find')
const MyPromotion = () => import('@/components/promotion/MyPromotion')
const QrCodeGoodsDetail = () => import('@/components/qrshare/QrCodeGoodsDetail')
const ShareGoods = () => import('@/components/qrshare/ShareGoods')


Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'mallindex',
      component: MallIndex,
      meta: { requiresAuth: true }
    },
    {
      path: '/register/:id?',
      name: 'RecommendReg',
      component: RecommendReg
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/forgetpass',
      name: 'ForgetPass',
      component: ForgetPass
    },
    {
      path: '/mallindex',
      name: 'mallindex',
      component: MallIndex,
      meta: { requiresAuth: true }
    },
    {
      path: '/promotion',
      name: 'promotion',
      redirect: '/promotion/share',
      component: PromotionIndex,
      children: [
        {
          path: 'share',
          component: MyPromotion
        },
        {
          path: 'find',
          component: Find
        },
        {
          path: 'news',
          component: Materials
        }
      ]
    },
    {
      path: '/sort',
      name: 'sort',
      component: SortIndex,
      meta: { requiresAuth: true }
    },
    {
      path: '/user',
      name: 'user',
      component: UserIndex,
      meta: { requiresAuth: true }
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartIndex,
      meta: { requiresAuth: true }
    },
    {
      path: '/payment/:id?',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/paymentsucc/:id',
      name: 'PaymentSucc',
      component: PaymentSucc
    },
    {
      path: '/orderdetail/:orderid',
      name: 'OrderDetail',
      component: OrderDetail
    },
    {
      path: '/selectaddress',
      name: 'SelectAddress',
      component: SelectAddress
    },
    {
      path: '/editaddress/:id',
      name: 'EditAddress',
      component: EditAddress
    },
    {
      path: '/goods/:id',
      name: 'GoodsDetail',
      component: GoodsDetail
    },
    {
      path: '/evaluation/:id',
      name: 'Evaluation',
      component: Evaluations
    },
    {
      path: '/postevaluation/:id',
      name: 'PostEvaluation',
      component: PostEvaluation
    },
    {
      path: '/logistics/:id',
      name: 'LogisticsTracing',
      component: LogisticsTracing
    },
    {
      path: '/scores',
      name: 'MyScore',
      component: MyScore,
      meta: { requiresAuth: true }
    },
    {
      path: '/scoretrans',
      name: 'ScoreTrans',
      component: ScoreTrans
    },
    {
      path: '/exchangescore',
      name: 'ExchangeScore',
      component: ExchangeScore
    },
    {
      path: '/scoredetail/:type',
      name: 'ScoreDetail',
      component: ScoreDetail
    },
    {
      path: '/exchangesucc',
      name: 'ExchangeSuccess',
      component: ExchangeSuccess
    },
    {
      path: '/exchangestates',
      name: 'ExchangeStates',
      component: ExchangeStates
    },
    {
      path: '/exchangedetail/:id',
      name: 'ExchangeDetail',
      component: ExchangeDetail
    },
    {
      path: '/score/:type',
      name: 'ScoreTypesState',
      component: ScoreTypesState
    },
    {
      path: '/scorerecord',
      name: 'ScoreRecord',
      component: ScoreRecord
    },
    {
      path: '/userevaluations',
      name: 'UserEvaluations',
      component: UserEvaluations
    },
    {
      path: '/account',
      name: 'MyAccount',
      component: MyAccount
    },
    {
      path: '/addcredit',
      name: 'AddCreditCard',
      component: AddCreditCard
    },
    {
      path: '/addalipay',
      name: 'AddAliPay',
      component: AddAliPay
    },
    {
      path: '/friends',
      name: 'Friends',
      component: Friends,
      meta: { requiresAuth: true }
    },
    {
      path: '/system',
      name: 'SystemSetting',
      component: SystemSetting
    },
    {
      path: '/managepass',
      name: 'ManagePass',
      component: ManagePass
    },
    {
      path: '/sysnotice',
      name: 'SystemNotice',
      component: SystemNotice
    },
    {
      path: '/updatepass/:type',
      name: 'UpdatePass',
      component: UpdatePass
    },
    {
      path: '/repurchase',
      name: 'Repurchase',
      component: Repurchase
    },
    {
      path: '/userinfo',
      name: 'UserInfo',
      component: UserInfo
    },
    {
      path: '/ordercenter/:type',
      name: 'OrderCenter',
      component: OrderCenter
    },
    {
      path: '/refunds',
      name: 'Refunds',
      component: Refunds
    },
    {
      path: '/refundapply/:type',
      name: 'refundapply',
      component:RefundApply
    },
    {
      path: '/refundsucc',
      name: 'RefundSuccess',
      component: RefundSuccess
    },
    {
      path: '/setpaypass',
      name: 'setpaypass',
      component: SetPayPass
    },
    {
      path: '/template/:type',
      name: 'template',
      component: SelectTemplate
    },
    {
      path: '/play',
      name: 'play',
      component:Play
    },
    {
      path: '/share/:id',
      name: 'share',
      component:PromotionDetail
    },
    {
      path: '/serial/:proid/:id/:name',
      name: 'serials',
      component:SortDetail
    },
    {
      path: '/search',
      name: 'search',
      component:SearchList
    },
    {
      path: '/company/:id',
      name: 'company',
      component: CompanyIntro
    },
    {
      path: '/payfail/:id',
      name: 'payfail',
      component: PaymentFail
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: Feedback
    },
    {
      path: '/newslist/:type',
      name: 'typenews',
      component: News
    },
    {
      path: '/news/:id',
      name: 'newsdetail',
      component: NewsDetail
    },
    {
      path: '/mzcollage',
      name: 'mzcollage',
      component: MZCollege
    },
    {
      path: '/mzcolbranchdoc/:id',
      name: 'mzcolbranchdoc',
      component: MZCollegeBranchDocs
    },
    {
      path: '/mzcolbranchpdf/:id',
      name: 'mzcolbranchpdf',
      component: MZCollegeBranchPdfs
    },
    {
      path: '/goodsdetail/:goodsNum/:userId',
      name: 'QrGoodsDetail',
      component: QrCodeGoodsDetail
    },
    {
      path: '/sharegoods/:id',
      name: 'ShareGoods',
      component: ShareGoods
    }
  ]
})

export default router
