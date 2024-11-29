<template>
  <div class="container">
    <SetWaterMark >
        <ChannelOutItem></ChannelOutItem>
    </SetWaterMark>
  </div>
</template>
<script>
import SetWaterMark from "@/components/SetWaterMark.vue";
import ChannelOutItem from "./components/ChannelOutItem.vue";
export default {
  name: "PurchaseRedeemMonitor",
  components: {
    SetWaterMark,
    ChannelOutItem
  },
};
</script>
<style lang="scss" scoped>
.container{
    width: 100%;
    height: 100vh;
    background: lightgoldenrodyellow;
}
</style>
