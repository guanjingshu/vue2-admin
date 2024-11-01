<template>
    <el-tooltip v-if="content" effect="dark" :content="content" :disabled="!content" placement="top">
        <slot />
    </el-tooltip>
    <span v-else><slot /></span>
</template>
<script>
export default {
    props: {
        content: {
            type: String,
            default: ''
        }
    }
}
</script>
