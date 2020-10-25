<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "scroll",
  data() {
    return {
      scroll: null,
    };
  },
  methods: {
    scrollTo(x, y, time = 300) {
      // this.scroll && this.scroll.scrollTo(x, y, time);
      this.scroll.scrollTo(x, y, time);
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
  mounted() {
    // this.scroll();

    this.scroll = new BScroll(this.$refs.wrapper, {
      pullUpLoad: true,
      click: true,
      // wheel: true,
      // scrollbar: true,
      probeType: 3,
    });
    this.scroll.on("scroll", (position) => {
      // console.log(position);
      if (this.$route.path.indexOf("home") !== -1)
        this.$emit("scroll", position);
      else if (this.$route.path.indexOf("details") !== -1) {
        // console.log(1);
        this.$emit("detailscroll", position);
      }
    });
    this.scroll.on("pullingUp", () => {
      if (this.$route.path.indexOf("home") !== -1)
        this.$bus.$emit("bottomLoad");

      // console.log("到底啦");
      // this.scroll.finishPullUp();
    });

    // console.log(this.$el.offsetTop);
  },
};
</script>
