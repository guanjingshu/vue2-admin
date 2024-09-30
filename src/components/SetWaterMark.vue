<template>
    <div class="relative" ref="image" id="image">
        <slot></slot>
    </div>
</template>
<script>
import { getWaterMark } from "@/utils/index.js";
export default {
    name: "SetWaterMark",
    data() {
        return {
            userName: "",
        };
    },
    created() {
        this.$nextTick(()=>{
            this.getImage();
        })
    },
    methods: {
        async getImage(){
            const dom = document.getElementById('image');
            if(!this.userName){
                this.userName = await this.getAuthToken();
            }
            if(!document.getElementById(watermark_id)){
                dom.appendChild(getWaterMark(dom, this.userName))
            }
        },
        async getAuthToken(){
            let res = {};
            try {
                // res = await getAuth({})
            } catch (error) {
                res = {}
            }
            this.userName = res.ssoName || 'test';
            return res.ssoName;
        }
    }
    }
</script>