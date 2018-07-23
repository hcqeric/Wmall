<template>
    <div class="container">
      <mt-header :title="title">
        <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
      </mt-header>
      <div class="content">
        <div class="player">
          <video-player class="mvideo vjs-custom-skin"
                        :options="playerOptions"
                        :playsinline="true"
                        @ready="playerReadied($event)"></video-player>
        </div>
        <div class="copyright">
          <p>	Copyright&copy;2018-2019</p>
          <p>由好乐付提供技术支持</p>
        </div>
      </div>
    </div>
</template>

<script>
    import {getFileByType} from "../../http/getData";
    import 'video.js/dist/video-js.css'
    import { videoPlayer } from 'vue-video-player'

    const arr = [
      {
        name: "品牌介绍"
      },
      {
        name: "品牌荣誉"
      },
      {
        name: "科研实力"
      },
      {
        name: "公司资质"
      },{
        name: "精彩视频"
      },
      {
        name: "代理加盟"
      },{
        name: "产品介绍A"
      },
      {
        name: "产品介绍B"
      },{
        name: "代理风采"
      }
    ]
    export default {
        name: "CompanyIntro",
        data(){
          return {
            title: '',
            playerOptions: {
              height: '360',
              sources: [{
                type: "video/mp4",
                src: "http://7xkwa7.media1.z0.glb.clouddn.com/sample_video_L"
              }],
              poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-3.jpg"
            }
          }
        },
        methods:{
          goBack() {
            this.$router.back()
          },
          playerReadied(player) {
            console.log('the player is readied', player)
          }
        },
        created(){
          let {id} = this.$route.params
          this.title = arr[id].name
          if (id == 4){
            getFileByType({
              type:'video'
            }).then(response=>{
              console.log(response)
              console.log(response.result.url)
              this.playerOptions.sources[0].src = response.result[0].url
              console.log(this.playerOptions)
            })
          }
        },
      components: {
        videoPlayer
      }
    }
</script>

<style scoped>
  .container{
    min-height: 100vh;
  }
  .mint-header{
    background-color: #bf54f9;
    height: 48px;
  }
  .content{
    margin-top: 20px;
  }
  .player{
    width: 100%;
    overflow: hidden;
  }
  .vjs-custom-skin{
    box-sizing: border-box;
    width: 100%;
  }
</style>
<style>
  .mvideo .video-js.vjs-v6 {
    width: 100%;
    height: 180px;
  }
  .copyright{
    display: flex;
    margin-top: 40px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .copyright p{
    padding: 2px 0;
  }
</style>
