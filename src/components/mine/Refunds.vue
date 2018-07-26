<template>
  <div class="container">
    <mt-header fixed title="退货退款">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div class="page-infinite">
        <div class="page-infinite-wrapper" ref="wrapper" >
          <div class="record-content" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
            <div class="list page-infinite-listitem" v-for="item in refundList">
              <RefundsItem class="item" :refundInfo="item"></RefundsItem>
            </div>
          </div>
          <p v-show="loading" class="page-infinite-loading">
            <mt-spinner type="fading-circle"></mt-spinner>
            加载中...
          </p>
          <p v-show="allLoaded" class="nodata">{{info}}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import RefundsItem from '@/components/view/RefundsItem'
  import {getRefundList} from "../../http/getData";
  import {getLocalStorage} from "../../custom/mixin";
  import * as Constants from '../../custom/constants'

  export default {
    name: "Refunds",
    data(){
        return {
          refundList:[],
          page: 1,
          limit: '10',
          token:'',
          info:'',
          allLoaded: false,
          loading: false
        }
    },
      methods:{
        goBack() {
          this.$router.back()
        },
        loadMore() {
          if(!this.allLoaded){
            this.loading = true;
            this.loadData()
          }
        },
        loadData(){
          getRefundList({
            token: this.token
          },{
            limit: this.limit,
            page: this.page.toString()
          }).then(response=>{
            this.loading = false;
            if (response.result.totalPage < response.result.currPage) {
              // this.info = "~~数据已全部加载完毕了~~"
              this.allLoaded = true
              return
            }
            response.result.list.map(item=>{
              this.refundList.push(item)
            })
            this.page++

          }).catch(error=>{
            console.log(error);
            this.loading = false
            this.allLoaded = true
            // this.info = "~~数据加载异常，请稍后再试~~"
          })
        }
      },
      components:{
          RefundsItem
      },
      mounted(){
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
  }

  .mint-header {
    background-color: #000;
    height: 48px;
  }

  .content {
    margin-top: 48px;
  }
  .item{
    margin-top: 8px;
  }
  .page-infinite-wrapper{
    background: #efefef;
  }
</style>
