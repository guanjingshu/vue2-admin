<template>
     <span class="point" @click="downloadImg('canvasBox')">
      <i v-if="!loadingImg" class="el-icon-download"></i>
      <i v-if="loadingImg" class="el-icon-loading"></i>
    </span>
</template>
<script>
import html2canvas from 'html2canvas'
export default {
    props: {
        refName: {
            type: String,
            default: 'canvasBox'
        }
    },
    data() {
        return {
            loadingImg: false
        }
    },
    methods: {
        async downloadImg(refName) {
            try {
                this.loadingImg = true
                const dom = this.$parent.$refs[refName]
                const canvas = await html2canvas(dom, {
                    useCORS: true,
                    width: dom.clientWidth,
                    height: dom.clientHeight,
                })

                var link = document.createElement('a')
                link.download="page.png"
                link.href = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
                link.click()
                this.loadingImg = false
            } catch (error) {
                this.loadingImg = false
            }
        }
    }

}
</script>