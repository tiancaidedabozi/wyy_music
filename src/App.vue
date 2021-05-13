<template>
  <div class="container clearfix">
   
    <topbar></topbar>

    <recommend></recommend>
    
    <main-content></main-content>

    <bottombar></bottombar>
  </div>
</template>

<script>
import TopBar from './components/topbar/TopBar.vue'
import Recommend from './components/content/Recommend.vue'
import MainContent from './components/content/MainContent.vue'
import BottomBar from './components/bottomBar/BottomBar.vue'
export default {
  components: {
    topbar: TopBar,
    recommend: Recommend,
    MainContent: MainContent,
    bottombar: BottomBar
  }
};
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
  min-width: 1015px;
  padding: 50px 0;
}

</style>