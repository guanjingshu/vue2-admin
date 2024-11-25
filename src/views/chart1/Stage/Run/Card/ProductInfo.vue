<template>
  <div re="canvasBox" class="mt12">
    <section class="rowbetween aligncenter bcwhite">
      <div class="flex1">
        <ConnectPie
          :sourceData="tableData"
          @setExpandRowKeys="setExpandRowKeys"
        />
      </div>
      <div class="flex1 rowstart">
        <ProductTable
          class="flex1"
          :tableData="tableData"
          :expandRowKeys="expandRowKeys"
        />
      </div>
    </section>
  </div>
</template>
<script>
import ConnectPie from "../Chart/ConnectPie.vue";
import ProductTable from "../Table/Product.vue";
export default {
  name: "ProductInfo",
  components: {
    ConnectPie,
    ProductTable,
  },
  props: {
    tableData: {
      type: Array,
      default: () => [
        {
          id: 1,
          test: "持续开放",
          percent: 20,
          color: "#faab0c",
          children: [
            { id: 11, test: "持续开放", percent: 20, color: "#df4545" },
            { id: 12, test: "持续开放", percent: 20, color: "#df64ac" },
          ],
        },
        {
          id: 2,
          test: "持续开放",
          percent: 20,
          color: "#57a9fb",
          children: [
            { id: 21, test: "持续开放", percent: 20, color: "#df4545" },
          ],
        },
      ],
    },
  },
  watch: {
    tableData: {
      handler(newVal) {
        if (newVal.length > 0) {
          this.expandRowKeys = [newVal[0].id.toString()];
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      expandRowKeys: [],
    };
  },
  methods: {
    setExpandRowKeys(keys) {
      this.expandRowKeys = keys.map((id) => id.toString());
    },
  },
};
</script>
