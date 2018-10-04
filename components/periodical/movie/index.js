// components/periodical/movie/index.js
import { behavior } from '../behavior.js'

Component({
  behaviors: [behavior],
  /**
   * 组件的属性列表
   */
  properties: {
    /* img 和 content 几个组件共用, 用 behavior 代替, 省的 定义 好几遍 img 和 content
    img: {
      type: String
    },
    content: {
      type: String
    } */
  },
  /**
   * 组件的初始数据
   */
  data: {
    movieImgTitleSrc: './img/movie@tag.png'
  },
  /**
   * 组件的方法列表
   */
  methods: {}
})
