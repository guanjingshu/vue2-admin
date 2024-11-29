<template>
  <div class="container">
    <!-- <SetWaterMark > -->
    333
        <FilterBox class="shadow" @change="filterChange" />
    <!-- </SetWaterMark> -->
  </div>
</template>
<script>
import SetWaterMark from "@/components/SetWaterMark.vue";
import FilterBox from "./components/Filter.vue";
export default {
  name: "PurchaseRedeemMonitor",
  components: {
    SetWaterMark,
    FilterBox
  },
  methods: {
    filterChange() {},
  }
};
</script>
<style lang="scss" scoped>
.container{
    width: 100%;
    height: 100vh;
    background: lightgoldenrodyellow;
}
</style>
