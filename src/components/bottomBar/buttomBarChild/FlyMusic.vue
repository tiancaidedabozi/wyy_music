<template>
  <div class="flymusic">
    <audio @timeupdate="timeUpDate" @canplay="canPlay" @ended="ended" @error="error" ref="audio"></audio>
    <transition name="tips">
      <div class="tips" v-show="tipsFlag">
        <p>{{ tips }}</p>
      </div>
    </transition>
    <!-- 进度条 -->
    <div class="progress clearfix">
      <div class="progrees-box" ref="progreesBox">
        <div class="progrees-line" ref="progreesLine"></div>
      </div>
      <p v-text="runTime"></p>
      <p v-text="timeLength"></p>
    </div>
    <!-- 播放控件 -->
    <div class="controls clearfix">
      <a href="javascript:" class="upper" @click="upperMusic">
        <img src="@/assets/images/music/upper.svg" alt />
      </a>
      <a href="javascript:" class="switch" @click="switchMusic">
        <img src="@/assets/images/music/play.svg" ref="button" alt />
      </a>
      <a href="javascript:" class="next" @click="nextMusic">
        <img src="@/assets/images/music/nex.svg" alt />
      </a>
    </div>
    <!-- 其他工具 -->
    <div class="other">
      <div class="volume" @mousewheel="setvolum1">
        <img src="@/assets/images/flyMusic/yinlianglabashengyin.svg" @click="muted" ref="muted" />
        <div class="yinliang" ref="yinliang" @click="setvolume">
          <div class="control" ref="control"></div>
        </div>
      </div>
      <div class="fly-lyric">
        <img src="@/assets/images/music/lyric.svg" @click="showOrHiddenMinScrollLyric" />
        <lyric-scroll
          class="lyric-box"
          :song="currenMusic"
          :musicIsPlay="playFlag"
          :currentTime="currentTime"
          :lyricViewflag="lyricViewflag"
          :titleFlag="false"
          :lineLimit="0"
          v-show="minLyricFlag"
          :minLyricFlag="minLyricFlag"
        ></lyric-scroll>
      </div>
      <div class="playmusiclist">
        <img src="@/assets/images/music/songsList.svg" @click="showOrHiddenPlayList" />
        <div class="music-list" v-show="playListView">
          <play-list :data="playList"></play-list>
        </div>
      </div>
    </div>

    <!-- 歌词 -->
    <lyric
      :class="['lyricViewHidden',{'lyricView':lyricView}]"
      :songObj="currenMusic"
      :musicIsPlay="playFlag"
      @audio="audio"
      :currentTime="currentTime"
    ></lyric>
  </div>
</template>

<script>
import Lyric from '@/components/bottomBar/buttomBarChild/Lyric.vue';
import LyricScroll from '@/components/bottomBar/buttomBarChild/LyricScroll.vue';
import PlayList from '@/components/bottomBar/buttomBarChild/PlayList.vue';
export default {
  components: {
    Lyric: Lyric,
    LyricScroll: LyricScroll,
    PlayList,
  },
  data() {
    return {
      currenMusic: {},
      timeLength: '00:00',
      runTime: '00:00',
      musicTime: 0, //音乐时长，单位为秒
      playListLength: 0, //播放列表的长度
      playingMusic: 0, //下一首播放的歌曲在数组中的下标
      playFlag: false,
      tips: '',
      tipsFlag: false,
      currentTime: 0,
      lyricViewflag: false,
      minLyricFlag: false,
      titleWidth: '100px',
      playListView: false,
      lyricView: false,
    };
  },
  methods: {
    /**获取audio对象 */
    audio() {
      let audio = this.$refs.audio;
      return function () {
        return audio;
      };
    },

    /**隐藏或展示播放列表*/
    showOrHiddenPlayList() {
      if (this.playListView) {
        this.playListView = false;
      } else {
        this.playListView = true;
      }
    },

    /**展示或隐藏小滚动歌词 */
    showOrHiddenMinScrollLyric() {
      if (this.minLyricFlag) {
        this.minLyricFlag = false;
        return;
      }
      this.minLyricFlag = true;
    },

    /**点击音量条设置音频音量 */
    setvolume(e) {
      let mouseX = e.offsetX;
      let yinliangWidth = this.$refs.yinliang.clientWidth;
      let zhanbi = mouseX / yinliangWidth;
      this.$refs.control.style.width = zhanbi * yinliangWidth + 'px';
      let yinliang = zhanbi.toFixed(2);
      this.audio()().volume = yinliang;
    },

    /**鼠标滚轮设置音频音量 */
    setvolum1(event) {
      let yinliangWidth = this.$refs.yinliang.clientWidth;
      if (event.wheelDelta === 120 && this.audio()().volume < 1) {
        if (this.audio()().volume > 0.95) {
          this.audio()().volume = 1;
        } else {
          this.audio()().volume += 0.05;
          if (this.audio()().volume > 0) {
            this.$refs.muted.src =
              '../../../assets/images/flyMusic/yinlianglabashengyin.svg';
          }
        }
      } else if (event.wheelDelta === -120 && this.audio()().volume > 0) {
        if (this.audio()().volume < 0.1) {
          this.audio()().volume = 0;
          this.$refs.muted.src = '../../../assets/images/flyMusic/jingyin.svg';
        } else {
          this.audio()().volume -= 0.05;
        }
      }
      this.$refs.control.style.width =
        this.audio()().volume * yinliangWidth + 'px';
    },

    /**设置音频是否静音 */
    muted() {
      if (this.audio()().muted) {
        this.audio()().muted = false;
        this.$refs.muted.src =
          '../../../assets/images/flyMusic/yinlianglabashengyin.svg';
      } else {
        this.audio()().muted = true;
        this.$refs.muted.src = '../../../assets/images/flyMusic/jingyin.svg';
      }
    },

    /**暂停或播放 */
    switchMusic() {
      let audio = this.audio()();
      if (audio.readyState === 0) {
        this.toggleMusic();
      } else {
        if (this.playFlag) {
          audio.pause();
          this.changPlayButton();
        } else {
          audio.play();
          this.changPlayButton();
        }
      }
    },

    /**播放下一首歌 */
    nextMusic() {
      this.$refs.progreesLine.style.width = '0px';
      this.playFlag = false;
      if (this.playingMusic === this.playListLength - 1) {
        this.$message({
          showClose: true,
          message: '已经是最后一首',
          type: 'warning',
          customClass: 'messageStyle',
          center: true,
          offset: 50,
        });
        this.playingMusic = 0;
        this.toggleMusic();
        return;
      }
      this.playingMusic++;
      this.toggleMusic();
    },

    /**播放上一首歌曲 */
    upperMusic() {
      if (this.playingMusic === 0) {
        this.$message({
          showClose: true,
          message: '已经是第一首',
          type: 'warning',
          customClass: 'messageStyle',
          center: true,
          offset: 50,
        });
        return;
      }
      this.$refs.progreesLine.style.width = '0px';
      this.playFlag = false;
      this.playingMusic--;
      this.toggleMusic();
    },

    /**当播放完毕时自动下一首 */
    ended() {
      this.nextMusic();
    },

    /**判断当前是播放还是暂停，对应的改变播放按钮 */
    changPlayButton() {
      if (this.playFlag) {
        this.$refs.button.src = '../../../assets/images/music/play.svg';
        this.playFlag = false;
      } else {
        this.$refs.button.src = '../../../assets/images/music/stop.svg';
        this.playFlag = true;
      }
    },

    /**侦听用户添加了新歌曲立即播放，重复添加将不会操作 */
    playMusic() {
      if (!this.songObj.url) {
        this.$message({
          showClose: true,
          message: '音频不可用',
          type: 'error',
          customClass: 'messageStyle',
          center: true,
          offset: 50,
        });
        return;
      }
      this.playList.find((item, index) => {
        if (item.id == this.songObj.id) {
          this.playingMusic = index;
        }
      });
      let audio = this.audio()();
      audio.src = this.songObj.url;
      this.timeLength = this.songObj.time;
      this.currenMusic = this.songObj;
      this.lyricView = true;
      audio.play();
      this.changPlayButton();
    },

    /**上/下一首或自动播放下一首 */
    toggleMusic() {
      if (this.playListLength == 0) {
        this.$message({
          showClose: true,
          message: '音乐列表为空',
          type: 'warning',
          customClass: 'messageStyle',
          center: true,
          offset: 50,
        });
        return;
      } else if (!this.playList[this.playingMusic].url) {
        this.$message({
          showClose: true,
          message: '音乐没有资源',
          type: 'warning',
          customClass: 'messageStyle',
          center: true,
          offset: 50,
        });
      }
      let audio = this.audio()();
      this.currenMusic = this.playList[this.playingMusic];
      audio.src = this.playList[this.playingMusic].url;
      this.timeLength = this.playList[this.playingMusic].time;
      audio.play();
      this.changPlayButton();
    },

    /**当音频加载发生错误时处理函数 */
    error() {
      switch (this.audio()().code) {
        case 1:
          this.$message({
            showClose: true,
            message: '音乐加载被中止',
            type: 'warning',
            customClass: 'messageStyle',
            center: true,
            offset: 50,
          });
          break;
        case 2:
          this.$message({
            showClose: true,
            message: '音乐加载失败',
            type: 'warning',
            customClass: 'messageStyle',
            center: true,
            offset: 50,
          });
          break;
        case 3:
          this.$message({
            showClose: true,
            message: '播放失败', //本质是节码失败了
            type: 'warning',
            customClass: 'messageStyle',
            center: true,
            offset: 50,
          });
          break;
        case 4:
          this.$message({
            showClose: true,
            message: '浏览器不支持格式',
            type: 'warning',
            customClass: 'messageStyle',
            center: true,
            offset: 50,
          });
          break;
      }
    },

    /**倒计时和进度条 */
    timeUpDate() {
      if (this.audio()()) {
        this.currentTime = this.audio()().currentTime;
        let progreesBoxWidth = this.$refs.progreesBox.clientWidth;
        document.querySelector('.progrees-line').style.width =
          (this.currentTime / this.musicTime) * progreesBoxWidth + 'px';
        this.runTime = this.timeFormat(this.currentTime);
      }
    },
    /**可以播放音乐或视频时 */
    canPlay() {
      this.musicTime = this.audio()().duration;
      if (this.play[this.playingMusic].time) {
        this.timeLength = this.play[this.playingMusic].time;
      } else {
        this.timeLength = this.timeFormat(this.musicTime);
      }
    },
    /**格式化时间 */
    timeFormat(time) {
      let result = parseInt(time);
      let hour =
        Math.floor(result / 3600) > 0
          ? Math.floor(result / 3600) > 10
            ? Math.floor(result / 3600) + ':'
            : '0' + Math.floor(result / 3600) + ':'
          : '';

      let minute =
        Math.floor((result / 60) % 60) > 0
          ? Math.floor((result / 60) % 60) > 10
            ? Math.floor((result / 60) % 60) + ':'
            : '0' + Math.floor((result / 60) % 60) + ':'
          : '00:';

      let second =
        Math.floor(result % 60) > 10
          ? Math.floor(result % 60)
          : '0' + Math.floor(result % 60);

      return `${hour}${minute}${second}`;
    },
  },
  /**
   * 接收的是一个数组，数组的元素为一个对象，对象结构如下：
   * {
   *  album:"隔岸"
      id:1456443773
      img1v1Url:"https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg"
      linkOrLoad:""
      rank:1
      singer:"姚六一"
      time:"04:33" (可选)
      title:"隔岸"
      url:"http://m7.music.126.net/20200901170611/a49f43478dcee28e0dab59c547f98c1e/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/2920523350/fd2a/c111/aae2/5542b627692d3df8d63bbaeb1c73711a.mp3"
   * }
   */
  props: ['playList', 'songObj'],
  computed: {
    play() {
      return this.playList;
    },
  },
  watch: {
    play() {
      this.playListLength = this.play.length;
    },
    songObj() {
      this.playFlag = false;
      this.playMusic();
    },
  },
  mounted() {
    this.progreesBoxWidth = document.querySelector('.progrees-box').width;
    this.audio()().volume = 0.5;
  },
};
</script>

<style lang="less" scoped>
.tips-enter,
.tips-leave-to {
  transform: translateY(-50px);
}
.tips-enter-active,
.tips-leave-active {
  transition: all 2s;
}
.flymusic {
  padding-left: 200px;
  padding-right: 345px;
  // overflow: hidden;
  height: 100%;
  min-height: 50px;
  width: 100%;
  position: relative;
  z-index: 1;
  .tips {
    width: 110px;
    height: 30px;
    background-color: #dee1e6;
    position: fixed;
    left: 50%;
    top: 50px;
    p {
      line-height: 30px;
      text-align: center;
      color: #c62e2e;
      font-weight: 700;
    }
  }
  .progress,
  .controls,
  .other {
    float: left;
    position: relative;
  }
  .progress {
    width: 100%;
    height: 100%;
    min-height: 50px;
    padding: 0 40px;
    p,
    .progrees-box {
      float: left;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
    p {
      width: 40px;
      color: #ccc;
    }
    .progrees-box {
      width: 100%;
      height: 4px;
      background-color: #ccc;
      border-radius: 4px;
      .progrees-line {
        height: 100%;
        width: 0;
        border-radius: 4px;
        background-color: #c62f2f;
      }
    }
    P:first-of-type {
      margin-left: -100%;
      left: -40px;
    }
    P:last-of-type {
      margin-left: -40px;
      right: -49px;
    }
  }
  .controls {
    width: 200px;
    height: 100%;
    min-height: 50px;
    margin-left: -100%;
    left: -200px;
    a {
      display: block;
      float: left;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    a:hover {
      background-color: #000;
    }
    .upper,
    .next {
      width: 30px;
      height: 30px;
    }
    .upper {
      margin-left: 30px;
    }
    .switch {
      width: 34px;
      height: 34px;
      margin: 0 24px;
    }
  }
  .other {
    width: 345px;
    height: 100%;
    min-height: 50px;
    margin-left: -345px;
    right: -345px;
    .volume {
      width: 200px;
      height: 100%;
      padding: 0 15px;
      line-height: 50px;
      float: left;
      display: flex;
      align-items: center;
      img {
        display: block;
        width: 20px;
        cursor: pointer;
      }
      .yinliang {
        background-color: #ccc;
        height: 4px;
        width: 140px;
        border-radius: 2px;
        margin-left: 5px;
        position: relative;
        .control {
          height: 100%;
          width: 50%;
          border-radius: 2px;
          background-color: #c62f2f;
        }
      }
    }
    .fly-lyric {
      width: 45px;
      height: 100%;
      float: left;
      position: relative;
      img {
        display: block;
        width: 38px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
      }
      .lyric-box {
        width: 700px;
        height: 50px;
        overflow: hidden;
        position: absolute;
        top: -50px;
        right: 70px;
        z-index: 999999;
      }
      .lyric-box:hover {
        background-color: rgba(44, 46, 50, 0.5);
      }
      /deep/.scroll .scroll-template .lyric-content .lyric-line {
        height: 50px;
        line-height: 50px;
        font-size: 30px;
      }
    }
    .playmusiclist {
      width: 45px;
      height: 100%;
      float: left;
      position: relative;
      img {
        display: block;
        width: 38px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
      }
      .music-list {
        background-color: #16181c;
        width: 370px;
        height: 340px;
        position: absolute;
        bottom: 50px;
        right: 0;
        border: 2px solid #c62f2f;
      }
    }
  }
  .lyricViewHidden {
    display: none;
  }
  .lyricView {
    display: block;
  }
}
</style>