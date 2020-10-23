import axios from './axios';
// 根据不同环境配置不同的baseURL
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
const baseURL = process.env.VUE_APP_BASE_URL;
// 只封装了两种常用的请求方式  get/post
const request = (method, url, data) => {
    method = method.toLocaleLowerCase();
    if (method === 'get') {
        return axios.get(url, { params: data })
    } else if (method === 'post') {
        return axios.post(url, data)
    }
}

// JSONP请求
const JSONP = (url, params, jsoncallback = 'jsonpCallback', hasLoad = true) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: baseURL + url, // 订单详情查询
            type: 'get',
            dataType: 'jsonp',
            data: { ...params },
            jsonp: jsoncallback,
            success: res => {
                if (res.returnCode === '0000') {
                    resolve(res)
                    setTimeout(() => {
                    }, 250)
                } else {
                    setTimeout(() => {
                    }, 250)
                    reject({ msg: '网络异常' })
                }
            },
            error: err => {
                reject();
            }
        })
    })
}

export { request, JSONP };