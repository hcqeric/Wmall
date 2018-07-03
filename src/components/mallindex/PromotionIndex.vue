<template>
  <div class="page-tabbar">
    <div class="page-wrap">
      <Promotion/>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Footer from '@/components/mallindex/common/Footer'
  import Promotion from "@/components/mallindex/Promotion"

  export default {
    name: 'PromotionIndex',
    components: {
      Promotion,
      Footer
    }
  };
</script>

<style>
  .page-tabbar {
    overflow: hidden;
    height: 100vh;
  }
  .page-wrap {
    overflow: auto;
    height: 100%;
    padding-bottom: 200px;
  }
</style>

