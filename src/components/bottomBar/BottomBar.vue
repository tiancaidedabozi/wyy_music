<template>
  <div class="footer">
    <fly-music :playList="playList" :songObj="songObj"></fly-music>
  </div>
</template>

<script>
import FlyMusic from './buttomBarChild/FlyMusic.vue';
export default {
  components: {
    FlyMusic: FlyMusic,
  },
  data() {
    return {
      playList: [], //即将播放的歌单
      songObj: {}, //即将播放的歌曲
    };
  },
  computed: {
    playMusicListf() {
      return this.$store.state.playList;
    },
    songObjStore() {
      return this.$store.state.songObj;
    },
  },
  watch: {
    playMusicListf() {
      this.playList = this.playMusicListf;
    },
    songObjStore() {
      this.songObj = this.songObjStore;
    },
  },
};
</script>

<style lang="less" scoped>
.footer {
  width: 100%;
  height: 50px;
  min-width: 1015px;
  background-color: #2e2e2e;
  position: fixed;
  left: 0;
  bottom: 0;
}
</style>