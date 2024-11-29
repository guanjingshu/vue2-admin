<template>
    <div>
       <Bar :barWidth="40" barColor="#57a9fb" :showLine="false" :profitsData="profitsDataProp"/> 
    </div>
</template>
<script>
import Bar from '../Chart/Bar.vue'
export default {
    name: 'ProfitsCompareBase',
    components: {
        Bar
    },
    props: {
        profitsData: {
            type: Object,
            default: () => ({})
        }
    },
    data(){
        return {
            profitsDataProp: this.profitsData
        }

    }
    
}

</script>