import { requestPost, requestGet } from './request.js'
import md5 from 'blueimp-md5'

//登陆
export function login(phone, pass) {
    return requestPost({
        url: '/login/cellphone',
        params: {
            phone: phone,
            password: pass
        }
    });
}

//查询登陆状态
export function loginStatus() {
    return requestGet({
        url: '/login/status'
    });
}