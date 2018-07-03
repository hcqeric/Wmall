<template>
  <div class="page-tabbar">
    <div class="page-wrap">
      <Sort/>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Footer from '@/components/mallindex/common/Footer'
  import Sort from "@/components/mallindex/Sort"

  export default {
    name: 'SortIndex',
    components: {
      Sort,
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

