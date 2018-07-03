<template>
  <div class="page-tabbar">
    <div class="page-wrap">
      <UserCenter/>
    </div>
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
    height: 100vh;
  }
  .page-wrap {
    overflow: auto;
    height: 100%;
    padding-bottom: 200px;
  }
</style>



