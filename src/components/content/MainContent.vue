<template>
  <div
    class="main-content"
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    element-loading-text="拼命加载中"
  >
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: '',
    };
  },
  computed: {
    getLoadingFlag: function () {
      return this.$store.state.loading;
    },
  },
  watch: {
    getLoadingFlag: function () {
      this.loading = this.getLoadingFlag;
    },
  },
};
</script>

<style lang="less" scoped>
.main-content {
  overflow: hidden;
  height: 100%;
  /deep/.el-loading-spinner .path {
    stroke: #c62f2f;
  }
  /deep/.el-loading-spinner .el-loading-text {
    color: #c62f2f;
  }
}
</style>