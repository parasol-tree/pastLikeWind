// pages/book-detail/book-detail.js
import {
  BookModules
} from '../../modules/book.js'

let bookModules = new BookModules()

Page({
  data: {
    bookId: null,
    bookDetail: {},
    comments: []
  },
  onLoad: function (options) {
    this.setData({
      bookId: options.bookId
    })
    this.getBookDetail(options.bookId)
    this.getBookComment(options.bookId)
  },
  // 获取单本书籍详细信息
  getBookDetail (bookId) {
    bookModules.getBookDetail(bookId)
      .then((res) => {
        // console.log(res)
        this.setData({
          bookDetail: res
        })
      })
  },
  // 获取单本书籍 的评价
  getBookComment (bookId) {
    bookModules.getBookComment(bookId)
      .then((res) => {
        this.setData({
          comments: res.comments
        })
      })
  }
})
