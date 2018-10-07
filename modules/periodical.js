// periodical 期刊
import {
  HTTP
} from '../utils/ajax.js'
import {
  config
} from '../config.js'
class PeriodicalModules extends HTTP {
  // 获取最新一期
  getLatest (callback) {
    this.request({
      url: '/classic/latest',
      success: (res) => {
        callback(res)
        // 缓存 最新一期的期刊号
        this._SetLatestPeriodicalID(res.index)
        let key = this._createStorageKey(res.index)
        // 缓存 最新一期的 期刊数据
        wx.setStorageSync(key, res)
      }
    })
  }
  // 获取期刊 nextOrPrevious 为 'previous' 获取的是 当前期刊的前一期 为 'next' 是当前期刊的下一期
  getPeriodical (periodicalID, nextOrPrevious, callback) {
    let key = nextOrPrevious === config.NEXT ?
      this._createStorageKey(periodicalID + 1) : this._createStorageKey(periodicalID - 1)
    const periodicalData = wx.getStorageSync(key)
    if (!periodicalData) {
      this.request({
        url: '/classic/' + periodicalID + '/' + nextOrPrevious,
        success: (res) => {
          wx.setStorageSync(this._createStorageKey(res.index), res)
          callback(res)
        }
      })
    }
    else {
      callback(periodicalData)
    }
  }
  // periodicalID 是 1 ,那就是第一期
  isFirstPeriodical (periodicalID) {
    return periodicalID == 1 ? true : false
  }
  isLatestPeriodical (periodicalID) {
    let LatestPeriodicalID = this._GetLatestPeriodicalID()
    return LatestPeriodicalID == periodicalID ? true : false
  }
  // 私有方法 统一放在 最底部
  _SetLatestPeriodicalID (periodicalID) {
    wx.setStorageSync('LatestPeriodicalID', periodicalID)
  }
  _GetLatestPeriodicalID () {
    let LatestPeriodicalID = wx.getStorageSync('LatestPeriodicalID')
    return LatestPeriodicalID
  }
  _createStorageKey (periodicalID) {
    let storageKey = config.STORAGE_KEY.PERIODICAL_ID + periodicalID
    return storageKey
  }
}

export {
  PeriodicalModules
}
