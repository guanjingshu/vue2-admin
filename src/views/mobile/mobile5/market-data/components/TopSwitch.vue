<template>
    <div class="top-switch font14 textcenter">
        <div :class="{active: value===0}" @click="$emit('input', 0)">总规模</div>
        <div :class="{active: value===1}" @click="$emit('input', 1)">新产品</div>
        <div :class="{active: value===2}" @click="$emit('input', 2)">货币</div>
        <div :class="{active: value===3}" @click="$emit('input', 3)">非货</div>
    </div>
</template>
<script>
export default {
    name: 'TopSwitch',
    props: {
        value: {
            type: Number,
            default: 0
        }
    }
}
</script>
<style lang="scss" scoped>
@function px2rem($px) {
    @return ($px/37.5) + rem;
}
.top-switch{
    display: flex;
    padding: 8px;
    background-color: #ffffff;
    >div {
        flex: 0 0 25%;
        color: #646566;
        font-weight: 350;
        height: px2rem(28);
        line-height: px2rem(28);
        &.active{
            background: #EBF1Fe;
            border-radius: 3px;
            color: #3573F3;
            font-weight: 600;
        }
    }
}
</style>