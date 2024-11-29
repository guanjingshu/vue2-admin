<template>
    <div>
        <ProfitsCompareBase :profitsData="profitsData"></ProfitsCompareBase>
    </div>
</template>
<script>
import ProfitsCompareBase from './Card/ProfitsCompareBase.vue';
export default {
    name: 'NearExpired',
    components: { ProfitsCompareBase },
    data() {
        return {
            profitsData: {max: 100, min: 0,
            x_list:["0BP以下","0BP以上","0BP以下","0BP以下","0BP以下","0BP以上","0BP以下","0BP以下","0BP以下","0BP以上","0BP以下","0BP以下","0BP以下","0BP以上","0BP以下","0BP以下",
                "0BP以下","0BP以上","0BP以下","0BP以下","0BP以下","0BP以上","0BP以下","0BP以下","0BP以下","0BP以上","0BP以下","0BP以下","0BP以下","0BP以上","0BP以下","0BP以下",
            ],
            y_list:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
        }
    },
    mounted() {
        console.log('create')
    }
}
</script>
<style lang="scss" scoped></style>