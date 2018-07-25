<template>
  <div class="sort-container">
    <Header/>
    <ul>
      <li v-for="item in list" class="sort-item" @click="gotoDetail(item)">
        <img  :src="item.url" />
        <div class="serial"><span>{{item.name}}</span></div>
      </li>
    </ul>
  </div>

</template>

<script>
    import Header from "@/components/mallindex/common/Header"
    import {getSorts} from "../../http/getData";
    import { getLocalStorage } from '@/custom/mixin';
    import * as Constants from '../../custom/constants'
    export default {
        name: "Sort",
      data(){
          return {
            list: []
          }
      },
      methods:{
          gotoDetail(item){
            this.$router.push('/serial/'+ item.proId + "/" + item.id + "/" + item.name)
          }
      },
      mounted(){
        let tk = getLocalStorage(Constants.TOKEN)
        getSorts({
            token: tk
        }).then(response=>{
          console.log(response)
          let imgs = response.result
          imgs.forEach((item)=>{
            this.list.push(item)
          })
        })
      },
      components:{
          Header
      }
    }
</script>

<style scoped>
  .sort-container{
    background: #efefef;
  }
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
    height: 200px;
    width: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }
</style>
