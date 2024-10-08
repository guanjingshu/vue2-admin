<template>
    <div class="aligncenter">
        <el-radio-group size="small" v-model="radioType" class="rowbetween" @change="handleChange">
            <el-radio v-for="item in list" :key="item.label" :label="item.label">{{ item.name }}</el-radio>
        </el-radio-group>
    </div>
</template>
<script>
export default {
    name: "radio-group",
    props: {
        list: {
            type: Array,
            default: () => [{name:'按条线',label:'all'},{name:'按条线+赛道',label:'part'}]

        }
    },

    data() {
        return {
            radioType: this.list[0].label
        }
    },
    methods: {
        handleChange(item) {
            this.$emit('radio-change', item)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>