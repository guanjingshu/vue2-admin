<template>
  <span class="cube-box size8" :style="{ backgroundColor: color }"></span>
</template>
<script>
// 放块组件
export default {
  name: "Cube",
  props: {
    color: {
      type: String,
      default: "#F1924E",
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.cube-box {
  display: inline-block;
}
</style>
