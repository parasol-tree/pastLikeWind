// 引入配置 文件 和 错误码
import { config, errorCode } from '../config.js'

class HTTP {
  constructor() {
    this.baseRestUrl = config.BASE_URL
  }
  request (params) {
    if (!params.method) { params.method = 'GET' }
    wx.request({
      url: this.baseRestUrl + params.url,
      method: params.method,
      data: params.data,
      header: {
        'Content-Type': 'application/json',
        'appkey': config.APP_KEY
      },
      success: (res) => {
        this._ShowSucc(res, params)
      },
      // 小程序 4xx 状态 不会在 fail 内 出现(API 调用失败处理)
      fail: (err) => {
        console.log(err, 'err')
        this._ShowErr(1)
      }
    })
  }
  // 函数名 前加一个 _ 并且首字母大写 代表 是私有方法,但是在 ES6 内, 在外面也可以调用, 这样写就代表你在外面就别调用这个方法了
  _ShowSucc (res, params) {
    // console.log(res, 'res ajax.js 30')
    let code = Object.prototype.toString.call(res.statusCode) === '[object Number]' ? res.statusCode.toString() : res.statusCode
    if (code.startsWith('2')) { params.success && params.success(res.data) }
    // 服务器异常处理
    else { this._ShowErr(res.data.error_code) }
  }
  // 函数名 前加一个 _ 并且首字母大写 代表 是私有方法,但是在 ES6 内在外面也可以调用, 这样写就代表你在外面就别调用这个方法了
  _ShowErr (code) {
    if (!code) { code = 1 }
    wx.showToast({
      title: errorCode[code],
      icon: 'none', // "success", "loading", "none"
      duration: 2000,
      mask: true,
    })
  }
}

export {
  HTTP
}
