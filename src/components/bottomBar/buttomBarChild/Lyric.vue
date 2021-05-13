<template>
  <div class="lyric">
    <div class="lyric-min clearfix" ref="lyricMin">
      <div class="img">
        <img :src="songObj.img1v1Url" alt="图片加载失败" />
        <div class="fangda" @click="showLyric"></div>
      </div>
      <div class="title">
        <div class="content-box">
          <h4 v-text="songObj.title" class="song-name"></h4>
        </div>
        <div class="content-box">
          <p v-text="songObj.singer" class="artis-name"></p>
        </div>
      </div>
      <div class="caozuo">
        <img src="@/assets/images/search/like.svg" alt />
      </div>
    </div>

    <div :class="['lyric-max',{'lyric-max-grow':flag}]" ref="lyricMax">
      <div class="content-box clearfix">
        <div class="suoxiao" @click="hiddenLyric"></div>
        <div class="piture">
          <div :class="['citou',{'citou-bofang':musicIsPlay}]">
            <img src="@/assets/images/flyMusic/play-bar.png" alt />
          </div>
          <div :class="['artispic',{'artispic-xuanzhuan':musicIsPlay}]">
            <img src="@/assets/images/flyMusic/play-bar-support.svg" alt />
            <img :src="songObj.img1v1Url" />
          </div>
        </div>
        <lyric-scroll
          class="lyric-box"
          :song="songObj"
          :musicIsPlay="musicIsPlay"
          :currentTime="currentTime"
          :lyricViewflag="flag"
          :titleFlag="true"
          :lineLimit="6"
        ></lyric-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import LyricScroll from './LyricScroll.vue';
export default {
  components: {
    LyricScroll: LyricScroll,
  },
  data() {
    return {
      time: '',
      flag: false,
    };
  },
  props: ['songObj', 'musicIsPlay', 'currentTime'],
  methods: {
    //当歌曲名长度过长时，展示轮播效果
    scorllSongTitle: function (father, son) {
      clearInterval(this.time);
      let sonObj = document.querySelector(son);
      let fatherObj = document.querySelector(father);
      let sonWidth = sonObj.clientWidth;
      let fatherWidth = fatherObj.clientWidth;
      sonObj.style.left = '0px';
      let left = 0;
      if (sonWidth > fatherWidth) {
        this.time = setInterval(() => {
          if (left < sonWidth) {
            left += 5;
          } else {
            left = 0;
          }
          sonObj.style.left = `-${left}px`;
        }, 300);
      }
    },

    //点击音乐照片展示歌词详情
    showLyric: function () {
      const lyricMin = this.$refs.lyricMin;
      const lyricMax = this.$refs.lyricMax;
      lyricMax.style.display = 'block';
      lyricMin.style.display = 'none';
      setTimeout(() => {
        this.flag = true;
      }, 100);
    },

    //点击缩小按钮将音乐照片歌词详情关闭
    hiddenLyric: function () {
      const lyricMin = this.$refs.lyricMin;
      const lyricMax = this.$refs.lyricMax;
      lyricMin.style.display = 'block';
      this.flag = false;
      setTimeout(() => {
        lyricMax.style.display = 'none';
      }, 2100);
    },
  },
  updated() {
    this.scorllSongTitle('.content-box', '.song-name');
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.lyric {
  width: 200px;
  height: 57px;
  position: absolute;
  top: -57px;
  left: 0;
  border: 1px solid #2c2e32;
  .lyric-min > div {
    float: left;
  }
  .lyric-min {
    background-color: #2e2e2e;
    .img {
      width: 44px;
      height: 44px;
      margin: 6px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .fangda {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: url('@/assets/images/flyMusic/fangda.svg') no-repeat
          center/cover;
        opacity: 0;
      }
      .fangda:hover {
        opacity: 1;
      }
    }
    .title {
      width: 114px;
      height: 57px;
      padding: 9px 7px;
      .content-box {
        width: 100%;
        overflow: hidden;
        h4,
        p {
          white-space: nowrap;
          width: auto;
          display: inline-block;
          color: #ccc;
          cursor: pointer;
          position: relative;
        }
        h4 {
          line-height: 23px;
        }
        p {
          line-height: 12px;
        }
      }
    }
    .caozuo {
      width: 25px;
      height: 57px;
      text-align: center;
      line-height: 57px;
      img {
        width: 25px;
      }
    }
  }

  .lyric-max {
    width: 200px;
    height: 57px;
    position: fixed;
    bottom: 50px;
    left: 0;
    z-index: 99999999;
    opacity: 0;
    display: none;
    transition: all 0.5s;
    overflow: hidden;
    background-color: #3e3d32;
    .content-box {
      width: 880px;
      height: 100%;
      padding: 0 5px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      .suoxiao {
        width: 36px;
        height: 36px;
        padding: 5px;
        position: absolute;
        top: 30px;
        right: -50px;
        cursor: pointer;
        background: url('@/assets/images/flyMusic/suoxiao.svg') content-box
          no-repeat center/cover;
      }
      .suoxiao:hover {
        border: 2px solid #bfbfbf;
      }
      .piture {
        width: 324px;
        height: 443px;
        float: left;
        position: relative;
        .citou {
          width: 72px;
          height: 105px;
          position: absolute;
          z-index: 2;
          transform-origin: top left;
          transform: translateX(162px) rotate(-38deg);
          transition: all 1s;
          img {
            height: 100%;
          }
        }
        .citou-bofang {
          transform: translateX(162px) rotate(2deg);
        }
        .artispic {
          width: 324px;
          height: 324px;
          transform-origin: 50% 50%;
          position: absolute;
          top: 12px;
          img:first-child {
            width: 100%;
          }
          img:last-child {
            width: 160px;
            height: 160px;
            border-radius: 50%;
            position: absolute;
            top: 82px;
            left: 82px;
          }
        }
        .artispic-xuanzhuan {
          animation: xuanzhuan 10s linear infinite;
        }
      }
      .lyric-box {
        float: left;
        width: calc(100% - 324px);
        height: 100%;
        overflow: hidden;
      }
    }
  }
  @keyframes xuanzhuan {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .lyric-max-grow {
    opacity: 1;
    width: 100%;
    height: calc(100% - 100px);
  }
}
</style>