<template>
  <scroll class="play-list" :data="data">
    <song-list
      :data="data"
      :linkOrLoad="'1px'"
      :titleWidth="'200px'"
      :rankWidth="'1px'"
      :albumWidth="'1px'"
    ></song-list>
  </scroll>
</template>

<script>
import Scroll from '@/components/common/Scroll.vue';
import SongList from '@/components/common/SongsList.vue';
export default {
  components: {
    SongList,
    Scroll,
  },
  props: {
    data: {
      type: Array,
      default: null,
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.play-list {
  width: 100%;
  height: calc(100% - 33px);
}
</style>