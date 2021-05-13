<template>
  <div class="singles">
    <el-table
      :data="tableData"
      height="92%"
      stripe
      style="width: 100%"
      @row-dblclick="playMusic"
      show-overflow-tooltip
    >
      <el-table-column prop="rank" label width="50px"></el-table-column>
      <el-table-column prop="linkOrLoad" label="操作" width="60px">
        <img src="@/assets/images/search/like.svg" alt />
        <img src="@/assets/images/search/download.svg" alt />
      </el-table-column>
      <el-table-column prop="title" label="音乐标题" width="330px"></el-table-column>
      <el-table-column prop="singer" label="歌手"></el-table-column>
      <el-table-column prop="album" label="专辑"></el-table-column>
      <el-table-column prop="time" label="时长"></el-table-column>
      <el-table-column prop="id" label width="1"></el-table-column>
      <el-table-column prop="img1v1Url" label width="1"></el-table-column>
    </el-table>
    <el-pagination
      @current-change="creentPage"
      small
      :pager-count="5"
      :page-size="100"
      background
      layout="prev, pager, next"
      :total="$store.state.songCount"
    ></el-pagination>
  </div>
</template>

<script>
import { searchSingles, getMusicUrl, getLyric } from "@/network/search.js";
import { formatSingles } from "@/common/dataFormat.js";
export default {
  data() {
    return {
      tableData: [],
      limit: 100,
      searchWord: "",
    };
  },
  methods: {
    //通过用户输入词搜索单曲
    searchSingles() {
      this.searchWord = this.$route.params.searchWord;
      searchSingles(this.searchWord).then((res) => {
        if (res.status === 200 && res.statusText === "OK") {
          this.$store.commit("addSongCount", res.data.result.songCount);
          let songs = res.data.result.songs;
          this.$store.commit("addTableData", formatSingles(songs));
          this.pageSize = Math.ceil(this.$store.state.songCount);
        }
      });
    },
    /**分页搜索 */
    creentPage(val) {
      if (val === Math.ceil(this.$store.state.songCount / 100)) {
        this.limit = this.$store.state.songCount - (val - 1) * 100;
      }
      searchSingles(this.searchWord, val, this.limit).then((res) => {
        if (res.status === 200 && res.statusText === "OK") {
          let songs = res.data.result.songs;
          this.$store.commit("addTableData", formatSingles(songs));
        }
      });
    },

    /**双击播放音乐,实质是添加到了状态管理中，通过侦听播放 */
    playMusic(row, column, event) {
      //判断歌曲是否已经存在播放列表
      for (let i = 0; i < this.$store.state.playList.length; i++) {
        if (this.$store.state.playList[i].id == row.id) {
          this.$message({
            showClose: true,
            message: "当前歌曲已存在",
            type: "warning",
            customClass: "messageStyle",
            center: true,
            offset: 50,
          });
          return;
        }
      }
      //为了让播放器更加独立可复用，歌词也在这里获取之后再保存到状态管理中
      getLyric(row.id).then((res) => {
        if (res.status === 200 && res.statusText === "OK") {
          row.lyric = res.data.lrc.lyric;
        }
      });
      getMusicUrl([row.id]).then((res) => {
        if (res.status === 200 && res.statusText === "OK") {
          res.data.data.forEach((item) => {
            row.url = item.url;
            this.$store.commit("addSingle", row);
            this.$store.commit("addSongObj", row);
          });
        }
      });
    },
  },
  computed: {
    tableDataStore() {
      return this.$store.state.tableData;
    },
  },
  watch: {
    tableDataStore(newVal, oldVal) {
      this.tableData = newVal;
    },
    $route() {
      this.searchSingles();
    },
  },
  mounted() {
    this.searchSingles();
  },
};
</script>

<style lang="less" scoped>
.singles {
  height: calc(100% - 101px);
  /deep/.el-table {
    height: 100%;
    width: 100%;
    background-color: #16181c;
  }
  /deep/.el-table th {
    padding: 0;
    border-right: 2px solid #23262c;
    border-bottom: 2px solid #23262c;
    background-color: #16181c;
  }
  /deep/.el-table td,
  .el-table th {
    padding: 0;
  }
  /deep/.el-table .cell {
    font-size: 12px;
    line-height: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  /deep/.el-table .cell > img {
    width: 20px;
  }
  /deep/.el-table__row > td:nth-child(1) > div {
    text-align: center;
  }
  /deep/.el-table__row > td:nth-child(3) > div {
    color: #dcdde4;
  }
  /deep/.el-table__row > td:nth-child(1) > div > img {
    height: 15px;
  }
  /deep/.el-table__row > td:nth-child(7) {
    overflow: hidden;
  }
  /deep/ .el-table th > .cell {
    font-weight: 400;
    font-size: 12px;
    line-height: 30px;
  }
  /deep/.el-table td,
  .el-table th.is-leaf {
    border: none;
  }

  /deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {
    background: #16181c;
  }
  /deep/.el-table tr {
    background: #1a1c20;
    cursor: pointer;
  }
  /deep/.el-table tr > td:nth-child(2) > .cell {
    padding: 0;
    text-align: center;
  }
  /deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #2c2e32;
  }
  /deep/.el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    background-color: transparent;
  }
  /deep/.el-pagination {
    text-align: center;
  }
}
</style>