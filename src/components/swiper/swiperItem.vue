<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "swiperitem",
  mounted() {
    // console.log(this.$el.offsetTop);
  },
};
</script>

<style>
.slide {
  width: 100%;
  flex-shrink: 0;
  /* 弹性盒子收缩比率 */
}

.slide img {
  width: 100%;
}
</style>