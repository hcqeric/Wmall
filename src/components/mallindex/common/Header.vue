<template>
  <div class="header">
    <div class="searchbox">
      <i class="mintui mintui-search" v-show="visible"></i>
      <input  @click="visible = true"  :placeholder="visible ? '输入搜索内容' : ''">
      <span v-show="!visible"><i class="mintui mintui-search"></i>搜索</span>
    </div>
    <a href="#" class="searchbar-cancel" @click="visible = false" v-show="visible">取消</a>
    </div>
</template>

<script>
    export default {
      name: "Header",
      data(){
        return {
          visible: false
        }
      }
    }
</script>

<style scoped>
  .header{
    display: flex;
    align-items: center;
    flex-direction: row;
    background-color: #bf54f9;
    padding: 12px 40px;
  }
  .searchbox{
    background-color: #fff;
    border-radius: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 22px;
    padding: 4px 6px;
    position: relative;
  }
  .searchbox i{
    font-size: 14px;
    color: #999;
    margin-right: 8px;
  }
  .searchbox input{
    border: none;
    background-color: #fff;
    flex: 1;
    outline:none;
  }
  .searchbox span{
    position: absolute;
    display: flex;
    align-items: center;
    color: #999;
    font-size: 12px;
  }
  .searchbox span i{
    margin-right: 8px;
    font-size: 14px;
    color: #999;
  }
  .searchbar-cancel{
     color: #fff;
     margin-left: 10px;
     text-decoration: none;
   }
</style>
