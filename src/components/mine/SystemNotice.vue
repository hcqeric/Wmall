<template>
  <div class="container">
    <mt-header fixed title="系统通知">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <div v-for="(item,index)  in notificationList" :key="index">
        <NoticeCard class="item"  :notificationItem="item"></NoticeCard>
      </div>

    </div>
  </div>
</template>

<script>
  import NoticeCard from '@/components/view/NoticeCard'
  import {getNotificationList} from "../../http/getData";

  export default {
    name: "SystemNotice",
    data() {
      return {
        notificationList:[]
      }
    },
      methods: {
        goBack() {
          this.$router.back()
        }
      },
      components:{
          NoticeCard
      },
      mounted(){
        getNotificationList({
          notificationType:'1'
        }).then(response=>{
          console.log(response)
          response.result.map(item=>{
            this.notificationList.push(item)
          })
        })
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
    padding-top: 1px;
  }
  .item{
    margin-top: 8px;
  }
</style>
