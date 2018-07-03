<template>
  <div class="page-tabbar">
    <div class="page-wrap">
      <ShopCart/>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Footer from '@/components/mallindex/common/Footer'
  import ShopCart from "@/components/mallindex/ShopCart"

  export default {
    name: 'CartIndex',
    components: {
      ShopCart,
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


