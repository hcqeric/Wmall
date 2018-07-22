<template>
  <div class="page-tabbar">
    <Home/>
    <Footer></Footer>
  </div>
</template>

<script>
  import Footer from '@/components/mallindex/common/Footer'
  import Home from "@/components/mallindex/Home"

  export default {
    name: 'MallIndex',
    components: {
      Home,
      Footer
    }
  };
</script>

<style>
  .page-tabbar {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100vh;
  }
  .page-wrap {
    overflow: auto;
    flex: 1;
    margin-bottom: 50px;
  }
</style>
