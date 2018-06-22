<template>
  <div class="header">
    <div class="searchbox">
      <button  @click="visible = true">
          <i class="mintui mintui-search"></i>
          搜索
      </button>
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
    background-color: #1ABC9C;
    padding: 8px 40px;
  }
  .searchbox{
    background-color: #fff;
    border-radius: 18px;
    display: flex;
    justify-content: center;
    flex: 1;
    height: 28px;
    padding: 4px 6px;
  }
  .searchbox button{
    border: none;
    background-color: #fff;
    outline:none;
  }

  .searchbar-cancel{
     /*color: #1ABC9C;*/
     color: #fff;
     margin-left: 10px;
     text-decoration: none;
   }
</style>
