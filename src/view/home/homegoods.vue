<template>
  <div>
    <!-- <goods v-for="index in homegoods" :goods="index.list"></goods> -->
    <!-- <goods :goods="homegoods.news.list"></goods> -->
    <goods :goods="homegoods" :goodsType="goodsType"></goods>
  </div>
</template>

<script>
import goods from "../../components/goods/goods";

export default {
  name: "homeControl",
  props: {
    homegoods: {
      type: Array,
      defaul() {
        return [];
      },
    },
    goodsType: String,
  },
  components: {
    goods,
  },
  created() {
    // console.log(this.homegoods);
  },
};
</script>