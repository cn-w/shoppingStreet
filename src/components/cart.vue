<template>
  <div class="cart">
    <carbar></carbar>
    <better-scroll class="cart-scroll" ref="scroll">
      <cart-list class="cart-list"></cart-list>
    </better-scroll>
    <pay-money class="pay-money"></pay-money>
  </div>
</template>

<script>
import cartList from "../view/cart/cartlist";
import carbar from "../view/cart/banbar";
import payMoney from "../view/cart/paymoney";
import betterScroll from "../components/betterscroll/betterscroll";

export default {
  name: "cart",
  components: {
    cartList,
    carbar,
    payMoney,
    betterScroll,
  },
  data() {
    return {
      index: null,
      data: {},
    };
  },
  computed: {},
  metheds: {
    getData() {},
  },
  mounted() {},
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.cart {
  /* width: 100%; */
  /* height: calc(100vh-144px); */
  background-color: cornsilk;
  /* border-bottom: 1px solid black; */
  /* text-align: center; */
  position: absolute;

  top: 44px;
  left: 0;
  right: 0;
  bottom: 100px;
}
.pay-money {
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  height: 50px;
  color: black;
  background-color: rgb(250, 246, 247);
  /* border: 0.5px solid #006; */
  z-index: 1000;
}

.cart-scroll {
  position: absolute;
  top: 0;
  bottom: 0px;
  width: 100%;
}
</style>
