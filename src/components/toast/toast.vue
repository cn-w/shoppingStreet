<template>
  <div class="toast" v-show="isShow">
    <div class="cancel" @click="cancel">X</div>
    <span>{{ "￥" + message }}</span>
    <div class="pay" @click="pay">立即付款</div>
  </div>
</template>

<script>
export default {
  name: "toast",
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    show(message) {
      this.isShow = true;
      this.message = message;
    },
    cancel() {
      this.isShow = false;
    },
    pay() {
      this.$toast.isShow = false;
      this.$bus.$emit("paymentSuccess");
    },
  },
  mounted() {},
};
</script>

<style scoped>
.toast {
  font-size: 14px;
  text-align: center;
  /* width: 300px; */
  height: 200px;
  background-color: white;
  /* transform: translate((-50%, -50%)); */
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  color: black;
  z-index: 1001;
}

.toast .cancel {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  right: 0;

  color: black;
}

.toast span {
  /* width: 200px; */
  height: 30px;
  font-size: 28px;
  position: absolute;
  top: 60px;
  right: 0px;
  left: 0;
  /* background-color: #eee; */
  color: black;
}

.toast .pay {
  /* width: 60px; */
  height: 30px;
  position: absolute;
  bottom: 20px;
  right: 0;
  left: 0;
  background-color: blue;
  font-size: 26px;
  color: white;
}
</style>