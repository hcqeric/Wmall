<template>
  <div class="page-infinite">
    <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <ul class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
        <li v-for="item in list" class="page-infinite-listitem">
          <div class="news-item">
            <img src="http://y.gtimg.cn/music/photo_new/T003R720x288M000001YCZlY3aBifi.jpg" alt="">
            <p>无硫酸盐洗护用品全国首发！震撼上市！</p>
          </div>
        </li>
      </ul>
      <p v-show="loading" class="page-infinite-loading">
        <mt-spinner type="fading-circle"></mt-spinner>
        加载中...
      </p>
    </div>
  </div>
</template>

<script>



    export default {
      name: "News",
      data(){
          return {
            list:[],
            loading: false,
            allLoaded: false,
            wrapperHeight: 0
          }
      },
      mounted(){
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        for (let i = 1; i <= 5; i++) {
          this.list.push(i);
        }
      },
      methods:{
        loadMore() {
          this.loading = true;
          setTimeout(() => {
            let last = this.list[this.list.length - 1];
            for (let i = 1; i <= 5; i++) {
              this.list.push(last + i);
            }
            this.loading = false;
          }, 2500);
        }
      }

    }
</script>

<style scoped>
  .page-infinite {
    overflow: scroll;
    position: absolute;
    top: 48px;
    bottom: 48px;
    width: 100%;
    background-color: #fff;
  }

  .page-infinite-loading {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #1ABC9C;
    text-align: center;
    padding: 8px 0;
  }

  .page-infinite-loading span {
    display: block;
    text-align: center;
    margin: 0 auto;
  }

  .news-item {
    box-sizing: border-box;
    margin: 0 24px;
    padding-top: 16px;
    border-bottom: 1px solid #ccc;
  }

  .news-item img {
    width: 100%;
  }

  .news-item p {
    font-size: 18px;
    color: #666;
    text-align: center;
  }
</style>
