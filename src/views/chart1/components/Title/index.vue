<template>
  <div class="rowbetween" :class="{ bb1: hasBorder }">
    <section class="rowstart aligncenter flex1">
      <slot name="prefix" />{{ title }}<slot name="sub" />
    </section>
    <section class=""><slot name="suffix" /></section>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    hasBorder: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
.bb1 {
  border-bottom: 1px solid #e4e7ed;
}
</style>

