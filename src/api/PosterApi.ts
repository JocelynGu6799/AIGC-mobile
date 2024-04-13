import base from './base'
import req from './request'
export const postPosterApi=(fd:any)=>{
    return req.post<any,any>(base.generate,fd)
}