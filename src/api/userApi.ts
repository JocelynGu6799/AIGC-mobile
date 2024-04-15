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
interface IViewApi{
    prompt_id:string;
    client_id:string;
}
export const getViewApi=(queryParams:IViewApi)=>{
    return req.get<any,any>(base.view,{params:queryParams})

}