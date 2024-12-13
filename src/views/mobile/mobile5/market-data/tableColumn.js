const tableColumn = []
const imgKV = {
    '招银': 'zhaoying',
    '信银': 'xinying',
    '中信': 'zhongxin',
    '民生': 'minsheng',
    '广发': 'guangfa',
    '华夏': 'huaxia',
    '平安': 'pingan',
    '招商': 'zhaoshang',
    '光大': 'guangda',
    '兴业': 'xingye',
    '浦发': 'pufa',
    '国信': 'guoxin',
    '国泰': 'guotai',
    '华泰': 'huatai',
    '光大': 'guangda',
    '国泰': 'guotai',
    '华泰': 'huatai',
    '国信': 'guoxin',
}

{/* <img class="cell_ins-img" src={require(`@/assets/images/ins/${imgKV[scope.row.INS_NAME]}.png`)} alt="" /> */}

const rendInsName = (h, scope)=>{
 return (
    <span class="cell_ins-box rowbetween aligncenter">
        {
            imgKV[scope.row.INS_NAME] ?
            <span>图</span>
            : <span style="display: inline-block; "></span>
        }
        <span class="cell_ins-name">{scope.row.INS_NAME}</span>
    </span>
 )

}

// 总规模
tableColumn[0] = [
    {prop:'INS_NAME', label:'机构', width: 86, minWidth: 86, align: 'left', render: rendInsName},
    {prop:'TOTAL_AMT_LAST_DATE', label:'yyyy-mm-dd',  minWidth: '30%', align: 'right',sortable: "custom"},
    {prop:'TOTAL_AMT_COMPARE_LSTMON',label:'较上月末',minWidth: '30%', align: 'right',sortable: "custom"},
    {prop:'TOTAL_AMT_COMPARE_LSYEAR',label:'较上年末', minWidth: '30%', align: 'right',sortable: "custom"}
]

// 新产品
tableColumn[1] = [
    {prop:'INS_NAME', label:'机构', width: 86, minWidth: 86, align: 'left', render: rendInsName},
    {prop:'NEW_PD_LAST_DATE', label:'yyyy-mm-dd',  minWidth: '30%', align: 'right',sortable: "custom"},
    {prop:'NEW_PD_PCT',label:'占比',minWidth: '30%', align: 'right',sortable: "custom"},
    {prop:'NEW_PD_COMPARE_LSTMON',label:'较上月末', minWidth: '30%', align: 'right',sortable: "custom"},
    {prop:'NEW_PD_COMPARE_LSYEAR',label:'较上年末', minWidth: '30%', align: 'right',sortable: "custom"}
]

// 底部排行 表格用的列配置
const minWidth = ['30%', '30%', '30%', '30%']
const rankTableColumn = []
// 排行不需要占比
rankTableColumn[0] = tableColumn[0].slice(0, 4).map((column, index)=>({...column, minWidth: minWidth[index],label: index===0 ? '机构':column.label,align: index===0 ? 'left': 'right',width:undefined,fixed:false,sortable:false}))
rankTableColumn[1] = tableColumn[1].filter(column=> column.label !== '占比').map((column, index)=>({...column, minWidth: minWidth[index],label: index===0 ? '我司新产品':column.label,align: index===0 ? 'left': 'right',width:undefined,fixed:false,sortable:false}))

export {tableColumn, rankTableColumn}