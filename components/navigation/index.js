// components/navigation/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    firstPeriodical: {
      type: Boolean
    },
    latestPeriodical: {
      type: Boolean
    },
    title: {
      type: String
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    triangleLeftSrc: './img/triangle@left.png',
    triangleLeftDisableSrc: './img/triangle.dis@left.png',
    triangleRightSrc: './img/triangle@right.png',
    triangleRightDisableSrc: './img/triangle.dis@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    triangleLeft () {
      this.properties.latestPeriodical ? '' : this.triggerEvent('triangleLeft', {}, {})
    },
    triangleRight () {
      this.properties.firstPeriodical ? '' : this.triggerEvent('triangleRight', {}, {})
    }
  }
})
