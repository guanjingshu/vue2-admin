<template>
  <SearchPanel
    ref="search"
    :searchData="searchData"
    @actionSearch="actionSearch"
  />
</template>
<script>
export default {
  name: "SearchPanelWrapper",
  data() {
    return {
      searchData: [
        { name: "start_at--end_at", content: "test", inputType: "daterange" },
      ],
    };
  },
  methods: {
    actionSearch(form) {
      console.log("196", form);
    },
  },
};
</script>
