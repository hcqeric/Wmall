<template>
    <div class="container">
      <mt-header fixed :title="title">
        <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
      </mt-header>
      <div class="content">
        <!--品牌介绍-->
        <div class="brand-intro" v-if="arrIndex == 0">
          <h3>【品牌名称】</h3>
          <p class="need-indent">玖你美</p>
          <h3>【品牌释义】</h3>
          <p class="need-indent">《诗·卫风·木瓜》:"投我以木李，报之以琼玖“，买玖你美的产品，会回馈于你似玉的皮肤。</p>
          <p class="need-indent">九是一个中国汉字，读音为jiǔ，大写为“玖”。在古代九被认为是最大的数字，泛指多次或多数。现在九在个位数中是最大的正整数，玖代表最好的含义。</p>
          <p class="need-indent">美 měi，会意字。金文字形，从羊，从大。美，不仅要表面美，还要心灵美，这样才算真正的美。通常指使人感到心情愉悦的人或者事物。</p>
          <p class="need-indent">玖你美，顾名思义：让您由内而外，越来越美！</p>
          <h3>【品牌简介】</h3>
          <p class="need-indent">“玖你美”是美智实业有限公司历经四年精雕细琢打造出的高端美业奢侈品品牌，共有五大系列产品：多效调肤面膜系列、家居调肤修护系列（调肤水+调肤精华+调肤霜）、修护神器系列（修护原液+修护乳液）、亲肤遮瑕BB霜、安全无刺激卸妆喷雾组合、亲肤洁面慕斯 。</p>
          <h3>【品牌文化】</h3>
          <p class="need-indent">人生如树，以根为本。“君子务本，本立而道生，孝悌也者其为仁之本与”。</p>
          <p class="need-indent">美智实业秉承着“孝”与“善”的中国传统美德，回顾自己十多年以来的发展历程，带着一颗感恩的心，用自己的实际行动回报大家，回馈社会。</p>
          <p class="need-indent">“连根养根”是美智实业的核心品牌文化，是每一位美智人的行动坐标与经营理念。《孝经》云：德之本在孝。我们每个人的身心都是从父母那里得来的，父母的身心又都是从祖先那里继承而来的，祖先的一切归根结底都是大自然所恩赐的！所以我们所说的孝不仅仅是取悦父母孝敬父母，也是要敬重祖先，敬重大自然，敬天爱物，敬天爱人！这就是连根养根，根深而叶茂！当我们做到取悦父母，恭敬祖先，尊重大自然的时候，我们同样也会尊重客户取悦客户珍惜客户，这就是连根养根的时候，自然就会枝繁叶茂，并有勇气完成自己的责任和使命。</p>
          <h3>【品牌价值观】</h3>
          <p class="need-indent">尽善尽美，精雕细琢，精益求精</p>
          <h3>【品牌理念】</h3>
          <p class="need-indent">美力创造未来，智慧守护初心。</p>
          <p class="need-indent">真正的美是由内而外的。人的美在神韵，神韵是修养的外在气质，由心至身的流露。美智实业在关注女性肌肤的同时，同样注重女性的饮食健康与内在调理。让女性的美由内而外，自然散发，魅力十足。</p>
          <p class="need-indent">玖你美坚持专业、美丽、高雅的品牌定位，旨在通过玖你美产品解决广大女性的肌肤问题，让每一位女性重拾素颜之美的自信，如花朵般真实、美丽、绽放。坚持展现真我，散发自信光彩，不懈追求美丽，掌握人生命运。</p>
          <p class="need-indent">玖你美倡导女性在面对肌肤问题时，不再是用浓厚的彩妆去遮盖，而是敢于直视并积极有效的解决，重塑健康自然的素颜肌肤状态，这不仅是自我肌肤的保养态度，更是一种精致美丽的人生哲学。</p>
          <h3>【品牌宣言】</h3>
          <p class="need-indent">多效解决广大女性的肌肤问题，让每一位女性重拾素颜之美的自信。使每一位用户都能实现美丽重塑、健康生活。</p>
          <h3>【品牌愿景】</h3>
          <p class="need-indent">创造中国自主美业高端奢侈品品牌，。让“玖你美”系列美容美肤产品屹立国际美业舞台，誉满全世界！</p>
        </div>

        <!--科研实力-->
        <div class="brand-intro" v-if="arrIndex == 2">
          <p class="need-indent">美智产品研发部设置在中国的化妆品之都-广州。公司拥有强大的高科技小分子美容产品的研发实力，包含生物物理科学、产品开发、顾客评估、管制事务和工序开发等部门，并聚集了一批国际级别的的科学研究者、中药世家的美容医学专家，为公司产品线的不断优化与创新建立科学的系统。</p>
          <p class="need-indent">美智深入调查了女性的皮肤需求，分析她们的护肤习惯。通过这些方法，美智不断追求卓越，提高服务质量，并不断开发更有效的产品。美智的每一款产品配方都在不同环境、不同肤质、不同需求的女性身上经过测试，确保能够达到良好的效果和市场反馈后，才开始量产。美智初心不变，坚持以匠人精神打造产品，立志打造出属于中国美业自己的奢侈品品牌，让“中国制造”洒满全世界。</p>
        </div>

        <!--公司介绍-->
        <div class="brand-intro" v-if="arrIndex == 3">
          <p class="need-indent">河南美智实业有限公司致力于打造系统化的美业生态链。用匠人精神精雕细琢打造出一系列具有核心竞争力的美容护肤品、日化品、女性用品。美智以“美力创造未来，智慧守护初心”为宗旨，以教育培训为中心，以“孝”文化为根基，秉承“内外兼修”理念，让所有走入美智的家人都能开心工作、快乐生活。从而达到身心灵的富足，以内心富足吸引外来财富。公司所处经济发展核心地带，办公环境舒适，现拥有一批精干的管理人员和一支高素质的专业技术队伍，其前身为“中宏”美业成立于2004年，经过十几年的发展，已拥有美容连锁店面，电子商务公司和商贸公司并拥有多个独立品牌和核心产品，正在向全国辐射并开始向国际延伸。</p>
          <p class="need-indent"><strong>公司使命：</strong>帮助每一位走进美智平台的家人都能实现“身心健康、财务自由”</p>
          <p class="need-indent"><strong>公司愿景：</strong>成为民族品牌，登上世界舞台。让“中国制造”洒满全世界。</p>
          <p class="need-indent"><strong>价值观：</strong>连根养根、孝、善、付出、责任、感恩。</p>
        </div>

        <!-- 精彩视频-->
        <div class="player" v-if="arrIndex == 4">
          <video-player class="mvideo vjs-custom-skin"
                        :options="playerOptions"
                        :playsinline="true"
                        @ready="playerReadied($event)"></video-player>
        </div>

        <!-- 产品介绍 -->
        <div class="brand-intro" v-if="arrIndex == 6">
          <h3>【产品特性】</h3>
          <p class="need-indent">玖你美美容系列产品具有以下五种品牌特性。</p>
          <p class="need-indent">(1).简单：远行、旅游、出差，不用带多个解决皮肤问题的化妆品。轻松方便，给您的行李箱减负，满足十大人性驱动力的懒惰心理。</p>
          <p class="need-indent">(2) .多效：现代医学表明女性的肌肤至少存在三种以上的问题。例如出油、暗沉、干燥、细纹等等，多效的品牌特性就是一款产品能够解决多种肌肤问题。</p>
          <p class="need-indent">(3).安全：不含任何有害的化学制剂和防腐剂，不含铅汞激素等有害成分，纯植物萃取，纯天然中药秘制，就算皮肤有小伤口也可直接使用</p>
          <p class="need-indent">(4).调肤：美肤先调肤，彻底清洁肌肤老化角质层，任何抵抗在它面前都会瓦解，弥补初步洁肤的不足，为皮肤更好的吸收润肤用品做准备。</p>
          <p class="need-indent">(5).修护：提升肌肤水润修复,稳住水肌底。滤净屏障科技,抵御侵害,修护污染、换季、敏感导致的干燥暗哑。</p>
          <h3>【玖你美•多效调肤面膜】</h3>
          <p class="need-indent">适用于任何肌肤，深层补水，促进代谢，细致毛孔，净白淡斑，修护调肤，弹嫩丰盈，抚淡细纹，温和无刺激，平衡皮肤表层PH值，使皮肤恢复正常的生理环境，全效调肤嫩肤使肌肤焕发光彩犹如新生</p>
          <p class="need-indent">成分： 水、丁二醇、甘油聚醚-26、甘油、甘油聚甲基丙烯酸酯、丙二醇、PVM/MA 共聚物乙酯、北美金缕梅（HAMAMELIS VIRGINIANA）提取物、β-葡聚糖、绿豆（PHASEOLUS RADIATUS）提取物、乳酸杆菌发酵产物、橙皮苷甲基查尔酮、锦葵（MALVA SINENSIS）提取物、欧洲七叶树（AESCULUS HIPPOCASTANUM）籽提取物、北美金缕梅（HAMAMELIS VIRGINIANA）叶提取物、假叶树（RUSCUS ACULEATUS）根提取物、山金车（ARNICA MONTANA）花提取物、黄原胶、甘草酸二钾、岩藻糖、、寡肽-1、芦苇（PHRAGMITES COMMUNIS）提取物、甘草（GLYCYRRHIZA URALENSIS）根提取物、当归（ANGELICA POLYMORPHA SINENSIS）根提取物、丹参（SALVIA MILTIORRHIZA）根提取物、山茱萸（CORNUS OFFICINALIS）果提取物、枸杞（LYCIUM CHINENSE）根提取物、尿囊素、EDTA 二钠</p>
          <p class="need-indent">功效： 蕴含多种植物萃取精华及六味中药配方，为肌肤提供密集水分和营养，柔软角质层，臻白、舒缓、修护肌肤、改善粗糙、无光泽肌肤，使皮肤光滑，弹润有光泽！</p>
          <p class="need-indent">使用方法:洁面后，取出面膜，将珍珠保护膜揭掉，将面膜展开敷于脸部，调整面膜至完全贴合脸部，手指轻按挤出多余气泡，静静等待15-20分钟，取下面膜，按摩令剩余精华吸收。</p>
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
        name: "产品介绍"
      },
      {
        name: "美智学院"
      },{
        name: "代理风采"
      }
    ]
    export default {
        name: "CompanyIntro",
        data(){
          return {
            title: '',
            arrIndex: -1,
            playerOptions: {
              height: '360',
              sources: [{
                type: "video/mp4",
                src: ""
              }],
              poster: ""
            }
          }
        },
        methods:{
          goBack() {
            this.$router.back()
          },
          playerReadied(player) {
            // console.log('the player is readied', player)
          }
        },
        created(){
          let {id} = this.$route.params
          this.title = arr[id].name
          this.arrIndex = id
          if (id == 4){
            getFileByType({
              type:'video'
            }).then(response=>{
              this.playerOptions.sources[0].src = response.result[0].url
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
    background: #fff;
    overflow: hidden;
  }
  .mint-header{
    background-color: #000;
    height: 48px;
  }
  .content{
    margin-top: 48px;
  }
  .player{
    width: 100%;
    overflow: hidden;
    padding-top: 20px;
  }
  .vjs-custom-skin{
    box-sizing: border-box;
    width: 100%;
  }


  .brand-intro{
    padding: 16px;
  }
  .brand-intro p{
    line-height: 24px;
    font-size: 14px;
  }
  .brand-intro h3{
    margin: 8px;
  }
  .need-indent{
    text-indent: 2em;
  }
</style>
<style>
  .mvideo .video-js.vjs-v6 {
    width: 100%;
    height: 180px;
  }
  /*.copyright{*/
    /*display: flex;*/
    /*margin-top: 40px;*/
    /*flex-direction: column;*/
    /*justify-content: center;*/
    /*align-items: center;*/
  /*}*/
  /*.copyright p{*/
    /*padding: 2px 0;*/
  /*}*/
</style>
