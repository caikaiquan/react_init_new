import axios from 'axios'
const pending = {}
const CancelToken = axios.CancelToken
const removePending = (key, isRequest = false) => {
  if (pending[key] && isRequest) {
    pending[key]('取消重复请求')
  }
  delete pending[key]
}
const getRequestIdentify = (config, isReuest = false) => {
  let url = config.url
  if (isReuest) {
    url = config.baseURL + config.url.substring(1, config.url.length)
  }
  return config.method === 'get' ? encodeURIComponent(url + JSON.stringify(config.params)) : encodeURIComponent(config.url + JSON.stringify(config.data))
}

// 请求拦截器
axios.interceptors.request.use(config => {
  // 设置请求头
  let user = sessionStorage.getItem('user');
  if (user) {
    let token = JSON.parse(user).token;
    config.headers.common['token'] = token;
  }
  // 拦截重复请求(即当前正在进行的相同请求)
  let requestData = getRequestIdentify(config, true)
  removePending(requestData, true)

  config.cancelToken = new CancelToken((c) => {
    pending[requestData] = c
  })
  return config
}, error => {
  return Promise.reject(error)
})
// 处理未登录返回jsonCallBack
const handleJsonCallBack = (res) => {
  let reg1 = /^jsonCallBack/;
  let reg2 = /\{(\S*)\}/g;
  if (reg1.test(res)) {
    try {
      let resData = res.match(reg2)[0];
      if (resData) {
        return JSON.parse(resData)
      }
    } catch (err) {
      return res
    }
  } else {
    return res
  }
}
// 异常处理
axios.interceptors.response.use(response => {
  let requestData = getRequestIdentify(response.config)
  removePending(requestData)
  response.data = handleJsonCallBack(response.data)
  // {returnCode: "7777", returnMessage: "未登录！"}
  if (response.data && response.data.returnCode) {
    if (response.data.returnCode === '7777') { // 未登录
      // 清除剩余请求
      for (let key in pending) {
        pending[key]('取消重复请求')
        delete pending[key]
      }
    } else if (response.data.returnCode === '0000') { // 成功返回
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response.data)
    }
  } else {
    return Promise.reject({ msg: "网络异常" })
  }
  // return Promise.resolve(response.data);
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '错误请求'
        break
      case 401:
        err.message = '未授权，请重新登录'
        break
      case 403:
        err.message = '拒绝访问'
        break
      case 404:
        err.message = '请求错误,未找到该资源'
        break
      case 405:
        err.message = '请求方法未允许'
        break
      case 408:
        err.message = '请求超时'
        break
      case 500:
        err.message = '服务器端出错'
        break
      case 501:
        err.message = '网络未实现'
        break
      case 502:
        err.message = '网络错误'
        break
      case 503:
        err.message = '服务不可用'
        break
      case 504:
        err.message = '网络超时'
        break
      case 505:
        err.message = 'http版本不支持该请求'
        break
      default:
        err.message = `连接错误${err.response.status}`
    }
    let errData = {
      code: err.response.status,
      message: err.message
    }
    // 统一错误处理可以放这，例如页面提示错误...
    console.log('统一错误处理: ', errData);
    return Promise.reject(errData)
  } else {
    return Promise.reject({ message: '网络连接异常' })
  }
})

axios.defaults.withCredentials = true;

export default axios;
