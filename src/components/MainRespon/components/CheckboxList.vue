<template>
  <div
    class="wrapper-box"
    ref="checkboxlist"
    @touchstart.stop="onTouchStart"
    @touchmove.stop="onTouchMove"
    @touchend.stop="onTouchEnd"
  >
    <!-- {{ showList }} -->
    <div class="scroll-box">
      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <van-cell-group>
          <van-cell
            v-for="(row, index) in showList"
            :key="index"
            :title="row.label"
            class="aligncenter"
            :class="{ actived: result.includes(row.label) }"
            clickable
            @click="checkItem(index)"
          >
            <template #icon>
              <span
                class="relative aligncenter"
                :data-index="index"
                :data-label="row.label"
                @touchstart.stop.prevent="handleTouchStart"
                @touchmove.stop.prevent="handleTouchMove"
                @touchend.stop.prevent="handleTouchEnd"
              >
                <img :src="require('@/images/zz.png')" class="checkbox-img" style="width: 30px;height: 30px" />
                <span class="absolute toucharea"></span>
              </span>
            </template>
            <template #right-icon>
              <van-checkbox
                :name="row.label"
                v-model="row.checked"
                ref="checkboxes"
              /></template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </div>
  </div>
</template>
<script>
export default {
  name: "CheckboxList",
  props: {
    searchValue: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    list: {
      handler(newVal, oldVal) {
        this.result = [];
        this.managerList = [...newVal];
      },
    },
  },
  computed: {
    showList() {
      // const checkedList = this.result.map((label) => {
      //   return this.managerList.find((row) => row.label === label);
      // });
      // return [
      //   ...checkedList,
      //   ...this.managerList.filter((row) => !this.result.includes(row.label)),
      // ].filter((row) => row.label.includes(this.searchValue));

      const checkedList = this.result.map((label) =>
        this.managerList.find((row) => row.label === label)
      );
      return [
        ...checkedList,
        ...this.managerList.filter((row) => !this.result.includes(row.label)),
      ].filter((row) => row.label.includes(this.searchValue));
    },
  },
  mounted() {
    // this.$nextTick(
    // },
  },
  data() {
    return {
      result: [],
      managerList: [...this.list],
      startX: 0,
      startY: 0,
      moveX: 0,
      moveY: 0,
      draggedItem: null,
      wrapperId: ".wrapper-box",
    };
  },
  methods: {
    checkItem(index) {
      this.$refs.checkboxes[index].toggle();
    },
    handleTouchStart(evt) {
      evt.preventDefault();
      const touch = evt.touches[0];
      this.draggedItem = evt.target.parentElement;
      if (!this.result.includes(this.draggedItem.dataset.label)) {
        this.draggedItem = null;
        return;
      }
      this.startX = touch.pageX;
      this.startY = touch.pageY;
    },
    handleTouchMove(evt) {
      evt.preventDefault();
      if (this.result.length <= 1 || this.draggedItem == null) return;
      const touch = evt.touches[0];
      this.moveX = touch.clientX - this.startX;
      this.moveY = touch.clientY - this.startY;
      this.draggedItem.parentElement.style.transform = `translateY(${this.moveX}px)`
      this.draggedItem.parentElement.style.opacity = "0.2";
      this.draggedItem.parentElement.style["z-index"] = "100";
    },
    handleTouchEnd(evt) {
      if (this.result.length <= 1 || this.draggedItem == null) return;
      if (this.result.length <= 1) {
        this.draggedItem.parentElement.style.transform = "";
        this.draggedItem.parentElement.style.opacity = "1";
        this.draggedItem.parentElement.style["z-index"] = "auto";
        this.startX = 0;
        this.startY = 0;
        this.moveX = 0;
        this.moveY = 0;
        return;
      }
      const draggedItemIndex = parseInt(this.draggedItem.dataset.index);
      const newDraggedItemIndex = this.calcNewIndex(draggedItemIndex);
      if (draggedItemIndex !== newDraggedItemIndex) {
        const tempName = this.result[draggedItemIndex];
        this.$set(
          this.result,
          draggedItemIndex,
          this.result[newDraggedItemIndex]
        );
        this.$set(this.result, newDraggedItemIndex, tempName);
      }
      this.draggedItem.parentElement.style.transform = "";
      this.draggedItem.parentElement.style.opacity = "1";
      this.draggedItem.parentElement.style["z-index"] = "auto";
      this.startX = 0;
      this.startY = 0;
      this.moveX = 0;
      this.moveY = 0;
      // this.draggedItem = null;
    },
    calcNewIndex(currIndex) {
      const threshold = 42;
      // if(this.)
      const moveDirection = this.moveY > 0 ? "down" : "up";
      const itemsLength = this.result.length;
      let newIndex = currIndex;
      if (Math.abs(this.moveY) > threshold) {
        if (moveDirection === "down") {
          newIndex += Math.floor(Math.abs(this.moveY) / threshold);
        } else if (moveDirection === "up") {
          newIndex -= Math.floor(Math.abs(this.moveY) / threshold);
        }
      }
      if (newIndex < 0) newIndex = 0;
      if (newIndex > itemsLength - 1) newIndex = itemsLength - 1;
      return newIndex;
    },
    onTouchStart() {
      this.$refs.checkboxlist.style.overflow = "hidden";
    },
    onTouchMove() {
      this.$refs.checkboxlist.style.overflow = "auto";
    },
    onTouchEnd() {},
  },
};
</script>
<style lang="sass"></style>
