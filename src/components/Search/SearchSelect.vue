<template>
    <div class="search-select">
        <el-select v-model="value" clearable :placeholder="`请选择${SearchSelectOption.label}`">
            <el-option v-for="item in SearchSelectOption.list" :key="item.id" :value="item.label" :label="item.label"></el-option>
        </el-select>
    </div>
</template>
<script>
export default {
    name: 'SearchSelect',
    props: {
        SearchSelectOption: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            value: this.SearchSelectOption.defaultValue
        }
    }
}
</script>
<style lang="scss" scoped></style>