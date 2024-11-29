<template>
  <div class="container">
    <div class="detailitem">
      <div class="rowbetween">
        <div>名字</div>
        <div><van-icon :name="arrowName"></van-icon></div>
      </div>
      <div class="flexbetwen">
        <span>规模</span>
        <div class="flexbetwen">
          <span>占比</span>
          <van-circle
            v-model="current"
            layer-color="#f4f5f7"
            :color="Number(10) == 0 ? '#f4f5f7' : '#0072fc'"
            :rate="50"
            stroke-width="140"
            :speed="140"
            size="10px"
          ></van-circle>
        </div>
      </div>
      <div class="itemContent flexbetwen">
        <div class="flexbetwen">
            <div id="chart" ref="chart"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      arrowName: "arrow-down",
      current: 50,
    };
  },
};
</script>
