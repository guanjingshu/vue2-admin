<template>
  <el-pagination
    background
    :current-page.sync="childMsg.page_num"
    :page-sizes="[50, 100, 150, 200]"
    :page-size.sync="childMsg.page_size"
    layout="total, sizes, prev, pager, next, jumper"
    :total="childMsg.total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :hide-on-single-page="IsDisplayPaging"
    prev-text=" < 上一页"
    next-text="下一页 >"
  ></el-pagination>
</template>
<script>
export default {
  name: "Pagination",
  props: {
    childMsg: {
      required: true,
      type: Object,
      default: () => {
        return {
          
        };
      },
    },
    // IsDisplayPaging: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  data(){
    return {
        pageparm: {
            page_num: this.childMsg.page_num,
            page_size: this.childMsg.page_size,
            total: this.childMsg.total,
        }
    };
  },
  computed: {
    IsDisplayPaging(){
        // return this.childMsg.page_size < this.childMsg.total
    }
  },
  mounted() {
    let pageText = document.getElementsByClassName('el-pagination__jump')[0]
    if(pageText) {
        pageText.childNodes[0].nodeValue = '跳至'
    }  
  },
  methods: {
    handleSizeChange(val) {
        /**
         * 子传父
         * 参数1 父元素方法
         * 参数2 数据
         */
        this.pageparm.page_size = val;
        let pageMax = Math.ceil(this.childMsg.total / val);
        if (this.childMsg.page_num > pageMax) {
          this.pageparm.page_num = pageMax;
          return
        }
        if(this.pageparm.page_num === 0) {
            this.pageparm.page_num = 1;

        }

      this.$emit("callFather", this.pageparm);
    },
    handleCurrentChange(val) {
        this.pageparm.page_num = val;
      this.$emit("callFather", val);
    },
  },
};
</script>
