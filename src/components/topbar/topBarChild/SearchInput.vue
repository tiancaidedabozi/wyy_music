<template>
  <div class="search">
    <el-input
      placeholder="搜索音乐，视频，歌词，电台"
      v-model="input"
      clearable
      @focus="searchHotList"
      @blur="showOrHidden"
      @change="searchInput"
      @input="searchHotList"
    ></el-input>
    <div
      :class="['hotsearch',{showOrHidden:flag},{'hotsearch-hot':!boxFlag},{'hotsearch-suggest':boxFlag}]"
    >
      <div :class="[boxFlag?'hot-result':'']">
        <h3 class="hotsearch-title">热搜榜</h3>
        <ul class="hotsearch-list">
          <li
            class="clearfix"
            v-for="(item, index) in hotSearchList"
            :key="index"
            @click="searchSingles(item.searchWord)"
          >
            <div class="left">
              <span v-text="index + 1"></span>
            </div>
            <div class="right">
              <div class="song-title">
                <span v-text="item.searchWord" :class="[index <= 2?'search-word':'']"></span>
                <span v-text="item.score"></span>
                <img :label="item.iconType" class="newhot" />
              </div>
              <div class="content">
                <p v-text="item.content"></p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div :class="['suggest',!boxFlag?'search-suggest':'']">
        <h3>
          搜
          <span>“{{input}}”</span>相关的结果
        </h3>
        <div class="suggest-content" v-for="(item, key) in suggestObj" :key="key">
          <div>
            <div class="suggest-content-guilei" v-show="key === 'songs'">
              <img src="@/assets/images/search/danqu.svg" alt />
              <span>单曲</span>
            </div>
            <!-- <div class="suggest-content-guilei" v-show="key === 'playlists'">
              <img src="@/assets/images/search/gedan.svg" alt />
              <span>歌单</span>
            </div>-->
            <div class="suggest-content-guilei" v-show="key === 'artists'">
              <img src="@/assets/images/search/user.svg" alt />
              <span>歌手</span>
            </div>
            <div class="suggest-content-guilei" v-show="key === 'albums'">
              <img src="@/assets/images/search/zhuanji.svg" alt />
              <span>专辑</span>
            </div>
          </div>
          <ul class="suggest-list">
            <li v-for="(itemChild, index) in item" :key="index">
              <p v-show="key === 'albums'">{{ itemChild.name +'-'+ itemChild.artist}}</p>
              <p v-show="key === 'artists'">{{ itemChild.name }}</p>
              <p
                @click="searchSingles(itemChild.name+itemChild.artists)"
                v-show="key === 'songs'"
              >{{ itemChild.name +'-'+ itemChild.artists }}</p>
              <!-- <p v-show="key === 'playlists'">{{ itemChild.name }}</p> -->
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div :class="['triangle',{showOrHidden:flag}]"></div>
  </div>
</template>

<script>
import {
  searchHotDetail,
  searchSingles,
  searchSuggest,
} from '../../../network/search.js'
import { formatSearchSuggest, formatSingles } from '@/common/dataFormat.js'
export default {
  data() {
    return {
      input: '',
      hotSearchList: [],
      flag: true,
      boxFlag: false,
      suggestObj: {},
    }
  },
  methods: {
    //获取热搜/获取用户输入提示相关 并展示
    searchHotList() {
      if (this.input === '') {
        //如果输入框为空展示热搜
        this.flag = false
        this.boxFlag = false
        searchHotDetail().then((res) => {
          if (res.status === 200 && res.statusText === 'OK') {
            this.hotSearchList = res.data.data
            setTimeout(() => {
              this.setHotListStyle()
            }, 50)
          }
        })
      } else {
        //如果输入框不为空，展示搜索建议
        this.flag = false
        this.boxFlag = true
        searchSuggest(this.input).then((res) => {
          if (res.status === 200 && res.statusText === 'OK') {
            let result = formatSearchSuggest(res.data.result)
            this.suggestObj = result
          }
        })
      }
    },
    //关闭热搜展示
    showOrHidden() {
      /**
       * 当用户点击热搜列表来输入搜索关键字的时候，输入框总是会先失去焦点，
       * 失去焦点热搜列表就会关闭，导致点击热搜列表的点击事件没有被触发，因此
       * 当输入框失去焦点时，延迟120毫秒关闭热搜列表，使热搜列表的点击事件可以
       * 被触发。
       */
      setTimeout(() => {
        this.flag = true
      }, 120)
    },
    //点击热搜搜索歌曲，默认搜索单曲
    searchSingles(searchWord) {
      this.input = searchWord
      if (this.input == '' || this.input == undefined || this.input == null) {
        return
      }
      this.$store.commit('addSearchWord', this.input)
      this.$router.push(
        { path: `/search/singles/${this.input}` },
        (onComplete) => {},
        (onAbort) => {}
      )
      // if (this.$route.path === "/search/singles") {
      //   searchSingles(this.$store.getters.getSearchWord).then((res) => {
      //     if (res.status === 200 && res.statusText === "OK") {
      //       this.$store.commit("addSongCount", res.data.result.songCount);
      //       let songs = res.data.result.songs;
      //       this.$store.commit("addTableData", formatSingles(songs));
      //     }
      //   });
      // } else {
      //   this.$router.push(
      //     { path: `/search/singles/${this.input}` },
      //     (onComplete) => {},
      //     (onAbort) => {}
      //   );
      // }
    },
    //根据用户输入的内容搜索歌曲
    searchInput() {
      this.showOrHidden()
      if (this.input == '' || this.input == undefined || this.input == null) {
        return
      }
      this.$store.commit('addSearchWord', this.input)
      this.$router.push(
        { path: `/search/singles/${this.input}` },
        (onComplete) => {},
        (onAbort) => {}
      )
      // if (this.$route.path === "/search/singles") {
      //   searchSingles(this.$store.getters.getSearchWord).then((res) => {
      //     if (res.status === 200 && res.statusText === "OK") {
      //       this.$store.commit("addSongCount", res.data.result.songCount);
      //       let songs = res.data.result.songs;
      //       this.$store.commit("addTableData", formatSingles(songs));
      //     }
      //   });
      // } else {
      //   this.$router.push(
      //     { path: "/search/singles" },
      //     (onComplete) => {},
      //     (onAbort) => {}
      //   );
      // }
    },

    //为热搜列表做一些样式的设置
    setHotListStyle() {
      let list = document.querySelectorAll('.left>span')
      list.forEach((item, index) => {
        if (index < 3) {
          item.style.color = '#c52f2f'
        }
      })

      let newhot = document.getElementsByClassName('newhot')
      for (let i = 0; i < 3; i++) {
        let iconType = this.hotSearchList[i].iconType
        if (iconType == 1) {
          newhot[i].src = '../../../assets/images/hot.png'
        } else if (iconType == 2) {
          newhot[i].src = '../../../assets/images/new.png'
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.showOrHidden {
  display: none;
}
.search {
  position: relative;
  .el-input::after {
    content: '\e778';
    font-family: element-icons !important;
    display: inline;
    font-size: 20px;
    font-weight: 700;
    line-height: 30px;
    position: absolute;
    top: 0;
    left: 196px;
  }
  .el-input {
    top: 10px;
    left: 15px;
    width: 205px;
    /deep/ .el-input__inner {
      min-width: 220px;
      width: 220px;
      height: 30px;
      border-radius: 15px;
      font-size: 12px;
    }
  }
  .hotsearch::-webkit-scrollbar {
    width: 7px;
    height: 0;
  }
  .hotsearch::-webkit-scrollbar-thumb {
    background-color: #a1a3a9;
    border-radius: 3px;
  }
  .hotsearch-hot {
    transition: all 0.5s;
    overflow: scroll;
    width: 425px;
    height: 500px;
  }
  .hotsearch-suggest {
    transition: all 0.5s;
    width: 350px;
    height: auto;
  }
  .hotsearch {
    position: absolute;
    top: 50px;
    left: 15px;
    background-color: #2d2f33;
    color: #828385;
    z-index: 99999;
    .hotsearch-title {
      font-size: 16px;
      font-weight: 400;
      margin-top: 20px;
      padding: 10px 25px;
    }
    .hotsearch-list {
      li:hover {
        background-color: #212124;
      }
      li {
        cursor: pointer;
        .left,
        .right {
          height: 55px;
          float: left;
        }
        .left {
          width: 55px;
          line-height: 48px;
          text-align: center;
          font-size: 16px;
          font-weight: 700;
          .hot-color {
            color: #c52f2f;
          }
          .other-color {
            color: #999;
          }
        }
        .right {
          .song-title {
            height: 30px;
            span {
              line-height: 30px;
            }
            span:nth-child(1) {
              font-size: 16px;
              color: #dcdde4;
            }
            span:nth-child(2) {
              font-size: 14px;
              color: #ccc;
              padding-left: 7px;
            }
            .newhot {
              height: 16px;
            }
          }
          .content {
            height: 20px;
            line-height: 10px;
            font-weight: 14px;
            color: #999;
          }
        }
      }
    }
    .suggest {
      h3 {
        padding: 10px;
        span {
          color: #c52f2f;
        }
        font-size: 12px;
        font-weight: 400;
      }
      .suggest-content {
        .suggest-content-guilei {
          height: 26px;
          line-height: 26px;
          padding-left: 10px;
          background-color: #212124;
          img {
            height: 14px;
            vertical-align: -2px;
          }
          span {
            color: #fff;
            margin-left: -4px;
          }
        }
        .suggest-list {
          li:hover {
            background-color: #212124;
          }
          li {
            height: 26px;
            font-size: 12px;
            line-height: 26px;
            padding-left: 16px;
            p {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .triangle {
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
    position: absolute;
    top: 45px;
    left: 35px;
    background: #fff;
    z-index: 9999;
  }
}

.search-word {
  font-weight: 700;
}
.hot-result {
  display: none;
}
.search-suggest {
  display: none;
}
</style>