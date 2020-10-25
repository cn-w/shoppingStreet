<template>
  <div class="recommod">
    <div v-for="item in recommods" class="recommod-item">
      <a :href="item.link">
        <img :src="item.image" alt />
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "homerecommod",
  props: {
    recommods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.recommod {
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: space-around;
  margin: 10px 0;
}

.recommod div {
  flex: 1;
}

.recommod img,
.recommod a {
  width: 90%;
  /* height: 90%; */
}

.recommod-item {
  /* height: 50px; */
}
</style>