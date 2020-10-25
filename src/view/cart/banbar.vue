<template>
  <div class="cart-top-bar">
    <Navbar>
      <div class="left" slot="left"></div>
      <div class="car-nav" slot="center">购物车</div>
      <div class="right" slot="right"></div>
    </Navbar>
  </div>
</template>

<script>
import Navbar from "../../components/navbar/NavBar";

export default {
  name: "carbar",
  components: { Navbar },
};
</script>

<style scoped>
.cart-top-bar {
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 100;
}

.left,
.right {
  flex: 0;
}
.car-nav {
  background-color: rgb(180, 10, 10);
  color: black;
  flex: 1;
}
</style>