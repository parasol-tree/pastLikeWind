// 期刊
import {
  PeriodicalModules
} from '../../modules/periodical.js'
// 进行点赞 or 取消点赞
import {
  LikeModules
} from '../../modules/like.js'
import {
  config
} from '../../config.js'

let periodicalModules = new PeriodicalModules()
let likeModules = new LikeModules()

//获取应用实例
const app = getApp()

Page({
  data: {
    periodicalData: null,
    // 没有考虑 只有一期 期刊的 情况下, 既是第一期也是最新的一期期刊
    latestPeriodical: true,
    firstPeriodical: false
  },
  onLoad: function () {
    // 获取最新一期
    this.getLatest()
  },
  // 获取最新一期
  getLatest () {
    periodicalModules.getLatest()
      .then((res) => {
        this.setData({
          periodicalData: res
          // ...res // 如果这么写, 请将 本目录内 index.wxml 的 {{periodicalData}} 去掉
        })
        // 缓存 最新一期的 [期刊号]
        wx.setStorageSync('LatestPeriodicalID', res.index)
        let key = this._createStorageKey(res.index)
        // 缓存 最新一期的 [期刊数据]
        wx.setStorageSync(key, res)
      })
  },
  whetherLikeFN (e) {
    const params = {
      whetherLike: e.detail.whetherLike,
      art_id: this.data.periodicalData.id,
      type: this.data.periodicalData.type
    }
    likeModules.like(params)
      .then((res => {
        this.checkoutLikeStatus(this.data.periodicalData.type, this.data.periodicalData.id)
        wx.showToast({
          title: res.msg,
          icon: 'success',
          duration: 2000,
          mask: true
        })
      }))
  },
  triangleLeft (e) {
    // 默认显示的是最新期刊, 自然 点击左侧按钮就是 要查看 下一期
    // 获取当前期刊的 下一期
    this.handleUpDatePeriodica(config.NEXT)
  },
  triangleRight (e) {
    // 默认显示的是最新期刊, 自然 点击右侧按钮就是 要查看 上一期
    // 获取当前期刊的 上一期
    this.handleUpDatePeriodica(config.PRE)
  },
  handleUpDatePeriodica (nextOrPrevious) {
    // 获取期刊 nextOrPrevious === 'previous' 时 获取的是 当前期刊的前一期,
    // 获取期刊 nextOrPrevious === 'next' 是当前期刊的下一期

    let LatestPeriodicalID = this._GetLatestPeriodicalID()
     // 如果没有最新一期 期刊就去获取, 获取了最新一期但是数据不能显示最新一期, 所以再执行一次 handleUpDatePeriodica() 函数
    // (第 73 行 代码只是为了兼容再没有最新一期期刊数据时左右切换的 bug)
    !LatestPeriodicalID ? this.getLatest() && this.handleUpDatePeriodica(nextOrPrevious) : ''
    const periodicalID = this.data.periodicalData.index // 期刊 ID
    // 缓存的 期刊数据时 的 key
    let key = nextOrPrevious === config.NEXT
      ? this._createStorageKey(periodicalID + 1)
      : this._createStorageKey(periodicalID - 1)

    const periodicalData = wx.getStorageSync(key) // 期刊数据
    // 因为做了 缓存, 所以如果有数据 就不去请求服务器的数据了
    if (!!periodicalData) {
      this.setPeriodicalData(periodicalData)
      return
    }
    // 获取期刊数据
    periodicalModules.getPeriodical(periodicalID, nextOrPrevious)
      .then((res) => {
        // 缓存数据
        wx.setStorageSync(this._createStorageKey(res.index), res)
        this.setPeriodicalData(res)
      })
  },
  setPeriodicalData (res) {
    this.setData({
      periodicalData: res,
      latestPeriodical: this._isLatestPeriodical(res.index),
      firstPeriodical: this._isFirstPeriodical(res.index)
    })
    this.checkoutLikeStatus(res.type, res.id)
  },
  // 因为用了缓存, 所以会有 很大的问题,点击喜欢切换页面 喜欢的状态显示错误, 其他显示状态的问题也类似, 所以需要再次检查喜欢的状态
  checkoutLikeStatus (type, id) {
    const params = {
      type: type,
      art_id: id
    }
    likeModules.likeStatus(params)
      .then((res) => {
        let newVal = Object.assign(this.data.periodicalData, res)
        this.setData({ periodicalData: newVal })
        let key = this._createStorageKey(this.data.periodicalData.index)
        // 是否喜欢的 状态 改变, 此时 应该更新 缓存
        wx.setStorageSync(key, this.data.periodicalData)
      })
  },
  onPullDownRefresh () {
    console.log('下拉刷新开始')
    setTimeout(() => {
      wx.stopPullDownRefresh()
      console.log('下拉刷新结束')
    }, 1000)
  },
  _createStorageKey (periodicalID) {
    let storageKey = config.STORAGE_KEY.PERIODICAL_ID + periodicalID
    return storageKey
  },
  _GetLatestPeriodicalID () {
    let LatestPeriodicalID = wx.getStorageSync('LatestPeriodicalID')
    return LatestPeriodicalID
  },
  _isLatestPeriodical (periodicalID) {
    let LatestPeriodicalID = this._GetLatestPeriodicalID()
    return LatestPeriodicalID == periodicalID ? true : false
  },
  // periodicalID 是 1 ,那就是第一期
  _isFirstPeriodical (periodicalID) {
    return periodicalID == 1 ? true : false
  }
})
