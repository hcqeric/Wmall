<template>
  <div class="page-tabbar">
    <UserCenter/>
    <Footer></Footer>
  </div>
</template>

<script>
  import Footer from '@/components/mallindex/common/Footer'
  import UserCenter from "@/components/mallindex/UserCenter"

  export default {
    name: 'UserIndex',
    components: {
      UserCenter,
      Footer
    }
  };
</script>

<style>
  .page-tabbar {
    overflow: hidden;
  }
  .page-wrap {
    overflow: auto;
    height: 100%;
    padding-bottom: 200px;
  }
</style>



