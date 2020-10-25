<template>
  <div class="goods">
    <goods-item
      v-for="item in goods"
      :goodsitem="item"
      :goodsType="goodsType"
      :key="item.iid"
    ></goods-item>
  </div>
</template>

<script>
import goodsItem from "./goodsItem";

export default {
  name: "goods",
  components: {
    goodsItem,
  },
  props: {
    goods: {
      type: Array, //商品信息
      defaul() {
        return [];
      },
    },
    goodsType: String, //商品分类
  },
  methods: {},
  created() {},
};
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 0 5px;
}
</style>