<template>
    <div class="container">
      <mt-header title="彩妆系列">
        <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
        <mt-button slot="right">
          <div class="shopcart">
            <i class="iconfont icon-gouwuche"></i>
            <mt-badge type="error" size="small">10</mt-badge>
          </div>
        </mt-button>
      </mt-header>
      <div class="content">
        <div class="nav-left">
          <div class="nav-list" >
            <div class="nav-item" v-for="n in 10">ANR修护小棕瓶</div>
          </div>
        </div>
        <div class="goods-right">
          <p>ANR修护小棕瓶</p>
          <div class="goods-list">
            <div class="masonry">
              <div class="column">
                <div class="item">
                  <div class="item__content">
                  </div>
                </div> <!-- more items -->
              </div> <div class="column">
              <div class="item">
                <div class="item__content">
                </div>
              </div> <!-- more items -->
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "SortDetail",
    methods: {
      goBack() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
.container{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f6f7f9;
}

.mint-header {
  background-color: #000;
  height: 48px;
}
.content{
  flex: 1;
  display: flex;
  flex-direction: row;
}
.nav-left{
  flex: 2;
  display: flex;
  flex-direction: column;
}
.nav-list{
  flex: 1;
}
.goods-right{
  flex: 8;
  display: flex;
  flex-direction: column;
}

.shopcart {
  position: relative;
}

.shopcart .mint-badge {
  position: absolute;
  top: 20px;
  right: 20px;
}



.masonry {
  display: flex;
  flex-direction: row;
}

.column {
  display: flex;
  flex-direction: column;
  width: calc(100%/2);
}

.item {
  background: #000;
  height: 76px;
  margin: 16px;
}
</style>
