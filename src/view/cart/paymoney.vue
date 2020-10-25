<template>
  <div>
    <div class="pay-moeny-next">
      <div class="select-all">
        <div
          :class="{ select: isSelectAll, selectNot: !isSelectAll }"
          @click="selectAll"
        ></div>
        <span>全选</span>
      </div>
      <div class="settlement">
        <span> 合计： </span>
        <span> ￥ </span>
        <div class="price">{{ price }}</div>
        <div class="title" @click="click">结算</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "paymoney",
  data() {
    return {
      price: 0,
      isSelectAll: true,
    };
  },
  watch: {
    isSelectAll: {
      handler: () => {},
      immediate: false,
    },
  },
  methods: {
    // 结算
    click() {
      if (this.price == 0) return;
      else {
        this.$toast.show(this.price);
      }
    },
    // 全选
    selectAll() {
      this.isSelectAll = !this.isSelectAll;
      this.$store.commit("selectAll", this.isSelectAll);
      this.$bus.$emit("selectAll", this.isSelectAll);
      this.payMoneyAll(this.isSelectAll, true);
    },
    //结算
    payMoneyAll(boolean, isSelect) {
      this.price = 0;
      if (boolean) {
        for (
          let i = 0, length = this.$store.state.cartGoods.length;
          i < length;
          i++
        ) {
          {
            let item = this.$store.state.cartGoods[i];

            if (typeof isSelect == "boolean" || isSelect[i])
              this.price +=
                Number(/[0-9]+.[0-9]+/.exec(item.message.price)) *
                item.count *
                100;
          }
        }
        this.price = Math.floor(this.price) / 100;
      }
    },

    payMoney(index, boolean) {
      if (boolean) {
        this.price *= 100;
        this.price +=
          Number(
            /[0-9]+.[0-9]+/.exec(
              this.$store.state.cartGoods[index].message.price
            )
          ) *
          this.$store.state.cartGoods[index].count *
          100;
        this.price = Math.floor(this.price) / 100;
      } else {
        this.price *= 100;
        this.price -=
          Number(
            /[0-9]+.[0-9]+/.exec(
              this.$store.state.cartGoods[index].message.price
            )
          ) *
          this.$store.state.cartGoods[index].count *
          100;
        this.price = Math.floor(this.price) / 100;
      }
    },
  },
  created() {
    this.selectAll();
  },
  deactivated() {
    this.$toast.isShow = false;
  },
  mounted() {
    //删除商品
    this.$bus.$on("delateItem", (select) => {
      this.payMoneyAll(true, select);
    });
    //查询是否全选
    this.$bus.$on("querySelectAll", (isSelect) => {
      if (!isSelect.length) {
        this.isSelectAll = false;
        this.price = 0;
        return;
      }
      for (let i of isSelect) {
        if (!i) {
          this.isSelectAll = false;
          this.payMoneyAll(false, isSelect);
          return;
        }
      }
      this.isSelectAll = true;
    });

    // 添加减少商品
    this.$bus.$on("recalc", (index, boolean) => {
      if (boolean) {
        this.price *= 100;
        this.price +=
          Number(
            /[0-9]+.[0-9]+/.exec(
              this.$store.state.cartGoods[index].message.price
            )
          ) * 100;
        this.price /= 100;
      } else {
        this.price *= 100;
        this.price -=
          Number(
            /[0-9]+.[0-9]+/.exec(
              this.$store.state.cartGoods[index].message.price
            )
          ) * 100;
        this.price /= 100;
      }
    });

    //初始化选择商品
    this.$bus.$on("InSelectItem", () => {
      (this.isSelectAll = false), (this.price = 0);
    });

    //单个商品
    this.$bus.$on("select", (isSelect, index) => {
      this.payMoney(index, isSelect[index]);
      if (!isSelect[index]) {
        this.isSelectAll = isSelect[index]; //false
      } else {
        for (var item of isSelect) {
          if (item == false) {
            this.isSelectAll = false; //false
            return;
          }
        }
        this.isSelectAll = true; //true
      }
    });
  },
};
</script>

<style  scoped>
.settlement > span {
  position: fixed;
  bottom: 63px;
  right: 200px;
  font-size: 24px;
}
.settlement > span ~ span {
  position: fixed;
  bottom: 66px;
  right: 190px;
  font-size: 18px;
  color: red;
}

.settlement .price {
  width: 50px;
  position: fixed;
  bottom: 66px;
  right: 140px;
  font-size: 18px;
  color: red;
}
.settlement .title {
  width: 100px;
  height: 40px;
  background-color: brown;
  position: fixed;
  bottom: 55px;
  right: 20px;
  font-size: 20px;
  border: 1px solid transparent;
  border-radius: 20px;
  text-align: center;
  padding: 10px 0;
}
.select-all div {
  width: 25px;
  height: 25px;
  /* background-color: #fff; */
  border: 1px solid black;
  border-radius: 50%;
  position: fixed;
  bottom: 63px;
  left: 20px;
}

.select-all span {
  position: fixed;
  bottom: 63px;
  left: 60px;
  font-size: 24px;
}

.select {
  background-color: red;
}

.selectNot {
  background-color: #fff;
}
</style>

