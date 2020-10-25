<template>
  <swiper class="swiper-img">
    <swiperitem v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad" />
      </a>
    </swiperitem>
  </swiper>
</template>

<script>
import { swiper, swiperitem } from "../../components/swiper/sweiperMain";
export default {
  name: "homeswiper",
  components: {
    swiper,
    swiperitem,
  },
  props: {
    banners: {
      type: Array,
      default: [],
    },
    data() {
      return {
        isLoad: false,
      };
    },
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$bus.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    },
  },
};
</script>


<style  scoped>
/* swiper-img {
  width: 100%;
  height: 50px;
} */
</style>