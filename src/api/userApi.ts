import base from './base'
import req from './request'
// import UserNS from '@/'
export interface ILoginParams{
    loginname:string
    password:string
}
/**
 * 登录
 * @param params  ILoginParams
 * @returns
 */
export const postLoginApi=(params:ILoginParams)=>{
    // return req.post<any,{token:string;userid:string}>(base.login,params)
    return ''
}