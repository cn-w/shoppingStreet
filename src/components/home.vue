<template>
  <div class="home">
    <div id="home-nav">
      <homenav></homenav>
    </div>
    <homepage
      :data="['流行', '新款', '精选']"
      @clickpage="clickpage"
      class="home-page-cpye"
      ref="homePage1"
      v-show="homePageShow"
    ></homepage>
    <scroll @scroll="homescroll" ref="scroll" class="home-scroll">
      <homeswiper :banners="banner" class="home-swiper"></homeswiper>

      <homerecommod :recommods="recommod"></homerecommod>
      <homepage
        class="home-page-1"
        :data="['流行', '新款', '精选']"
        @clickpage="clickpage"
        ref="homePage2"
      ></homepage>
      <homegoods
        :homegoods="goods[this.goodsType].content"
        :goodsType="goodsType"
      ></homegoods>
    </scroll>
    <div class="home-img-nav" v-show="isShow" @click="btnclick">
      <img src="../assets/logo.png" />
    </div>
  </div>
</template>

<script>
import { getHome, getWether, getHomeGoods } from "../network/main.js";

import homeswiper from "../view/home/homeswiper";
import homerecommod from "../view/home/homeRecommods";
import homegoods from "../view/home/homegoods";
import homepage from "../view/home/homePage";
import scroll from "./betterscroll/betterscroll";

import homenav from "../view/home/nav";
import axios from "axios";
export default {
  name: "home",
  components: {
    homenav,
    homeswiper,
    homerecommod,
    homegoods,
    homepage,
    scroll,
  },
  data() {
    return {
      banner: [],
      recommod: [],
      tabOffsetTop: 0,
      goods: {
        pop: { page: 1, content: [] },
        new: { page: 1, content: [] },
        sell: { page: 1, content: [] },
      },
      goodsType: "pop",
      goodsIndex: 0,
      isShow: false,
      scrollPosition: 0,
      goodsScroll: { pop: 0, new: 0, sell: 0 },
      homePageShow: false,
      homepageposition: 0,
      homePosition: {
        goodsType: "pop",
        scroll: 0,
      },
    };
  },
  watch: {
    banner: {
      handler() {
        // console.log(this.$refs.scroll.refresh);
        this.$refs.scroll.refresh();
      },
      deep: true,
      // immediate: true,
    },
    recommod() {
      this.$refs.scroll.refresh();
    },
  },
  computed: {},
  methods: {
    pickAjax(req) {
      this.banner = req;
    },

    goodsIsShow(goodsIndex) {
      switch (goodsIndex) {
        case 0:
          this.goodsType = "pop";
          // return "pop";
          break;
        case 1:
          this.goodsType = "new";
          // return "new";
          break;
        case 2:
          this.goodsType = "sell";
        // return "sell";
      }
    },

    nextPage() {
      this.$bus.$on("bottomLoad", () => {
        console.log("到底啦");
        this.getHomeGoods("pop");
        // this.getHomeGoods("new");
        // this.getHomeGoods("sell");
        this.$refs.scroll.scroll.finishPullUp();
      });
    },

    clickpage(pageIndex) {
      this.goodsIndex = pageIndex;
      this.goodsIsShow(this.goodsIndex);
      // console.log(this.goodsScroll[this.goodsType]);
      this.$refs.scroll.scrollTo(0, this.goodsScroll[this.goodsType]);

      this.$refs.scroll.refresh();
      this.$refs.homePage1.pageIndex = this.goodsIndex;
      this.$refs.homePage2.pageIndex = this.goodsIndex;
    },

    btnclick() {
      this.$refs.scroll.scrollTo(0, 0);
    },

    isShowImg() {
      // console.log(this.scrollPosition);
      this.scrollPosition < -1000
        ? (this.isShow = true)
        : (this.isShow = false);
    },

    homescroll(position) {
      this.scrollPosition = position.y;

      this.goodsScroll[this.goodsType] = this.scrollPosition;

      this.isShowImg();
      this.$refs.homePage2.$el.getBoundingClientRect().top >=
      document.querySelector("#home-nav").getBoundingClientRect().height
        ? (this.homePageShow = false)
        : (this.homePageShow = true);
    },

    homePage2_clone() {
      var homePage2 = this.$refs.homePage2.$el;
      var homePage2_clone = homePage2.cloneNode(true);
      homePage2_clone.className = "home-page-cpye";
      document.documentElement.appendChild(homePage2_clone);
    },

    getHomeGoods(type) {
      getHomeGoods(type, this.goods[type].page).then((req) => {
        this.goods[type].content.push(...req.data.list);

        this.goods[type].page += 1;
      });
    },

    getHome() {
      getHome()
        .then((req) => {
          this.banner = req.data.banner.list;
          this.recommod = req.data.recommend.list;
        })
        .catch((err) => console.log("err1"));

      // var xhrReq = getHome();
      // var that = this;
      // xhrReq.onload = function () {
      //   // console.log(xhrReq);
      //   var req = JSON.parse(xhrReq.responseText);
      //   // console.log(req);
      //   that.banner = req.data.banner.list;
      //   that.recommod = req.data.recommend.list;
      //   console.log(that);
      //   // this.$watch("banner");
      //   // this.pickAjax([1, 1]);

      //   // this.$watch("recommend");
      // };
      // console.log(this.banner);
      // // console.log(req);
      // // console.log(this.recommod);
    },

    getmessage() {
      axios({
        url: "http://123.207.32.32:8000/home/multidata",
      }).then((req) => console.log(req));
    },

    scrollBrefresh() {
      this.$bus.$on("imgIsLoad", () => {
        this.debounce(this.$refs.scroll.refresh, 500)();
      });
    },

    debounce(fun, delaye) {
      let timer = null;

      return function (...arg) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          fun.apply(this, arg);
        }, delaye);
      };
    },
  },
  created() {
    this.getHome();

    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },

  mounted() {
    // this.$bus.$on("imgIsLoad", () => {
    //   this.debounce(this.$refs.scroll.refresh, 500)();
    // });错误未执行同一个的bounce函数
    this.$bus.$on("swiperImageLoad", () => {
      this.homepageposition = this.$refs.homePage2.$el.offsetTop;
    });
    // var homePage = document.querySelector(".home-page-1");

    let refresh = this.debounce(this.$refs.scroll.refresh, 500);
    this.$bus.$on("imgIsLoad", () => {
      refresh();
    });

    this.nextPage();

    // let saveScroll = this.$bus.$on("homePageBeforeUpdate", (goodsType) =>
    //   // console.log(goodsType)
    // );
  },
  activated() {
    this.goodsType = this.homePosition.goodsType;
    this.$refs.scroll.scroll.scrollTo(0, this.homePosition.scroll);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    (this.homePosition.goodsType = this.goodsType),
      (this.homePosition.scroll = this.scrollPosition);
  },
  destroyed() {
    // 跨域访问需要设置被访问者的header('Access-Control-Allow-Origin:*');
  },
};
</script>

<style  scoped>
#home-nav {
  width: 100%;
  height: 40px;
  background-color: cornsilk;
  border-bottom: 1px solid black;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.home {
  box-sizing: border-box;
  /* margin: auto; */
  position: absolute;
  top: 0;
  bottom: 50px;
  width: 100%;
}

.home-img-nav {
  position: fixed;
  right: 10px;
  bottom: 50px;
  width: 40px;
  height: 40px;
}

.home-img-nav img {
  width: 40px;
  height: 40px;
}

.home-scroll {
  position: absolute;
  top: 40px;
  bottom: 0px;
  width: 100%;
}

.home-page-cpye {
  position: fixed;
  top: 40px;
  right: 20px;
  left: 20px;
  z-index: 100;
}
</style>