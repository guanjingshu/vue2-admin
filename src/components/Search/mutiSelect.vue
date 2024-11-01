<template>
    <el-popover popper-class="popover-dimension-setting" placement="bottom-start" trigger="click" v-model="showSelect">
        <div class="scroll">
            <div v-for="(item) in selectData" :key="item.id" class="">
                <div class="aligncenter">
                    <el-checkbox :label="item.prop" class="ml5" v-model="item.selected" @change="actionSelectData(item)">
                    {{item.label | filterValue}}</el-checkbox>
                </div>
            </div>
        </div>
        <div slot="reference" class="rowstart aligncenter">
            <div class="dimension-select rowbetween aligncenter" :style="this.focus_style">
                <div class="rowstart">
                    <div v-if="checkedData.length > 0" class="rowstart">
                        <div class="font14">{{ checkedData[0].label | filterCheckedValue }} </div>
                        <div @click.stop.prevent="actionDeleteTag(checkedData(checkedData[0]))">删除</div>
                    </div>
                </div>
                <i class="el-icon-error" v-if="checkedData.length > 0&&showSelect==true" @click="actionDeleteAll" style="color: #191919;opacity:0.4"></i>
                <i class="el-icon-arrow-down" v-if="checkedData.length == 0 && showSelect==false"  style="color: #191919;opacity:0.4"></i>
                <i class="el-icon-arrow-up" v-if="checkedData.length == 0 && showSelect==true"  style="color: #191919;opacity:0.4"></i>
            </div>
        </div>
    </el-popover>
</template>
<script>
export default {
    name: 'mutiSelect',

    data() {
        return {
            showSelect: false,
            focus_style: '',
            searchValue: '',
            checkedData: [],
        }
    },
    props: {
        data: {
            type: Array,
            default: () => []
        },
        value: {
            type: Array,
            default: () => []
        },
        placeHolder: {
            type: String,
            default: () => ("")
        },
    },
    computed: {
      selectData() {
        if(this.searchValue){
            return this.data.filter((item)=>{
                return item.label.indexOf(this.searchValue) > -1
            })
        }  else {
            return this.data

        }
      },
    },
    watch: {
     value: { //from v-model
         handler(newVal) {
             if(Array.isArray(newVal) && newVal.length > 0){
                this.data.forEach((item,index)=>{
                    this.data[index].selected = false
                })
                newVal.forEach((item)=>{
                    const index = this.data.findIndex(option => option.label.split(',')[0] === item.productCode)
                    if(index > -1){
                        this.data[index].selected = true
                    }
                })
                this.actionSelectData()
             }
         },
         immediate: true,
     }
    },
    filters: {
        filterValue(val) {
            if(val.length > 0){
                let arr = val.split(',')
                // 拼接成字符串
                return arr.length >= 5 ? arr[0] + '-' + arr[4] : val
            }
            return ''
        },
        filterCheckedValue(val) {
            if(val.length > 0){
                let arr = val.split(',')
                    return arr[0]
            }
            return '';
        }
    },
    methods: {
        actionSelectData(item) {
            let key = null
            this.checkedData = this.data.filter((item)=>{
                key = item.name
                return item.selected
            })
            let tempArr = this.checkedData.map((item)=>{
                let proCode = item.label.split(',')[0]
                return proCode
            })
            let form = {}
            form[key]=tempArr
            this.$emit('setMutiSelectFormData', form)
        },
        actionDeleteTag(tag) {
            let key = null
            for(let obj of this.data){
                if(obj.label == tag.label && obj.name== tag.name){
                    obj.selected = false
                }
                key = obj.name
            }
            this.checkedData = this.data.filter((item)=>{
                return item.selected
            })
            let tempArr = this.checkedData.map((item)=>{
                let proCode = item.label.split(',')[0]
                return proCode
            })
            let form = {}
            form[key]=tempArr
            this.$emit('setMutiSelectFormData', form)
        },
        actionDeleteAll() {
            let key = null
            for(const item of this.data){
                key = item.name
            }
            let form = {}
            form[key]=[]
            this.clearCheckKeys()
            this.$emit('setMutiSelectFormData', form)

        },
        clearCheckKeys() {
            this.searchValue = ''
            this.checkedData = []
            for(let item of this.selectData){
                item.selected = false
            }
        }
    },
    
}
</script>
<style lang="scss" scoped>
.dimension-select{
    border: 1px solid rgba(225, 228, 234, 1);
    border-radius: 4px;
width: 220px;
height: 32px;
padding-right: 10px;
}
</style>