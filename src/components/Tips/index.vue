<script>
export default {
    props: {
        label: {
            type: String,
            default: ''
        }
    },
    render(){
        console.log("this.$slots.default",this.$slots.default,this.label)
        return (
            <span>
               {h("span",{},[
                    h("span",{},this.label),
                    h("el-popover",{props:{placement:"top",popperClass:"table-header-popover",trigger:"hover"}},[
                        h("div",{},[
                            h("span",{style:"vertical-align:-0.2em;font-size:20px;"},this.$slots.default),
                            
                        ]),
                        h("i",{slot:"reference",style:"margin-left:5px",class:"el-icon-warning-outline"},"")
                    ])
               ])} 
                
            </span>
        )
    }
}
</script>