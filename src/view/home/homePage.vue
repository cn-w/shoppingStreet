<template>
  <div class="home-page-item">
    <div class="home-page">
      <div
        v-for="(item, index) in data"
        :key="index"
        :class="{ homepageactive: index === pageIndex }"
        @click="isShow(index)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homepage",
  props: {
    data: {
      type: Array,
    },
  },
  data() {
    return {
      pageIndex: 0,
      offsetTop: 0,
    };
  },
  methods: {
    isShow(index) {
      this.pageIndex = index;
      this.$emit("clickpage", this.pageIndex);
    },
  },
  mounted() {
    // console.log(this.$el.offsetTop);
  },
};
</script>

<style>
.home-page {
  display: flex;
  font-size: 34px;
  color: green;
}

.home-page div {
  flex: 1;
  justify-content: space-around;
}

.home-page-item {
  /* position: sticky; */
  /* top: 40px; */
  background-color: #fff;
  margin-bottom: 10px;
  text-align: center;
}

.homepageactive {
  color: red;
}
</style>