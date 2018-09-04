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
    display: flex;
    flex-direction: column;
  }
  .page-wrap {
    overflow: auto;
    flex: 1;
    margin-bottom: 50px;
  }
</style>

