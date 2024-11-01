<template>
  <el-popover
    popper-class="del-popper-buttom"
    trigger="hover"
    placement="top"
    width="233"
    ref="popoverConfirm"
  >
    <div class="delete_con_confirm">
      <div class="tips tips_te">
        <i class="el-icon-info" color="#ffab00"></i>{{ message }}
      </div>
      <div class="btns">
        <span class="point" @click="onCancel">取消</span>
        <span class="point" @click="$emit('confirm')">确定</span>
      </div>
    </div>
    <span slot="reference" @click="showDialog()"><slot /></span>
  </el-popover>
</template>
<script>
export default {
  name: "Confirm",
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  methods: {
    showDialog() {
      this.$refs.popoverConfirm.doShow();
    },
    onCancel() {
      this.$refs.popoverConfirm.doClose();
    },
  },
};
</script>
<style lang="scss" scoped>
.delete_con_confirm {
  .tips {
    text-align: center;
    margin-top: 13px;
    margin-bottom: 13px;
    line-height: 22px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
    width: fit-content;
    i {
      margin-right: 5px;
      color: #ffab00;
    }
  }
  .tips_te {
    text-align: left !important;
      margin-left: 20px;
  }
  .btns {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
    span {
      font-size: 12px;
      width: 50px;
      display: flex;
      align-items: center;
      height: 22px;
      justify-content: center;

    }
    span:first-child {
        background-color: #fff;
        border: 1px solid rgba(53, 115, 243, 1);
        border-radius: 2px;
        color: #3573f3;

    }
    span:last-child {
        background-color: #3573f3;
        border-radius: 2px;
        color: #fff;
        margin-left: 10px;
        margin-right: 16px;
    }
  }
}
</style>
