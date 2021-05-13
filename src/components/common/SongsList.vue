<template>
  <div class="songsList">
    <el-table :data="data" stripe style="width: 100%" row-class-name="table-column">
      <el-table-column prop="rank" label :width="rankWidth"></el-table-column>
      <el-table-column prop="linkOrLoad" label="操作" :width="linkOrLoad">
        <img src="@/assets/images/search/like.svg" alt />
        <img src="@/assets/images/search/download.svg" alt />
      </el-table-column>
      <el-table-column prop="title" label="音乐标题" :width="titleWidth"></el-table-column>
      <el-table-column prop="singer" label="歌手"></el-table-column>
      <el-table-column prop="album" label="专辑" :width="albumWidth"></el-table-column>
      <el-table-column prop="time" label="时长"></el-table-column>
      <el-table-column prop="id" label width="1"></el-table-column>
      <el-table-column prop="img1v1Url" label width="1"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    data: {
      //传递进来用于表格展示的数据
      type: Array,
      default: [],
    },
    titleWidth: {
      //title的宽度
      type: String,
      default: '330px',
    },
    rankWidth: {
      //是否展示序列号
      type: String,
      default: '50px',
    },
    albumWidth: {
      type: String,
    },
    linkOrLoad: {
      type: String,
      default: '60px',
    },
  },
};
</script>

<style lang="less" scoped>
.songsList {
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