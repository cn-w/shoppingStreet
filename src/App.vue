<template>
  <div class="body">
    <keep-alive exclude="detail">
      <router-view></router-view>
    </keep-alive>
    <tabbar v-if="isShow()"></tabbar>
  </div>
</template>

<script>
// import home from "./components/home";
// import about from "./components/about";
import tabbar from "./tabbar/tabbarItem";

export default {
  name: "App",
  components: {
    tabbar,
  },
  methods: {
    isShow() {
      return this.$route.path.indexOf("details") == -1 ? true : false;
    },
  },
};
</script>

<style>
.body {
  height: 100vh;
  position: relative;
}

@import "./assets/normalize.css";

/*:root -> 获取根元素html*/
:root {
  --color-text: #666;
  --color-high-text: #ff5777;
  --color-tint: #ff8198;
  --color-background: #eee;
  --font-size: 14px;
  --line-height: 1.5;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  user-select: none; /* 禁止用户鼠标在页面上选中文字/图片等 */
  -webkit-tap-highlight-color: transparent; /* webkit是苹果浏览器引擎，tap点击，highlight背景高亮，color颜色，颜色用数值调节 */
  background: var(--color-background);
  color: var(--color-text);
  /* rem vw/vh */
}

@media (min-width: 800px) {
  body {
    width: 75vw;
    margin: auto;
  }
  .home-page-cpye {
    left: 12.5vw;
    right: 12.5vw;
  }
}
@media (max-width: 800px) {
  body {
    width: 85vw;
    margin: auto;
  }
  .home-page-cpye {
    left: 7.5vw;
    right: 7.5vw;
  }
}
@media (max-width: 500px) {
  body {
    width: 100vw;
    margin: auto;
  }
  .home-page-cpye {
    left: 0;
    right: 0;
  }
  body .detail-cart {
    font-size: 14px importent;
  }
}
a {
  color: var(--color-text);
  text-decoration: none;
}

.clear-fix::after {
  clear: both;
  content: "";
  display: block;
  width: 0;
  height: 0;
  visibility: hidden;
}

.clear-fix {
  zoom: 1;
}

.left {
  float: left;
}

.right {
  float: right;
}
</style>