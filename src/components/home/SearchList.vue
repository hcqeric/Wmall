<template>
<div class="container">
  <div class="search-header">
    <i @click="back" class="el-icon-back"></i>
    <div class="search">
      <i class="mintui mintui-search"></i>
      <input type="text" v-model="keywords">
    </div>
    <button @click="searchContent" >搜索</button>
  </div>
  <div class="content">
    <RecommendGoods class="goods-item" v-for="n in 5" :goodsInfo="item" />
  </div>
</div>
</template>

<script>
    import RecommendGoods from "@/components/view/RecommendGoods";
    const item = {
      "id": 1,
      "goodsTypeId": 1,
      "proId": 1,
      "goodsNum": 231232131,
      "name": "买肾丸",
      "introduce": "只要998",
      "keywords": "丸",
      "unit": "颗",
      "goodsImg": "fasdsadas.jpg",
      "bdanPrice": 22,
      "sellPrice": 23,
      "repeatPrice": 222,
      "bonusPoints": 1,
      "bonusPrice": 2,
      "clickCount": 333,
      "sellCount": 2222,
      "order": 11,
      "initQty": 222,
      "remainQty": 2222,
      "warningQty": 222,
      "rewardConsumer1": 1,
      "rewardConsumer2": 2,
      "rewardConsumer3": 3,
      "rewardPartner": 11,
      "goodsDetal": "222",
      "status": 1,
      "delFlag": 1,
      "createTime": "2018-06-25 15:14:46",
      "updateTime": "2018-06-25 15:14:46",
      "sowingUrl": [
        "http://fd.topitme.com/d/a8/1d/11315383988791da8do.jpg"
      ],
      "detailsUrl": [
        "http://fd.topitme.com/d/a8/1d/11315383988791da8do.jpg"
      ]
    }
    export default {
      name: "SearchList",
      data(){
        return {
          item: item,
          keywords:''
        }
      },
      methods:{
        back(){
          this.$router.back()
        },
        searchContent(){
          console.log(this.keywords)
        }
      },
      components:{
        RecommendGoods
      }
    }
</script>

<style scoped>
.container{
  min-height: 100vh;
}
.search-header{
  background-color: #bf54f9;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
}
  .search-header i{
    color: #fff;
    font-size:20px;
  }
  .search{
    flex: 1;
    display: flex;
    align-items: center;
    background: #fff;
    height: 26px;
    border-radius: 15px;
    margin: 0 8px;
    padding:0 8px;
  }

.search i {
  color: #999;
  font-size: 16px;
  margin-right: 4px;
}

.search input:focus {
  color: #999;
}

.search input {
  outline: none;
  border: none;
  flex: 1;
  text-shadow: 0px 0px 0px #000;
  -webkit-text-fill-color: transparent;
}

  .search-header button{
    border: none;
    outline: none;
    /*background-image: url("../../assets/img/bg-white.png");*/
    background-color: transparent;
    color: #fff;
  }
</style>
