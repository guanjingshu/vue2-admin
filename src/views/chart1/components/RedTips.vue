<template>
    <div class="pl12 aligncenter">
        <span class="h36">{{ name }}</span>
        <span class="h24 rowstart">
            <span class="">{{ value }}</span>
            <span class="">{{ value2 }}</span>
        </span>
    </div>
</template>
<script>
export default {
    props: {
        name: {
            type: String,
            default: ''
        },
        value: {
            type: String,
            default: ''
        },
        value2: {
            type: String,
            default: ''
        }
    }
}
</script>