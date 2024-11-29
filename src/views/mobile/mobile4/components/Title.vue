<template>
    <div>
        <section>
            <img :src="img"/>
            <span>{{ title }}</span>
        </section>
        <slot />
    </div>
</template>
<script>
export default {
    props: {
        img: {
            type: String,
            default: '',
            required: true
        },
        title: {
            type: String,
            required: true
        },
    }

}
</script>