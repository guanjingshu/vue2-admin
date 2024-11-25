import request from '@/utils/request'
// 后端导出
export function getSoaDataBlob(data){
    return request({
        url: '/soa/data/export',
        method: 'post',
        data,
        responseType: 'blob'
    })
}

getSoaDataBlob(param).then((res) => {
    const blob = res.fileData
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = res.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a)
}).catch((e)=>{
    console.log(e)
})