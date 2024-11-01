import request from '@/utils/request'
// import { resolve } from 'core-js/fn/promise'

const menuConfig = {}

const requestShuCang = process.env.VUE_APP_REQUEST_ENV == 'shucang' ? true : false

export function getIPBSToken(ssoUserName){
    const url = '/app/third/transferData'//转发接口，真实请求url是requestUrl
    return requestIBPS({
        url: url,
        method: 'post',
        data: {username: ssoUserName, userName: ssoUserName,requestUrl: process.env.VUE_APP_REQUEST_IBPS_TOKEN_API}
    })
}

export function getMenuList(token, data={
    keyword: ''
}){
    if(requestShuCang){
        let res = menuConfig.result
        let promise = new Promise(resolve => resolve(res))
        return promise
    }

    let url = '/app/third/getUserPermissionByToken'
    data.requestUrl = process.env.VUE_APP_REQUEST_MENU_API
    data['X-Access-Token'] = token
    return requestIBPS({
        url:url,
        method: 'post',
        data
    })
}