<template>
  <div class="scroll">
    <h4 class="lyrictitle" v-text="song.title" v-show="titleFlag"></h4>
    <content-scroll
      class="scroll-template"
      :probeType="2"
      :data="currentLyricLines && currentLyricLines"
      :refreshDelay="1170"
      :scrollFlag="musicIsPlay"
      ref="lyricList"
    >
      <div class="lyric-content">
        <p
          v-for="(item, index) in currentLyricLines"
          :key="index"
          v-text="item.txt"
          ref="lyricLine"
          :class="{'current':currentLineNum===index}"
          class="lyric-line"
        ></p>
      </div>
    </content-scroll>
  </div>
</template>

<script>
import LyricParse from 'lyric-parser';
import ContentScroll from './ContentScroll.vue';
export default {
  components: {
    ContentScroll: ContentScroll,
  },
  data() {
    return {
      currentLyricLines: [], //lyricparser实例返回的歌词对象
      currentLineNum: 0,
      playStatus: 0, //用来记录这首歌是否刚开始播放，用来实现歌词暂停和播放的标记，当播放时变成1
    };
  },
  props: [
    'song',
    'musicIsPlay',
    'currentTime',
    'lyricViewflag',
    'titleFlag',
    'lineLimit',
    'minLyricFlag',
  ],
  methods: {
    //歌词格式化，使用的lyric-parse插件实现
    lyricParse: function () {
      this.currentLyric = new LyricParse(this.song.lyric, this.handleLyric);
      this.currentLyricLines = this.currentLyric.lines;
      //实例化成功之后调用播放歌词api  play()
      this.currentLyric.play();
    },
    handleLyric({ lineNum, txt }) {
      this.currentLineNum = lineNum;
      // 若当前行大于5,开始滚动,以保歌词显示于中间位置
      if (lineNum > this.lineLimit) {
        let lineEl = this.$refs.lyricLine[lineNum - this.lineLimit];
        // 结合better-scroll，滚动歌词
        this.$refs.lyricList.scrollToElement(lineEl, 1000);
      } else {
        this.$refs.lyricList.scrollToElement(0, 0, 1000);
      }
    },

    /**当用户打开歌词实，立即跳转到当前歌词 */
    refreshLyric() {
      if (this.currentLineNum > this.lineLimit) {
        let lineEl = this.$refs.lyricLine[this.currentLineNum - this.lineLimit];
        // 结合better-scroll，滚动歌词
        this.$refs.lyricList.scrollToElement(lineEl, 1000);
      } else {
        this.$refs.lyricList.scrollToElement(0, 0, 1000);
      }
    },
  },
  watch: {
    //初始化歌词格式化插件
    // lyricViewflag() {
    //   setTimeout(() => {
    //     this.currentLyric.seek(this.currentTime+1002);
    //   }, 1002);
    // },
    /**刷新滚动插件 */
    minLyricFlag() {
      if (this.minLyricFlag) {
        this.$refs.lyricList.refresh();
        this.refreshLyric();
      }
    },
    lyricViewflag() {
      setTimeout(() => {
        this.$refs.lyricList.refresh();
        this.refreshLyric();
      }, 1001);
    },

    /**监听歌曲是否发生了变化 */
    song(newValue, oldValue) {
      if (newValue.id === oldValue.id) {
        //同一首歌,不做操作
        return;
      }
      //判断是否已经存在lyricparser对象，如果有且song发生改变就意味着用户切歌了，要将旧的对象删除
      if (this.currentLyric) {
        this.currentLyric.stop();
      }
      //初始化歌词
      setTimeout(() => {
        this.lyricParse();
        this.playStatus = 1;
      }, 170);
    },

    //歌曲暂停/播放时停止/播放歌词
    musicIsPlay() {
      if (this.playStatus === 0) {
        return;
      }

      if (this.currentLyric !== null) {
        this.currentLyric.togglePlay();
      }
    },

    //监听当前歌曲的播放时间，用来单曲循环的时候重置歌词
    // currentTime() {
    //   if (this.currentTime === 0) {
    //     if (this.currentLyric) {
    //       this.currentLyric.seek(0);
    //     }
    //   }
    // },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.scroll {
  height: 100%;
  text-align: center;
  color: #dcdde4;
  .scroll-template {
    height: calc((100% - 25px) / 2);
    .lyric-content {
      .lyric-line {
        height: 30px;
        line-height: 30px;
      }
    }
  }
  .lyrictitle {
    font-size: 16px;
    height: 50px;
    line-height: 50px;
    background-color: #3e3d32;
    position: relative;
    z-index: 1;
  }
}
.current {
  color: skyblue;
  font-size: 16px;
  font-weight: 700;
}
</style>