<template>
  <div class="my-promotion">
    <SlideRender v-if="templateList.length > 0" :templateList="templateList"></SlideRender>
  </div>
</template>

<script>
  import SlideRender from '@/components/mallindex/common/SlideRender'
  import {getShareList} from "../../http/getData";
  import * as Constants from '../../custom/constants'
  import {getLocalStorage} from "../../custom/mixin";
    export default {
        name: "MyPromotion",
      data(){
          return {
            templateList:[],
            token:''
          }
      },
      created(){
        let tk = getLocalStorage(Constants.TOKEN)
        this.token = tk
        getShareList({
          token: tk
        }).then(response=>{
          response.result.map(item=>{
            this.templateList.push(item)
          })
        })
      },
      components: {
        SlideRender,
      }
    }
</script>

<style scoped>
.my-promotion{
  height: 80vh;
  width: 100vw;
  overflow: hidden;
}
</style>
