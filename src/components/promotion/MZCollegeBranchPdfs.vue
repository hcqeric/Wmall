<template>
  <div class="pdf-container">
    <mt-header fixed :title="title">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="pdf-content" v-show="pageCount > 0">
      <div>
        <pdf
          :src="src"
          :page="currentPage"
          @num-pages="pageCount = $event"
        ></pdf>
      </div>
      <div class="pdf-pages">
        <button @click="pageUp">上一页</button>
        <div class="pdf-page-show">
        <input v-model.number="currentPage" type="number" style="width: 2em" @input="handleInput" @focus="handlefocus" @blur="handleBlur"><span> /{{pageCount}}</span>
        </div>
        <button @click="pageDown">下一页</button>
      </div>
    </div>
  </div>
</template>

<script>
  import pdf from 'vue-pdf'

  const arr = [
    {
      name: "财商"
    },
    {
      name: "个人形象管理与形象设计"
    },
    {
      name: "茶艺冲泡流程"
    },
    {
      name: "商业模式概述"
    },
    {
      name: "教练技术"
    },
    {
      name: "心理咨询的基本方法与注意事项"
    }
  ]
    export default {
      name: "MZCollegeBranchPdfs",
      components: {
        pdf
      },
      methods: {
        goBack() {
          this.$router.back()
        },
        pageUp(){
          if (this.currentPage <= 1){
            this.currentPage = 1
            return false
          }
          this.currentPage--
        },
        pageDown(){
          if (this.currentPage >= this.pageCount){
            this.currentPage = this.pageCount
            return false
          }
          this.currentPage++
        },
        handleInput(){
          if (this.currentPage == '' || this.currentPage < 1) {
            this.currentPage = this.focusPageNum
          }else if(this.currentPage >= this.pageCount){
            this.currentPage = this.pageCount
          }
        },
        handlefocus(){
          if(this.isFirstFocus){
            this.focusPageNum = this.currentPage
            this.isFirstFocus = false
          }
        },
        handleBlur() {
          if (this.currentPage == '' || this.currentPage < 1) {
            this.currentPage = this.focusPageNum
          }
        }
      },
      data(){
          return {
            currentPage: 1,
            pageCount: 0,
            isFirstFocus: true,
            focusPageNum: 1,
            title: '',
            arrIndex: -1,
            src: '',
            numPages: undefined,
          }
      },
      mounted() {
        let {id} = this.$route.params
        this.title = arr[id].name
        this.arrIndex = id
        let loadingTask = ''
        if (this.arrIndex == 0){    //财商
          loadingTask = pdf.createLoadingTask('http://mezhizp.com/download/%E8%B4%A2%E5%95%86.pdf')
        }else if (this.arrIndex == 1) {   //个人形象管理与形象设计
          loadingTask = pdf.createLoadingTask('http://mezhizp.com/download/%E4%B8%AA%E4%BA%BA%E5%BD%A2%E8%B1%A1%E7%AE%A1%E7%90%86%E4%B8%8E%E5%BD%A2%E8%B1%A1%E8%AE%BE%E8%AE%A1.pdf')
        }else if(this.arrIndex == 2){   //茶艺冲泡流程
          loadingTask = pdf.createLoadingTask('http://mezhizp.com/download/%E8%8C%B6%E8%89%BA%E5%86%B2%E6%B3%A1%E6%B5%81%E7%A8%8B.pdf')
        }else if (this.arrIndex == 3){     //商业模式概述
          loadingTask = pdf.createLoadingTask('http://mezhizp.com/download/%E5%95%86%E4%B8%9A%E6%A8%A1%E5%BC%8F%E6%A6%82%E8%BF%B0.pdf')
        }else if (this.arrIndex == 4){      //教练技术
          loadingTask = pdf.createLoadingTask('http://mezhizp.com/download/%E6%95%99%E7%BB%83%E6%8A%80%E6%9C%AF.pdf')
        }else if (this.arrIndex == 5){      //心理咨询的基本方法与注意事项
          loadingTask = pdf.createLoadingTask('http://mezhizp.com/download/%E5%BF%83%E7%90%86%E5%92%A8%E8%AF%A2%E7%9A%84%E5%9F%BA%E6%9C%AC%E6%96%B9%E6%B3%95%E4%B8%8E%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9.pdf')
        }
        this.src = loadingTask
        // this.src.then(pdf => {
        //   this.numPages = pdf.numPages;
        // });
      }
    }
</script>

<style scoped>
  .pdf-container {
    min-height: 100vh;
    background: #fff;
    position: relative;
  }

  .mint-header {
    background-color: #000;
    height: 48px;
  }

  .pdf-content {
   position: absolute;
    width: 100vw;
    top: 58px;
    bottom: 0;
    left: 0;
  }
  .pdf-pages{
    margin-top: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
  .pdf-pages>button{

    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;
    background-color: transparent;
    background-image: url("../../assets/img/bg-jianbian.png");
    background-repeat: no-repeat;
    background-size: contain;
    height: 35px;
    line-height: 35px;
    border-radius: 17px;

    color: #fff;
    width: 115px;
    font-size: 14px;
  }
  .pdf-page-show>span{
    font-size: 14px;
  }
</style>
