import Vue from 'vue'
import Router from 'vue-router'
import RecommendReg from '@/components/RecommendReg'
import MallIndex from '@/components/mallindex/MallIndex'
import CartIndex from '@/components/mallindex/CartIndex'
import SortIndex from '@/components/mallindex/SortIndex'
import PromotionIndex from '@/components/mallindex/PromotionIndex'
import UserIndex from '@/components/mallindex/UserIndex'
import Payment from '@/components/shopcart/Payment'
import PaymentSucc from '@/components/shopcart/PaymentSucc'
import OrderDetail from '@/components/mine/OrderDetail'
import SelectAddress from '@/components/shopcart/SelectAddress'
import EditAddress from '@/components/shopcart/EditAddress'
import GoodsDetail from '@/components/mallindex/GoodsDetail'
import Evaluations from '@/components/mallindex/Evaluations'
import PostEvaluation from '@/components/mine/PostEvaluation'
import LogisticsTracing from '@/components/mine/LogisticsTracing'
import MyScore from '@/components/mine/MyScore'
import ScoreTrans from '@/components/mine/ScoreTrans'
import ExchangeScore from '@/components/mine/ExchangeScore'
import ScoreDetail from '@/components/mine/ScoreDetail'
import ExchangeSuccess from '@/components/mine/ExchangeSuccess'
import ExchangeStates from '@/components/mine/ExchangeStates'
import ExchangeDetail from '@/components/mine/ExchangeDetail'
import UserEvaluations from '@/components/mine/UserEvaluations'
import MyAccount from '@/components/mine/MyAccount'
import AddCreditCard from '@/components/mine/AddCreditCard'
import AddAliPay from '@/components/mine/AddAliPay'
import Friends from '@/components/mine/Friends'
import SystemSetting from '@/components/mine/SystemSetting'
import ManagePass from '@/components/mine/ManagePass'
import SystemNotice from '@/components/mine/SystemNotice'
import UpdatePass from '@/components/mine/UpdatePass'
import ScoreTypesState from '@/components/mine/ScoreTypesState'
import ScoreRecord from '@/components/mine/ScoreRecord'
import Repurchase from '@/components/shopcart/Repurchase'
import UserInfo from '@/components/mine/UserInfo'
import OrderCenter from '@/components/mine/OrderCenter'
import Refunds from '@/components/mine/Refunds'
import RefundSuccess from '@/components/mine/RefundSuccess'
import ForgetPass from '@/components/ForgetPass'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mallindex',
      component: MallIndex
    },
    {
      path: '/reg',
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
      component: MallIndex
    },
    {
      path: '/promotion',
      name: 'promotion',
      component: PromotionIndex
    },
    {
      path: '/sort',
      name: 'sort',
      component: SortIndex
    },
    {
      path: '/user',
      name: 'user',
      component: UserIndex
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartIndex
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/paymentsucc',
      name: 'PaymentSucc',
      component: PaymentSucc
    },
    {
      path: '/orderdetail',
      name: 'OrderDetail',
      component: OrderDetail
    },
    {
      path: '/selectaddress',
      name: 'SelectAddress',
      component: SelectAddress
    },
    {
      path: '/editaddress',
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
      path: '/scores/:id',
      name: 'MyScore',
      component: MyScore
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
      path: '/scoredetail',
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
      path: '/exchangedetail',
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
      component: Friends
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
      path: '/refundsucc',
      name: 'RefundSuccess',
      component: RefundSuccess
    }
  ]
})
