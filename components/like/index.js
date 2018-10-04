// components/like/index.js
Component({
  /**
   * 组件的属性列表
   * 组件的 封闭性 和 开放性 (哪些属性是封闭的,哪些是开放的)
   * 组件的 粒度 (非常简单功能,非常复杂的功能;哪些功能封装到组建内,哪些不封装到组建内)
   * [根据 团队环境 和 业务 来 决定 组件的 粒度]
   */
  properties: {
    // 是否喜欢(true(1): 喜欢, false(0): 不喜欢)
    like: {
      type: Boolean // 布尔 类型的值 默认是 false
    },
    // 被喜欢的数量
    count: {
      type: Number // 数字 类型的值 默认是 0
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    likeImgSrc: 'img/like.png', // 喜欢 的 图片路径
    unLikeImgSrc: 'img/like@dis.png' // 不喜欢 的 图片路径
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleOnLike (e) {
      let like = this.properties.like
      let count = this.properties.count
      count = like ? count - 1 : count + 1
      this.setData({
        like: !like,
        count: count
      })
      let whetherLike = this.properties.like ? 'like' : 'unLike'
      // let whetherLike = this.properties.like
      // 用 triggerEvent 激活自定义事件(以便父组件监听)
      this.triggerEvent('whetherLikeFN', {
        whetherLike: whetherLike
      }, {})
    }
  },
  /**
   * 组件的生命周期列表
   */
  lifetimes: {}
})
