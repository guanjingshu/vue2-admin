<template>
  <span class="filter-label">
    <span class="rowcenter bcebf1fe bd3573f3 radius12">{{ name }}</span>
  </span>
</template>
<script>
export default {
  name: "Label",
  props: {
    name: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped>
.filter-label {
  .bcebf1fe {
    background-color: #bcebf1fe;
  }
  .bd3573f3 {
    border: 1px solid #3573f3;
  }
  .radius12 {
    border-radius: 12px;
  }
}
</style>
