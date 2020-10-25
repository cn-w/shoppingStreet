<template>
  <div id="detail">
    <navbar class="detail-navbar" @position="position" ref="navbar"></navbar>
    <!-- <button @click="click">刷新</button> -->
    <scroll class="detail-content" ref="scroll" @detailscroll="detailscroll">
      <detailswiper
        ref="detailswiper"
        :top-images="topImages"
        @swiperload="swiperload"
      ></detailswiper>
      <detailgoodsinfo
        :goods="goods"
        ref="detailgoods"
        @goodsinfoload="goodsinfoload"
      ></detailgoodsinfo>
      <detail-shop-info
        :shop="shop"
        ref="detailshop"
        @shopinfoload="shopinfoload"
      ></detail-shop-info>
      <goods-detail-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
        ref="detailinfo"
      ></goods-detail-info>
      <param-info
        :paramInfo="paramInfo"
        ref="paraminfo"
        @paraminfoload="paraminfoload"
      ></param-info>
    </scroll>
    <detail-cart
      class="detail-cart"
      @buyClick="buyClick"
      @addClick="addClick"
    ></detail-cart>
  </div>
</template>

<script>
import { getDetail, Goods, Shop, GoodsParam } from "../network/detail";

import navbar from "../view/detail/detailnavbar";
import detailswiper from "../view/detail/detailSwiper";
import detailgoodsinfo from "../view/detail/goodsInfo";
import scroll from "./betterscroll/betterscroll";
import DetailShopInfo from "../view/detail/shopinfo";
import GoodsDetailInfo from "../view/detail/goodsdetailinfo";
import ParamInfo from "../view/detail/paraminfo";
import detailCart from "../view/detail/detailcart";

export default {
  name: "detail",
  data() {
    return {
      data: [1, 2, 3, 4, 5, 6],
      iid: null,
      detaildata: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      detailPostion: {
        swiper: 0,
        goods: 0,
        shop: 0,
        detilinfo: 0,
        paraminfo: 0,
      },
    };
  },
  computeds: {},
  components: {
    navbar,
    detailswiper,
    detailgoodsinfo,
    scroll,
    DetailShopInfo,
    GoodsDetailInfo,
    ParamInfo,
    detailCart,
  },
  methods: {
    buyClick() {
      this.addClick();
      this.$router.replace("/cart");
    },
    addClick() {
      let repetition = false;

      if (this.$store.state.cartGoods.length == 0)
        this.$store.commit("addNewMerchandise", this.goodsToStore());
      else {
        for (let index in this.$store.state.cartGoods) {
          if (this.$store.state.cartGoods[index].iid === this.iid) {
            this.$store.commit("addMerchandise", index);
            repetition = true;
          }
        }
        if (!repetition) {
          this.$store.commit("addNewMerchandise", this.goodsToStore());
        }
      }
    },

    goodsToStore() {
      return {
        select: false,
        iid: this.iid,
        count: 1,
        message: {
          price: this.goods.newPrice,
          image: this.topImages[0],
          discount: this.desc,
          goodsInfo: this.detaildata,
        },
      };
    },
    detailscroll(position) {
      this.fallowPosition(position.y);
    },
    fallowPosition(position) {
      if (position > this.detailPostion.goods)
        this.$refs.navbar.currentIndex = 0;
      else if (
        this.detailPostion.goods >= position &&
        position > this.detailPostion.shop
      )
        this.$refs.navbar.currentIndex = 1;
      else if (
        this.detailPostion.shop >= position &&
        position > this.detailPostion.paraminfo
      )
        this.$refs.navbar.currentIndex = 2;
      else if (position <= this.detailPostion.paraminfo)
        this.$refs.navbar.currentIndex = 3;
    },

    position(index) {
      switch (index) {
        case 0:
          this.$refs.scroll.scroll.scrollTo(0, this.detailPostion.swiper);
          this.$refs.scroll.refresh();
          break;
        case 1:
          this.$refs.scroll.scrollTo(0, this.detailPostion.goods);

          this.$refs.scroll.refresh();
          break;
        case 2:
          this.$refs.scroll.scroll.scrollTo(0, this.detailPostion.shop);

          this.$refs.scroll.refresh();
          break;
        case 3:
          this.detailPostion.paraminfo = -this.$refs.paraminfo.$el.offsetTop;
          this.$refs.scroll.scroll.scrollTo(0, this.detailPostion.paraminfo);

          this.$refs.scroll.refresh();

          break;
      }
    },

    imageLoad() {
      this.$refs.scroll.refresh();
      this.detailPostion.detilinfo = this.$refs.detailinfo.$el.offsetTop;

      //  111
    },

    shopinfoload() {
      this.detailPostion.shop = -this.$refs.detailshop.$el.offsetTop;
    },
    paraminfoload() {
      // this.detailPostion.paraminfo = -this.$refs.paraminfo.$el.offsetTop;
      // let top = this.$refs.paraminfo;
    },
    goodsinfoload() {
      this.detailPostion.goods = -this.$refs.detailgoods.$el.offsetTop;
    },
    swiperload() {
      this.detailPostion.swiper = -this.$refs.detailswiper.$el.offsetTop;
    },
  },
  created() {
    this.iid = this.$route.params.iid;

    //请求数据
    getDetail(this.iid).then((req) => {
      this.detaildata = req.result;

      this.topImages = this.detaildata.itemInfo.topImages;
      // 商品信息
      this.goods = new Goods(
        this.detaildata.itemInfo,
        this.detaildata.columns,
        this.detaildata.shopInfo.services
      );
      // 店铺信息
      this.shop = new Shop(this.detaildata.shopInfo);
      // 保存商品信息
      this.detailInfo = this.detaildata.detailInfo;
      // 获取参数信息
      this.paramInfo = new GoodsParam(
        this.detaildata.itemParams.info,
        this.detaildata.itemParams.rule
      );
    });
  },
  mounted() {},
};
</script>



<style scoped>
#detail {
  position: absolute;
  bottom: 56px;
  /* height: var(--height); */
  top: 44px;
  left: 0;
  right: 0;
  z-index: 10;
}
.detail-navbar {
  position: fixed;
  z-index: 9;
  background-color: #fff;
  top: 0;
  right: 0;
  left: 0;
}
.detail-content {
  /* height: -moz-calc(100% - 44px);
  height: -webkit-calc(100%-100px); */
  /* height: var(--height); */
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}

.detail-cart {
  /* background-color: rgb(163, 151, 151); */
  visibility: 1;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 20;
  font-size: 20px;
}
</style>

