<template>
  <div class="grid-container" :class="{ disabled: disabled }">
    <GridItem v-for="item in list" :key="item.label" :label="item.label" :actived="currItem && item.label === currItem.label" @click="chooseItem(item)"></GridItem>
  </div>
</template>
<script>
import GridItem from "./GridItem.vue";
export default {
  name: "Grid",
  components: {
    GridItem,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default: () => [
        { label: "财富-固收" },
        { label: "财富-固收" },
        { label: "财富-固收" },
        { label: "财富-固收" },
      ],
    },
  },
  data() {
    return {
      currItem: null,
    };
  },
  methods: {
    checkActived(item) {
      return item.label === this.currItem?.label;
    },
    chooseItem(item) {
      if (this.currItem === item) return;
      this.currItem = item;
      // this.$emit("choose-item", item);
    },
    
    clearItem() {
      this.currItem = null;
    },
  },
  mounted() {},
  watch: {},
};
</script>
<style lang="scss">
.grid-container{
  display: grid;
  grid-gap: 12px 12px;
  grid-template-columns: auto auto auto;
}
</style>
