import Vue from 'vue'
import Router from 'vue-router'
import RecommendReg from '@/components/RecommendReg'
import MallIndex from '@/components/mallindex/MallIndex'
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

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RecommendReg',
      component: RecommendReg
    },
    {
      path: '/mallindex',
      name: 'MallIndex',
      component: MallIndex
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
    }
  ]
})
