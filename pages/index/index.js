// 期刊
import { PeriodicalModules } from '../../modules/periodical.js'
// 进行点赞 or 取消点赞
import { LikeModules } from '../../modules/like.js'
import { config } from '../../config.js'

let periodicalModules = new PeriodicalModules()
let likeModules = new LikeModules()

//获取应用实例
const app = getApp()

Page({
  data: {
    periodicalData: null,
    latestPeriodical: true,
    firstPeriodical: false
  },
  onLoad: function () {
    // 获取最新一期
    this.getLatest()
  },
  // 获取最新一期
  getLatest () {
    periodicalModules.getLatest((res) => {
      this.setData({
        periodicalData: res
        // ...res // 如果这么写, 请将 本目录内 index.wxml 的 {{periodicalData}} 去掉
      })
      // console.log(this.data, 'this.data')
    })
  },
  whetherLikeFN (e) {
    let whetherLike = e.detail.whetherLike
    let params = {
      art_id: this.data.periodicalData.id,
      type: this.data.periodicalData.type
    }
    likeModules.like(whetherLike, params, (res) => {
      wx.showToast({
        title: res.msg,
        icon: 'success',
        duration: 2000,
        mask: true,
      })
    })
  },
  triangleLeft (e) {
    // 获取当前期刊的 下一期
    this.handleUpDatePeriodica(config.NEXT)
  },
  triangleRight (e) {
    // 获取当前期刊的 前一期
    this.handleUpDatePeriodica(config.PRE)
  },
  handleUpDatePeriodica (nextOrPrevious) {
    const periodicalID = this.data.periodicalData.index
    periodicalModules.getPeriodical(periodicalID, nextOrPrevious, (res) => {
      this.setData({
        periodicalData: res,
        latestPeriodical: periodicalModules.isLatestPeriodical(res.index),
        firstPeriodical: periodicalModules.isFirstPeriodical(res.index)
      })
    })
    // 因为用了缓存, 所以会有 很大的问题,点击喜欢切换页面 喜欢的状态显示错误, 其他显示状态的问题也类似, 所以再次检查喜欢的状态
    likeModules.likeStatus(this.data.periodicalData.type, this.data.periodicalData.id, (res) => {
      let newVal = Object.assign(this.data.periodicalData, res)
      this.setData({
        periodicalData: newVal
      })
    })
  },
  onPullDownRefresh () {
    console.log('下拉刷新开始')
    setTimeout(() => {
      wx.stopPullDownRefresh()
      console.log('下拉刷新结束')
    }, 1000)
  }
})
