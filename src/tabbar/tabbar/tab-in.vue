<template>
  <div class="tab-in" @click="tabRouter" :class="{tabBg:isBg}">
    <!-- <h2>tabbar</h2> -->
    <slot name="tab-img-unselected"></slot>
    <slot name="tab-img-selected"></slot>
    <slot name="classify"></slot>
  </div>
</template>

<script>
export default {
  name: "tab-in",
  props: {
    path: String,
  },
  data() {
    return {
      bg: true,
    };
  },
  methods: {
    tabRouter() {
      // console.log(1);
      this.$router.replace(this.path);
    },
  },
  computed: {
    isBg() {
      return this.$route.path == this.path ? (this.bg = true) : !this.bg;
    },
  },
};
</script>

<style scoped>
/* .tab-in {
  align-self: center;
} */
.tab-in {
  /* display: line; */
  flex: 1;
}
.tabBg {
  background-color: pink;
}
</style>