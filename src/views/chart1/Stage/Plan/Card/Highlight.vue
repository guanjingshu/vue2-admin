<template>
    <div class="mt12">
        <div class="bcwhite rowbetween aligncenter">
            <Focus />
            <section class="rowstart flex1">
                <RedTips class="mr12" name="111" value="12" value2="12"></RedTips>
                <RedTips class="mr12" name="111" value="12" value2="12"></RedTips>
            </section>
            <GotoDetail @click="GotoDetail()"/>
        </div>
    </div>
</template>
<script>
import Focus from '../../../components/Focus'
import RedTips from '../../../components/RedTips'
import GotoDetail from '../../../components/GotoDetail'
export default {
    components: {
        Focus,
        RedTips,
        GotoDetail
    }
}
</script>