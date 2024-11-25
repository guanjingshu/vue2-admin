<template>
  <!-- @click="handleExport()" -->
  <div ref="canvasBox" id="content" class="performance" >
  <!-- <div v-for="item in 100" :key="item">test</div> -->
    <Title title="业绩表现11" class="h60 bcwhite px20 font20" hasBorder>
      <template #sub>
        <Tips>建设中</Tips>
        <div class="flex1 rowstart">
          <el-checkbox-group v-model="checkList" class="">
            <el-checkbox
              v-for="(item, index) in bankList"
              :key="item.name"
              :label="item.name"
              :class="`checkbox${index + 1}`"
            ></el-checkbox>
          </el-checkbox-group>
        </div>
      </template>

      <template #suffix>
        <!-- <span class="font12">单位：万元</span> -->
        <GotoDetail @click="gotoDetail()" />
      </template>
    </Title>
    <Download/>
    <!-- <span class="point" @click="downloadImg('canvasBox')">
      <i v-if="!loadingImg" class="el-icon-download"></i>
      <i v-if="loadingImg" class="el-icon-loading"></i>
    </span> -->
    <section class="grid-box">
      <div class="grid-item bcwhite py14 px20 bdright1 bdbottom1">
        <BarAndLine :barWidth="40" />
      </div>
      <div class="grid-item bcwhite py14 px20 bdright1 bdbottom1">
        <BarAndLine barColor="#a6d645" :barWidth="40" />
      </div>
      <div class="grid-item bcwhite py14 px20 bdright1 bdbottom1">
        <BarAndLine barColor="#51b9c3" :barWidth="40" />
      </div>
      <div class="grid-item bcwhite py14 px20 bdright1 bdbottom1">
        <BarAndLine barColor="#A973df" :barWidth="40" />
      </div>
      <div class="grid-item bcwhite py14 px20 bdright1 bdbottom1">
        <BarAndLine barColor="#faab0c" :barWidth="40" />
      </div>
    </section>
  </div>
</template>
<script>
import BarAndLine from '../Chart/BarAndLine.vue'
import BarGroup from '../Chart/BarGroup.vue'
import Title from '../components/Title/index.vue'
import GotoDetail from '../components/GotoDetail.vue'
import Download from '../components/Download.vue'
import Tips from "@/components/Tips"
import html2canvas from 'html2canvas'
import jspdf from "jspdf";
import domtoimage from 'dom-to-image'
import { testData } from './data'
export default {
    name: 'Performance',
    components: {
        BarAndLine,
        BarGroup,
        Title,
        GotoDetail,
        Download,
        Tips
    },
    data() {
        return {
            checkList: ['本时','本日','本周','本月','本年'],
            bankList: [{name:'本时'},{name:'本日'},{name:'本周'},{name:'本月'},{name:'本年'}],
            loadingImg: false //是否正在下载图片
        }
    },
    methods: {
        gotoDetail() {
            this.$router.push('/chart2')
        },
        handleExport(){//导出功能
            this.downloadPDF(this.$refs.canvasBox)
        },
        downloadPDF(page){
            domtoimage.toPng(page).then((dataUrl) =>{
                this.canvas2PDF2(dataUrl)
            })
        },
        canvas2PDF2(dataUrl){
            const contentWidth = this.$refs.canvasBox.offsetWidth;
            const contentHeight = this.$refs.canvasBox.offsetHeight;
            let pageHeight = contentWidth / 592.28 * 841.89;
            let leftHeight = contentHeight;
            //页面偏移
            var position = 0;
            //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
            var imgWidth = 595.28; // A4 宽度
            var imgHeight = 592.28/contentWidth * contentHeight; // A4总高度
            var pageData = dataUrl;
            var pdf = new jspdf('', 'pt', 'a4');
            //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
            //当内容未超过pdf一页显示的范围，无需分页
            if (leftHeight < pageHeight) {
                pdf.addImage(pageData, 'PNG', 10, 0, imgWidth-20, imgHeight );


            } else {
                while(leftHeight > 0) {
                    pdf.addImage(pageData, 'PNG', 10, position, imgWidth-20, imgHeight)
                    leftHeight -= pageHeight;
                    position -= 841.89;
                    //避免添加空白页
                    if(leftHeight > 0) {
                        pdf.addPage();
                    }
                }
            }
            pdf.save('content.pdf');

        },
        toPdf(){//知乎直接复制版（效果没出来）
            const contentBox = document.querySelector('#content');
            let domHeight = contentBox.offsetHeight;
            let maxHeight = 64257;
            html2canvas(contentBox, {
                useCORS: true, // 如果截图的内容里有图片,可能会有跨域的情况,加上这个参数,解决文件跨域问题
                scale: (maxHeight/domHeight) > 1 ? 1: (maxHeight/domHeight)
            }).then((canvas) => {
                const contentWidth = canvas.width;
                const contentHeight = canvas.height;
                let pageHeight = contentWidth / 592.28 * 841.89;
                let leftHeight = contentHeight;
                //页面偏移
                var position = 0;
                //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                var imgWidth = 595.28; // A4 宽度
                var imgHeight = 592.28/contentWidth * contentHeight; // A4总高度
                var pageData = canvas.toDataURL('image/jpeg', 1.0);
                var pdf = new jspdf('', 'pt', 'a4');
                //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
                //当内容未超过pdf一页显示的范围，无需分页
                if (leftHeight < pageHeight) {
                    pdf.addImage(pageData, 'JPEG', 10, 0, imgWidth-20, imgHeight );
                } else {
                    while(leftHeight > 0) {
                        pdf.addImage(pageData, 'JPEG', 10, position, imgWidth-20, imgHeight)
                        leftHeight -= pageHeight;
                        position -= 841.89;
                        //避免添加空白页
                        if(leftHeight > 0) {
                            pdf.addPage();
                        }
                    }
                }
                pdf.save(fileName)
            })
        },
       async downloadImg(refName) {
            try {
                this.loadingImg = true
                const dom = this.$refs[refName]
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

<style lang="scss" scoped>
::v-deep .el-checkbox {
  margin-right: 7px;
}
::v-deep .el-checkbox__label {
  margin-left: 2px;
}
// -------------3小时----------------
$full: (#df4545, #f1924e, #1364b6, #df64ac, #9b0000);

@for $i from 1 through length($full) {
  ::v-deep .checkbox#{$i}.is-checked {
    .el-checkbox__inner {
      background-color: nth($full, $i);
      border-color: nth($full, $i);
    }
    .el-checkbox__label {
      color: nth($full, $i);
    }
  }

  ::v-deep .checkbox#{$i} .el-checkbox__inner {
    border-color: nth($full, $i);
  }
}
// -------------3小时 end----------------
.py14 {
  padding: 14px 0;
}
.px20 {
  padding: 0 20px;
}
.bdright1 {
  border-right: 1px solid #e1e4ea;
}
.bdbottom1 {
  border-bottom: 1px solid #e1e4ea;
}
.performance {
  .grid-box {
    display: grid;
    grid-gap: 0px 0px;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    .grid-item:last-child {
      grid-column: span 2;
    }
  }
}
</style>
