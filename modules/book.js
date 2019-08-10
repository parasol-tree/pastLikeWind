// 进行点赞 or 取消点赞
import {
  HTTP
} from '../utils/ajax.js'

class BookModules extends HTTP {
  constructor() {
    super()
  }
  // 获取热门书籍(概要)
  getHotBooksList () {
    return this.request({
      url: '/book/hot_list'
    })
  }
  // 获取单个书籍详情信息(根据 bookId)
  getBookDetail(bookId) {
    return this.request({
      url: `/book/${bookId}/detail`
    })
  }
  // 获取书籍 评价
  getBookComment (bookId) {
    return this.request({
      url: `/book/${bookId}/short_comment`
    })
  }
}

export {
  BookModules
}
