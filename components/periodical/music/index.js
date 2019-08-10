// components/periodical/music/index.js
import { behavior } from '../behavior.js'

const bAM = wx.getBackgroundAudioManager() // bAM 是 backgroundAudioManager 的简写

Component({
  behaviors: [behavior],
  /**
   * 组件的属性列表
   */
  properties: {
    musicSrc: {
      type: String
    },
    title: {
      type: String
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    playSrc: './img/player@playing.png',
    pauseSrc: './img/player@pause.png',
    isPlaying: false, // 音乐的播放的状态 true 为 正在播放(显示 暂停按钮), false 为 没有播放(显示播放按钮)
    animationStatus: 'paused'
  },
  lifetimes: {
    // wx:if 可以触发生命周期函数, hidden 无法触发
    attached () {
      this.setMusicStatus()
      this.checkUpMusicStatus()
      // this.queryMultipleNodes()
      // this.setAnimationStatus()
    },
    detached () {},
    ready () {
      // this.queryMultipleNodes()
      this.setAnimationStatus()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 处理音乐播放
    handleMusicStatus (e) {
      this.setMusicTitle()
      if (this.data.isPlaying) {
        // console.log('暂停播放')
        bAM.pause()
        this.setData({ isPlaying: !this.data.isPlaying })
      }
      else {
        // console.log('开始播放')
        bAM.src = this.properties.musicSrc
        this.setData({ isPlaying: !this.data.isPlaying })
      }
      this.setAnimationStatus()
    },
    setMusicStatus () {
      // bAM.paused 的值为 true 表示暂停或停止, false 表示正在播放
      /*
      ** bAM.paused === false && bAM.src === this.properties.musicSrc
      ** 值为 true 正在播放本组件歌曲, 为 false 没有播放
      */
      bAM.paused === false && bAM.src === this.properties.musicSrc
      ? this.setData({ isPlaying: true })
      : this.setData({ isPlaying: false })
    },
    checkUpMusicStatus () {
      bAM.onPlay(() => {
        this.setMusicStatus()
        this.setAnimationStatus()
      })
      bAM.onPause(() => {
        this.setMusicStatus()
        this.setAnimationStatus()
      })
      bAM.onStop(() => {
        console.log('onStop')
        this.setMusicStatus()
        this.setAnimationStatus()
        // this.queryMultipleNodes()
      })
      bAM.onEnded(() => {
        this.setMusicStatus()
        this.setAnimationStatus()
      })
      bAM.onError(() => {
        this.setMusicStatus()
        this.setAnimationStatus()
        wx.showToast({
          title: '播放音乐出错, 请重启微信后重试',
          icon: 'none',
          mask: true
        })
        setTimeout(() => { wx.hideToast() }, 1500)
      })
      bAM.onWaiting(() => {
        this.setMusicStatus()
        this.setAnimationStatus()
      })
    },
    queryMultipleNodes () {
      // let query = wx.createSelectorQuery().in(this)
      // query.select('.musicCover').fields({
      //   id: true,
      //   dataset: true,
      //   rect: true,
      //   size: true,
      //   scrollOffset: true,
      //   // properties: [],
      //   computedStyle: ['transform']
      // }, (res) => {
      //   console.log(res, 'res')
      //   if (res.transform !== 'none') {
      //     let matrix = res.transform
      //     var values = matrix.split('(')[1].split(')')[0].split(',')
      //     let a = values[0]
      //     let b = values[1]
      //     let c = values[2]
      //     let d = values[3]
      //     var scale = Math.sqrt(a * a + b * b)
      //     let sin = b / scale
      //     let angle = Math.round(Math.atan2(b, a) * (180 / Math.PI)) + 'deg'
      //     console.log('旋转了: ' + angle)
      //   }
      // }).exec()
    },
    setAnimationStatus () {
      if (this.data.isPlaying) { this.setData({ animationStatus: 'running' }) }
      else { this.setData({ animationStatus: 'paused' }) }
    },
    setMusicTitle () {
      bAM.title = this.properties.title // 小程序更新文档, 要播放 音频必须要有 title
    }
  }
})
