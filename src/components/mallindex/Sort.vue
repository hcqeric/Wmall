<template>
  <div>
    <Header/>
    <ul>
      <li v-for="item in list" class="sort-item">
        <img  v-lazy="item.url" />
        <div class="serial"><span>{{item.name}}</span></div>
      </li>
    </ul>
  </div>

</template>

<script>
    import Header from "@/components/mallindex/common/Header"
    import url from '../../http/url.js'
    import * as Constants from '../../custom/constants'
    export default {
        name: "Sort",
      data(){
          return {
            list: []
          }
      },
      mounted(){
        // this.list = [
        //   'http://p90m90efq.bkt.clouddn.com/goods-banner.png',
        //   'http://p90m90efq.bkt.clouddn.com/goods-banner.png',
        //   'http://p90m90efq.bkt.clouddn.com/goods-banner.png'
        // ]
        let tk = localStorage.getItem(Constants.TOKEN)
        this.axios.get(url.sort, {
          params: {
            token: tk
          }
        }).then( response=> {
          console.log(response)
          if (response.data.code == 0){
            let imgs = response.data.result
            imgs.forEach((item)=>{
              this.list.push(item)
            })
          }else if(response.data.code == 500){
            Toast(response.data.msg);
          }

        }).catch(function (error) {
          console.log(error);
        });

      },
      components:{
          Header
      }
    }
</script>

<style scoped>
  .sort-item{
    margin-top: 8px;
    position: relative;
    display: block;
  }
  .serial{
    position: absolute;
    padding: 4px 26px 4px 30px;
    right: 0;
    top: 0;
    color: #fff;
    background-image: url("../../assets/img/sorttag.png");
    background-repeat: no-repeat;
    background-size: cover;
  }
  img{
    width: 100%;
    display: block;
  }
</style>
