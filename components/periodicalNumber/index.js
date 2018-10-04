// components/periodicalNumber/index.js
Component({
  /**
   * 组件的属性列表, 可以初始化的值 为 String, Number, Boolean, Object, Array, null
   * properties 会覆盖 data 内的 同名属性
   */
  properties: {
    periodicalNumber: {
      type: Number,
      observer: function (newVal, oldVal, changePath) {
        // 不要 在 observer 内 用 setData({}) 改变自身值,会导致递归调用 observer
        let val = newVal < 10 ? ('0' + newVal) : newVal
        this.setData({
          _periodicalNumber: val
        })
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    year: 0,
    month: '',
    _periodicalNumber: 0
  },
  /**
   * 组件的方法列表
   */
  methods: {
  },
  /**
   * 组件的生命周期方法列表
   */
  lifetimes: {
    // 在组件实例进入页面节点树时执行
    attached () {
      const date = new Date()
      const year = date.getFullYear()
      const month = this.data.months[date.getMonth()]
      this.setData({
        year: year,
        month: month
      })
    }
  }
})
