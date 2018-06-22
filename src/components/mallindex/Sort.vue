<template>
  <div>
    <Header/>
    <ul>
      <li v-for="item in list">
        <img  v-lazy="item" />
      </li>
    </ul>
  </div>

</template>

<script>
    import Header from "@/components/mallindex/common/Header"
    export default {
        name: "Sort",
      data(){
          return {
            list: []
          }
      },
      mounted(){
        this.list = [
          'http://p90m90efq.bkt.clouddn.com/sort1.PNG',
          'http://p90m90efq.bkt.clouddn.com/sort1.PNG',
          'http://p90m90efq.bkt.clouddn.com/sort1.PNG'
        ]
      },
      components:{
          Header
      }
    }
</script>

<style scoped>

</style>
