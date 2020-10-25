<template>
  <div class="detail-cart">
    <div class="store-info">
      <div><span>客服</span></div>
      <div><span>店铺</span></div>
      <div><span>收藏</span></div>
    </div>
    <div class="detail-shop-cart">
      <div class="add-cart" @click="addClick"><span>加入购物车</span></div>
      <div class="buy" @click="buyClick"><span>购买</span></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "detailCart",
  methods: {
    addClick() {
      this.$emit("addClick");
    },
    buyClick() {
      this.$emit("buyClick");
    },
  },
};
</script>

<style scoped>
.detail-cart {
  height: 56px;
  width: 100%;
  display: flex;
  /* padding: 10px 5px; */
  text-align: center;
  align-items: center;
  justify-content: space-around;
  color: #000;
}
.store-info {
  /* width: 50%; */
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: space-around;
  /* padding: 18px 0; */
  align-items: center;
  background-color: rgb(224, 127, 195);
}

.detail-shop-cart {
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
}
.add-cart {
  /* height: 100%; */
  flex: 1;
  background-color: rgb(239, 243, 9);
  padding: 20% 0;
}
.buy {
  /* height: 100%; */
  background-color: rgb(202, 10, 10);
  flex: 1;
  padding: 20% 0;
}
</style>


