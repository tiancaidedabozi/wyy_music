<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>
 
<script type="text/ecmascript-6">
import BScroll from 'better-scroll';

const DIRECTION_H = 'horizontal';
const DIRECTION_V = 'vertical';

export default {
  props: {
    probeType: {
      //这个属性是调节在scroll事件触发中探针的活跃度或者频率
      type: Number,
      default: 1,
    },
    click: {
      //是否触发点击事件，默认就是不被触发
      type: Boolean,
      default: false,
    },
    listenScroll: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: null,
    },
    pullup: {
      type: Boolean,
      default: false,
    },
    beforeScroll: {
      type: Boolean,
      default: false,
    },
    refreshDelay: {
      type: Number,
      default: 20,
    },
    direction: {
      type: String,
      default: DIRECTION_V,
    },
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
    }, 170);
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        // probeType: this.probeType,
        mouseWheel: true,
        // click: this.click,
        //是否触发横向滚动
        // eventPassthrough:
        //   this.direction === DIRECTION_V ? DIRECTION_H : DIRECTION_V,
      });

      // if (this.listenScroll) {
      //   //内容滚动时触发的事件
      //   this.scroll.on("scroll", (pos) => {
      //     this.$emit("scroll", pos);
      //   });
      // }
      // if (this.pullup) {
      //   //停止滚动时触发的事件
      //   this.scroll.on("scrollEnd", () => {
      //     if (this.scroll.y <= this.scroll.maxScrollY + 50) {
      //       this.$emit("scrollToEnd");
      //     }
      //   });
      // }

      // if (this.beforeScroll) {
      //   //在用户触摸屏幕但还没有开始滚动时触发。
      //   this.scroll.on("beforeScrollStart", () => {
      //     this.$emit("beforeScroll");
      //   });
      // }
    },
    // disable() {
    //   //是否禁用Better scroll
    //   this.scroll && this.scroll.disable();
    // },
    // enable() {
    //   //启用 better-scroll，默认开启
    //   this.scroll && this.scroll.enable();
    // },
    refresh() {
      //刷新Better scroll，在内容发生改变的时候必须刷新让Better scroll重新计算父容器和子容器的宽高
      this.scroll && this.scroll.refresh();
    },
    // scrollTo() {
    //   //滚动到某个位置，x,y 代表坐标，time 表示动画时间，easing 表示缓动函数
    //   this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    // },
    scrollToElement() {
      //滚动到某个元素，el（必填）表示 dom 元素，time 表示动画时间，offsetX 和 offsetY 表示坐标偏移量，easing 表示缓动函数
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    },
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh();
      }, this.refreshDelay);
    },
  },
};
</script>
 
<style scoped lang="stylus" rel="stylesheet/stylus"></style>