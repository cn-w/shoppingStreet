<template>
  <div class="cart-list">
    <div v-for="(item, index) in cartGoods" :key="index">
      <div class="cart-item">
        <div class="item-select">
          <div
            :class="{ selectItem: isSelect[index] }"
            @click="select(index)"
          ></div>
        </div>

        <div class="img">
          <img :src="item.message.image" />
        </div>
        <div class="title">
          <span>{{ item.message.goodsInfo.skuInfo.title }}</span>
        </div>
        <div class="message">
          <span>{{ item.message.price | price }}</span>
          <div>
            <button @click="sub(index)">-</button><span>{{ item.count }}</span>
            <button @click="add(index)">+</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cartList",
  data() {
    return {
      cartGoods: [],
      isSelect: [false],
    };
  },
  props: {
    // index: Number,
    goodsList: Array,
  },
  computed: {},
  created() {
    this.cartGoods = this.$store.state.cartGoods;
  },
  filters: {
    price: function (price) {
      var newPrice = new RegExp("[0-9]+.[0-9]+");
      return "￥" + newPrice.exec(price);
    },
  },
  methods: {
    add(index) {
      this.$store.commit("addMerchandise", index);
      if (this.isSelect[index]) this.$bus.$emit("recalc", index, true);
    },
    sub(index) {
      if (this.$store.state.cartGoods[index].count > 1) {
        this.$store.commit("subMerchandise", index);
        if (this.isSelect[index]) this.$bus.$emit("recalc", index, false);
      } else {
        this.$store.commit("deleteMerchandise", index);

        if (this.isSelect.splice(index, 1)) {
          this.$bus.$emit("delateItem", this.isSelect);
        }
        this.$bus.$emit("querySelectAll", this.isSelect);
      }
    },
    select(index) {
      this.isSelect.splice(index, 1, !this.isSelect[index]);
      this.$store.commit("select", index, this.isSelect);
      this.$bus.$emit("select", this.isSelect, index);
    },
  },
  watch: {
    isSelect: {
      immediate: false,
      deep: true,
      handler: () => {},
    },
  },
  activated() {
    for (let i = 0, length = this.cartGoods.length; i < length; i++) {
      // this.isSelect.splice(i, 1, false);
      this.isSelect[i] = false;
      this.isSelect.splice(i, 1, false);
    }

    this.$bus.$emit("InSelectItem");
  },

  mounted() {
    this.$bus.$on("selectAll", (isSelectAll) => {
      for (let i in this.isSelect) {
        this.isSelect.splice(i, 1, isSelectAll);
      }
    });
    this.$bus.$on("paymentSuccess", () => {
      for (let i = 0, length = this.isSelect.length; i < length; i++) {
        if (this.isSelect[i] == true) {
          this.$store.commit("deleteMerchandise", i);
          this.isSelect.splice(i, 1);
          i -= 1;
        }
      }
      this.$bus.$emit("querySelectAll", this.isSelect);
    });
  },
};
</script>

<style scoped>
.cart-list {
  width: 100%;
  /* height: calc(100vh - 155px); */
  background-color: #fff;
  /* margin: 5px 0; */
  /* overflow: hidden; */
}

.cart-item {
  background-color: #eee;
}
.cart-list .img {
  flex: 1;

  overflow: hidden;
}
.cart-list img {
  width: 100px;
  height: 150px;
  margin: 2px 40%;
}
.cart-list .title {
  flex: 1;
  overflow: hidden;
  padding: 20px 0;
  /* vertical-align: center; */
}

.title span {
  margin: 50% 0;
}

.cart-list .message {
  height: 50px;
  display: flex;
  justify-content: space-between;
  margin: 10px;
  font-size: 14px;
  color: red;
  flex: 1;
  display: grid;
  grid-template-areas:
    "price"
    "count";
  grid-auto-rows: minmax(80px, auto);
  justify-content: center;
}

.message span {
  grid-area: price;
}

.message div {
  grid-area: count;
}

.cart-list button {
  width: 20px;
  height: 20px;
  background-color: #fff;
  color: red;
}

.cart-item {
  display: flex;
  justify-content: space-between;
}

.cart-item .item-select {
  flex: 0.4;

  position: relative;
}
.cart-item .item-select > div {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 45%;
  left: 30%;
  border: 1px solid black;
  border-radius: 50%;
}

.selectItem {
  background-color: red;
}

.selectNot {
  background-color: blue;
}
</style>
