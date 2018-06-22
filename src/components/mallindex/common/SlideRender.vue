<template>
  <div class="slide-render-view">
    <div class="slide-wrapper">
      <div class="slide-content">
        <slide ref="slide" :autoPlay="isAutoPlay" :loop="isLoop" :showDot="isShowDot" :interval="interval" :threshold="threshold" :speed="speed">
          <div v-for="item in data">
            <a :href="item.linkUrl">
              <img :src="item.picUrl">
            </a>
          </div>
        </slide>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Slide from '@/components/mallindex/common/Slide'
  const items = [
    [
      {
        linkUrl: 'http://y.qq.com/w/album.html?albummid=0044K2vN1sT5mE',
        picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000001YCZlY3aBifi.jpg',
        id: 11351
      },
      {
        linkUrl: 'https://y.qq.com/m/digitalbum/gold/index.html?_video=true&id=2197820&g_f=shoujijiaodian',
        picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000004ckGfg3zaho0.jpg',
        id: 11372
      },
      {
        linkUrl: 'http://y.qq.com/w/album.html?albummid=001tftZs2RX1Qz',
        picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M00000236sfA406cmk.jpg',
        id: 11378
      }
    ],
    [
      {
        linkUrl: 'http://y.qq.com/w/album.html?albummid=001tftZs2RX1Qz',
        picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M00000236sfA406cmk.jpg',
        id: 11378
      },
      {
        linkUrl: 'https://y.qq.com/msa/218/0_4085.html',
        picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000001s0BXx3Zxcwb.jpg',
        id: 11375
      },
      {
        linkUrl: 'https://y.qq.com/m/digitalbum/gold/index.html?_video=true&id=2195876&g_f=shoujijiaodian',
        picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000002cwng4353HKz.jpg',
        id: 11287
      }
    ]
  ]
  export default {
    name: 'SlideRender',
    computed: {
      data() {
        return items[this.index]
      }
    },
    data() {
      return {
        index: 0,
        turnToPrev: false,
        turnToNext: false,
        isAutoPlay: false,
        isLoop: false,
        isShowDot: true,
        speed: 400,
        threshold: 0.3,
        interval: 4000
      }
    },
    methods: {
      changeData() {
        this.index = (this.index + 1) % 2
        this.turnToPrev = false
        this.turnToNext = false
      },
      updateAutoPlay(val) {
        this.isAutoPlay = val
      },
      updateInterval(val) {
        if (val) {
          this.interval = +val
        }
      },
      updateLoop(val) {
        this.isLoop = val
      },
      updateShowDot(val) {
        this.isShowDot = val
      },
      turnToPrevFun() {
        if (!this.$refs.slide.slide.isInTransition) {
          this.turnTo(1)
          this.$refs.slide.prev()
        }
      },
      turnToNextFun() {
        if (!this.$refs.slide.slide.isInTransition) {
          this.turnTo(2)
          this.$refs.slide.next()
        }
      },
      turnTo(index) {
        index === 1 ? this.turnToPrev = true : this.turnToPrev = false
        index === 2 ? this.turnToNext = true : this.turnToNext = false
      },
      updateThreshold(val) {
        if (val) {
          this.threshold = +val
        }
      },
      updateSpeed(val) {
        if (val) {
          this.speed = +val
        }
      }
    },
    watch: {
      index() {
        this.$refs.slide.update()
      }
    },
    components: {
      Slide
    }
  }
</script>

<style scoped>

  .slide-render-view .slide-wrapper {
    position: relative;
    width: 100%;
    padding-top: 40%;
    margin-bottom: 10px;
    overflow: hidden;

  }
  .slide-render-view .slide-wrapper .slide-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
