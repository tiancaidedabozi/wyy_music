<template>
  <div class="singer">
    <overlay-scrollbars
      :options="{ scrollbars: { autoHide: 'never' }, className:'bars', nativeScrollbarsOverlaid:{showNativeScrollbars:true} }"
      :extensions="['extensionA', 'extensionB']"
    >
      <!-- <scroll :data="singers"> -->
      <ul class="sisnger-list">
        <li v-for="(item,index) in singers" :key="index">
          <img class="picture" :src="item.img1v1Url" alt />
          <div class="artist">
            <p class="name">
              <span v-text="item.name"></span>
              <span>{{ item.alias | alias }}</span>
            </p>
          </div>
          <img v-show="item.accountId" class="accountId" src="@/assets/images/artist.svg" alt />
        </li>
      </ul>
      <!-- </scroll> -->
    </overlay-scrollbars>
    <el-pagination
      @prev-click="currentChange"
      @next-click="currentChange"
      @current-change="currentChange"
      background
      layout="prev, pager, next"
      :total="artistCount"
      :small="true"
      :page-size="20"
      :pager-count="5"
    ></el-pagination>
  </div>
</template>

<script>
import Scroll from '@/components/common/Scroll.vue';
import { searchSingles } from '@/network/search.js';
export default {
  components: {
    Scroll,
  },
  data() {
    return {
      singers: [],
      artistCount: 0,
      limit: 0,
      page: 0,
    };
  },
  methods: {
    /**获取歌手列表 */
    searchSinger(page = 1, limit = 20) {
      let searchWord = this.$route.params.searchWord;
      searchSingles(searchWord, page, limit, 100).then((res) => {
        if (res.status == 200 && res.statusText == 'OK') {
          this.singers = res.data.result.artists;
          this.artistCount = res.data.result.artistCount;
          this.page = Math.ceil(this.artistCount / 20);
          this.limit = this.artistCount - (this.page - 1) * 20;
        }
      });
    },

    currentChange(index) {
      if (index == this.page) {
        this.searchSinger(index, this.limit);
      } else {
        this.searchSinger(index);
      }
    },
  },
  filters: {
    alias(data) {
      if (data.length == 0) return;
      let alias = '(';
      data.forEach((item, index) => {
        if (index == data.length - 1) {
          alias += `${item})`;
        } else {
          alias += item;
        }
      });
      return alias;
    },
  },
  mounted() {
    this.searchSinger();
  },
};
</script>

<style lang="less" scoped>
.singer {
  height: calc(100% - 101px);
  padding-top: 1px;
  padding-bottom: 26px;
  /deep/.el-pagination {
    display: flex;
    justify-content: center;
  }
  .sisnger-list {
    width: 100%;
    li {
      width: 100%;
      height: 60px;
      color: #dcdde4;
      padding: 10px 30px;
      display: flex;
      align-items: center;
      cursor: pointer;
      .picture {
        display: block;
        width: 40px;
        height: 40px;
      }
      .artist {
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
      }
      .accountId {
        display: block;
        width: 15px;
        height: 15px;
        padding: 2px;
        margin-left: 7px;
        border: 1px solid #c62f2f;
        border-radius: 50%;
      }
    }
    li:nth-child(odd) {
      background-color: #1a1c20;
    }
    li:nth-child(even) {
      background-color: #16181c;
    }
    li:hover {
      background-color: #2c2e32;
    }
  }
}
.bars {
  height: 100%;
}
</style>