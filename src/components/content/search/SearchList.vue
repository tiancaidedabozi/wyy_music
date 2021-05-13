<template>
  <div class="search-list">
    <div class="resultTips">
      <p>
        搜索与
        <span class="resultTips-text">"{{$store.state.searchWord}}",</span>
        找到
        <span class="resultTips-text">{{$store.state.songCount}}</span>首单曲
      </p>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="单曲" name="/search/singles"></el-tab-pane>
      <el-tab-pane label="歌手" name="/search/singer"></el-tab-pane>
      <el-tab-pane label="专辑" name="/search/album"></el-tab-pane>
      <el-tab-pane label="视频" name="/search/video"></el-tab-pane>
      <el-tab-pane label="歌单" name="/search/songlist"></el-tab-pane>
      <el-tab-pane label="歌词" name="/search/lyric"></el-tab-pane>
      <el-tab-pane label="主播电台" name="/search/anchorstation"></el-tab-pane>
      <el-tab-pane label="用户" name="/search/user"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: '/search/singles',
      // searchWord: ''
    };
  },
  methods: {
    handleClick(tab, event) {
      let searchWord = this.$route.params.searchWord;
      //判断用户是否重复点击标签页，是重复则不做任何操作。
      if (this.$route.path != tab.name) {
        this.$router.push({ path: `${tab.name}/${searchWord}` });
      }
    },
  },
  watch: {
    /**解决了tabs在选中单曲之外的标签再次搜索时选中错误的问题，最终是要还是选会单曲 */
    $route() {
      let url = this.$route.path.trim().split('/');
      this.activeName = `/${url[1]}/${url[2]}`;
    },
  },
};
</script>

<style lang="less" scoped>
.search-list {
  width: 100%;
  height: 100%;
  background-color: #16181c;
  /deep/.el-tabs__nav {
    z-index: 0;
  }
  /deep/.el-tabs__nav-wrap::after {
    z-index: 0;
  }
  /deep/.el-tabs__header {
    margin: 0;
  }
  /deep/.el-loading-mask {
    top: 200px;
  }
  /deep/.el-tabs__nav-scroll {
    padding-left: 45px;
    background-color: #16181c;
    border-bottom: 1px solid #ccc;
    .el-tabs__item {
      height: 36px;
      padding: 0 25px;
      color: #fff;
    }
    .el-tabs__active-bar {
      height: 4px;
      background-color: #c62f2f;
    }
    .el-tabs__item.is-active {
      color: #c62f2f;
    }
  }

  .resultTips {
    color: #fff;
    padding: 25px;
    background-color: #1a1c20;
    .resultTips-text {
      color: #c62f2f;
    }
  }
}
</style>