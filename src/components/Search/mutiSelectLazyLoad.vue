<template>
  <el-popover
    popper-class="popover-dimension-setting"
    placement="bottom-start"
    trigger="click"
    v-model="showSelect"
  >
    <div class="maxh500 scroll" @scroll="handleScroll">
      <div v-for="item in selectData" :key="item.label" class="">
        <div class="hover-style aligncenter">
          <el-checkbox
            :label="item.prop"
            class="ml5"
            v-model="item.selected"
            @change="actionSelectData(item)"
          >
            {{ item.label | filterValue }}
          </el-checkbox>
        </div>
      </div>
    </div>
    <div slot="reference" class="rowstart aligncenter">
      <div class="dimension-select" :style="this.focus_style">
        <div class="rowstart">
          <div v-if="checkData.length > 0" class="rowstart aligncenter">
            <div class="tag rowbetween aligncenter">
              <div class="font14">
                {{ checkedData[0].label | filterCheckedValue }}
              </div>
              <!-- <img
                class="size8"
                :src="require('@/assets/images/icon-close.png')"
                @click.stop.prevent="actionDeleteTag(checkedData[0])"
              /> -->
            </div>
            <div v-if="checkedData.length > 1" class="num">
              {{ checkedData.length }}
            </div>
          </div>
          <el-input
            @foucus="onInputFocus"
            @blur="onInputBlur"
            @input="fullSearchHandler"
            :value="userVal"
            type="text"
            ref="search"
            :placeholder="placeHolder"
            class="search-input"
          ></el-input>
        </div>
        <i
          class="el-icon-error"
          v-if="checkedData.length > 0 && showSelect == true"
          @click="actionDeleteAll"
          style="color: #191919; opacity: 0.4"
        ></i>
        <i
          class="el-icon-arrow-down"
          v-if="checkedData.length == 0 && showSelect == false"
          @click="actionDeleteAll"
          style="color: #191919; opacity: 0.4"
        ></i>
        <i
          class="el-icon-arrow-up"
          v-if="checkedData.length == 0 && showSelect == true"
          @click="actionDeleteAll"
          style="color: #191919; opacity: 0.4"
        ></i>
      </div>
    </div>
  </el-popover>
</template>
<script>
export default {
  name: "mutiSelectLazyLoad",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    allData: {
      type: Object,
      default: () => ({}),
    },
    placeHolder: {
      type: String,
      default: () => "",
    },
  },
  filters: {},
};
</script>
