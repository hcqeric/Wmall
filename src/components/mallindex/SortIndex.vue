<template>
  <div class="page-tabbar">
    <Sort/>
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
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .page-wrap {
    overflow: auto;
    flex: 1;
    margin-bottom: 50px;
  }
</style>

