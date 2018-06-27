<template>
  <div class="container">
    <mt-header fixed title="系统通知">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="content">
      <NoticeCard v-for="n in 3" :key="n" class="item"></NoticeCard>
    </div>
  </div>
</template>

<script>
  import NoticeCard from '@/components/view/NoticeCard'
    export default {
        name: "SystemNotice",
      methods: {
        goBack() {
          this.$router.back()
        }
      },
      components:{
          NoticeCard
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
