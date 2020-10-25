<template>
  <div class="goods-item" @click="goodclick">
    <img
      v-lazy="goodsitem.show.img"
      :style="{ width: goodsitem.show.w, height: goodsitem.show.h }"
      @load="imgLoad"
    />
    <div>
      <span>{{ goodsitem.title }}</span>
      <!-- <span>{{goodsitem.width}}</span> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "goodsItem",
  data() {
    return {
      iid: null,
    };
  },
  props: {
    goodsitem: {
      type: Object,
      defaul() {
        return {};
      },
    },
    goodsType: String,
  },
  methods: {
    imgLoad() {
      this.$bus.$emit("imgIsLoad");
    },
    goodclick() {
      this.iid = this.goodsitem.iid;
      // this.$route.params.iid = this.iid;
      // this.$router.push({
      //   path: "/details",
      //   query: {
      //     iid: this.iid,
      //   },
      // });

      this.$router.push("/details/" + this.iid);
      // console.log(this.goodsitem.iid);
    },
  },
  // mounted() {
  //   this.$nextTick(() => this.$bus.$emit("imgIsLoad"));
  // },
  beforeUpdate() {
    this.$bus.$emit("homePageBeforeUpdate", this.goodsType);
  },
};
</script>


<style scoped>
.goods-item {
  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 10px;
}
</style>