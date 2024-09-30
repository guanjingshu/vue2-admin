import {addResizeListener, removeResizeListener} from 'element-ui/src/utils/resize-event'

const doRisize = (el, binding, vnode) => {
    const { componentInstance:$table } = vnode

    const {value} = binding
    if(!$table.height){
        throw new Error('el-table must have a height.Such as: <el-table :height="300"')
    }

    const bottomOffset = (value && value.bottomOffset) || 30

    if(!$table) return
    const height = window.innerHeight - el.getBoundingClientRect().top - bottomOffset
    $table.layout.setHeight(height)
    $table.doLayout()
}

export default {
    bind(el, binding, vnode) {
        el.resizeListener = ()=>{
            doRisize(el, binding, vnode)
        }
        addResizeListener(window.document.body, el.resizeListener)
    },
    inserted(el, binding, vnode) {
        doRisize(el, binding, vnode)
    },
    unbind(el) {
        removeResizeListener(window.document.body, el.resizeListener)
    }
}