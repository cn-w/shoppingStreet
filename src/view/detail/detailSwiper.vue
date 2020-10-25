<template>
  <swiper class="detail-swiper">
    <swiperitem v-for="item in topImages">
      <img :src="item" alt @load="load" />
    </swiperitem>
  </swiper>
</template>

<script>
import { swiper, swiperitem } from "../../components/swiper/sweiperMain";

export default {
  name: "detailswiper",
  components: {
    swiper,
    swiperitem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
    data: Array,
    default() {
      return [];
    },
  },
  methods: {
    load() {
      this.$emit("swiperload");
      // console.log("swiper is load");
    },
  },
  mounted() {
    // console.log(this.topImages);
    // console.log(this.data);
  },
};
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}

/* .detail-swiper img {
  width: 100%;
  height: 300px;
} */
</style>
