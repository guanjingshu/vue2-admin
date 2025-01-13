export function tihuan(arr2) {
  let arr = [
    { content: 1 },
    { content: 2 },
    { content: 3 },
    { content: 4 },
    { content: 5 },
  ];
  let index = arr.findIndex((item) => item.content === 4);
  arr.splice(index, 1, { content: "test" });

  console.log(arr);
}

export function cha_ru_xiu_gai(arr2) {//插入并修改
  // 这段代码首先找到busi_type1为合计和负债的元素，然后将合计元素插入到负债元素之前，并删除负债元素。最后，将busi_type2和busi_type3的值修改为资产合计。
  let arr = [
    {busi_type1:'',busi_type2:'',busi_type3:''},
    {busi_type1:'',busi_type2:'',busi_type3:''},
    {busi_type1:'负债',busi_type2:'净负债',busi_type3:'负债'},
    {busi_type1:'净资产',busi_type2:'净资产',busi_type3:'净资产'},
    {busi_type1:'合计',busi_type2:'合计',busi_type3:'合计'}
  ];
  
  let total = arr.find(item => item.busi_type1 === '合计');
  let debt = arr.find(item => item.busi_type1 === '负债');
  
  if (total && debt) {
    let index = arr.indexOf(debt);
    arr.splice(index, 0, {...total, busi_type2: '资产合计', busi_type3: '资产合计'});
    arr.splice(index + 1, 1);
  }
  
  console.log(arr);
}
let arrData=[{
  prop: 'xxx',
	label:'资产分类',
  columns:[{
    prop:'xxx',
    label:'资产分类',
    columns:[{
      prop:'xxx',
      label:'资产分类',
      columns:[{
        prop:'busiType1',
        label:'资产分类',
      },{
        prop:'busiType2',
        label:'资产分类',
      },{
        prop:'busiType3',
        label:'资产分类',
      }]
    }]
  }]
},
{
  prop:'xxx',
  label:'财富-固收',
  columns:[{
    prop:'xxx',
    label:'货币',
    columns:[{
      prop:'xxx',
      label:'2024/9/18',
      columns:[{
        prop:'财富-固收$货币$2024/9/28$A',
        label:'时点规模',
      }]
    }]
  }]
},{
  prop:'xxx',
  label:'财富-固收',
  columns:[{
    prop:'xxx',
    label:'货币',
    columns:[{
      prop:'xxx',
      label:'2024/9/18',
      columns:[{
        prop:'财富-固收$货币$2024/9/28$B',
        label:'较上一工作日',
      }]
    }]
  }]
},{
  prop:'xxx',
  label:'财富-固收',
  columns:[{
    prop:'xxx',
    label:'货币',
    columns:[{
      prop:'xxx',
      label:'2024/9/18',
      columns:[{
        prop:'财富-固收$货币$2024/9/28$C',
        label:'较上年末',
      }]
    }]
  }]
}]

// 0.000056 -> 0.00006 0.0041->0.004四舍五入
export function roundDecimal(floatNumber) {
  if(parseFloat(floatNumber)===0) return 0;
  const index = floatNumber.split('.')[1].split('').findIndex(num => /[1-9]/.test(num));
  if(index > -1){
    return Math.round(parseFloat(floatNumber) * Math.pow(10, index + 1)) / Math.pow(10, index + 1);
  }
  return floatNumber;
}
export function roundDecimal2(floatNumber) {
  if(parseFloat(floatNumber)===null) {return '-'};
  if(parseFloat(floatNumber)===0) {return 0};
  if(floatNumber !== null && parseFloat(floatNumber) !== 0 && floatNumber !== '-' && typeof(floatNumber)  !== 'number'){
  const index = floatNumber.split('.')[1].split('').findIndex(num => /[1-9]/.test(num));
  if(index > -1){
    return Math.round(parseFloat(floatNumber) * Math.pow(10, index + 1)) / Math.pow(10, index + 1);
  }
}
  return floatNumber;
}