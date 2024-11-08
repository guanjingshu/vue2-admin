<template>
    <div>
        <div class="nodata">
            <img :src="require('@/assets/404_images/404.png')" class="blank nodataimg"/>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.nodata{
    height: 90vh;
    background-color: #fff;
    .blank{
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .nodataimg {
        width: 100px;
        height: 100px;
    }
}

</style>