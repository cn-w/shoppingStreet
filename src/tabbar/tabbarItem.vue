<template>
  <div id="tabbar">
    <tabIn :path="path.home">
      <div slot="tab-img-unselected" v-if="isShow">
        <img src="../assets/logo.png" />
      </div>
      <div slot="tab-img-selected" v-else>
        <img src="../assets/logo.png" />
      </div>
      <div slot="classify">
        <div>首页</div>
      </div>
    </tabIn>

    <tabIn :path="path.classify">
      <div slot="tab-img-unselected" v-if="isShow">
        <img src="../assets/logo.png" />
      </div>
      <div slot="tab-img-selected" v-else>
        <img src="../assets/logo.png" />
      </div>
      <div slot="classify">
        <div>分类</div>
      </div>
    </tabIn>
    <tabIn :path="path.cart">
      <div slot="tab-img-unselected" v-if="isShow">
        <img src="../assets/logo.png" />
      </div>
      <div slot="tab-img-selected" v-else>
        <img src="../assets/logo.png" />
      </div>
      <div slot="classify">
        <div>购物车</div>
      </div>
    </tabIn>
    <tabIn :path="path.mine">
      <div slot="tab-img-unselected" v-if="isShow">
        <img src="../assets/logo.png" />
      </div>
      <div slot="tab-img-selected" v-else>
        <img src="../assets/logo.png" />
      </div>
      <div slot="classify">
        <div>我的</div>
      </div>
    </tabIn>
  </div>
</template>

<script>
import tabOut from "./tabbar/tab-out";
import tabIn from "./tabbar/tab-in";

export default {
  name: "tabbar",
  data() {
    return {
      isShow: true,
      path: {
        home: "/home",
        classify: "/classify",
        cart: "/cart",
        mine: "/mine",
      },
    };
  },
  components: {
    tabOut,
    tabIn,
  },
};
</script>

<style scoped>
#tabbar {
  display: flex;
  justify-content: space-around;
  /* width: 100%; */
  height: 50px;
  margin: 2px 0 0;
  background-color: aqua;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -2px 2px black;
  /* vertical-align: center; */
  text-align: center;
  z-index: 10;
}

/* #tabbar tabIn {
  flex: 1;
  vertical-align: center;
  font-size: 15px;
  color: red;
  width: 25%;
} */

div > img {
  width: 15px;
  height: 15px;
  /* text-align: center; */
  /* align-self: center; */
}
</style>
