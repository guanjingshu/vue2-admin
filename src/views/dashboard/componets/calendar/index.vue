<template>
  <div><el-calendar v-model="value"> </el-calendar></div>
</template>
<script>
export default {
  data() {
    return {
      value: new Date(),
    };
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-calendar-table td {
  // border-top: 2px solid #fff;
  // border-bottom: 2px solid #fff;
  // border-left: 2px solid #fff;
  // border-right: 2px solid #fff;
  
}
</style>
