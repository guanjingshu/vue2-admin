## 总结
--- 2024年12月3日17:00:08
> 1. 事件绑定
```js
<el-date-picker @change="actionDateChange"></el-date-picker>
actionDateChange(val){this.$emit('actionDateChange',val)}//别的组件不自定义actionDateChange，也不会报错，因为父组件没有监听这个事件
```
