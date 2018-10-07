// pages/book/index.js
import {
  BookModules
} from '../../modules/book.js'

let bookModules = new BookModules()

Page({
  data: {
    books: []
  },
  onLoad: function (options) {
    // 获取热门书籍(概要)
    this.getHotBooksList()
  },
  // 获取热门书籍(概要)
  getHotBooksList () {
    const hotBooksList = bookModules.getHotBooksList()
    hotBooksList.then(
      (res) => {
        this.setData({
          books: res
        })
        // console.log(res, 'res')
      }
    )
  },
  handleNavigationTo (e) {
    console.log(e.currentTarget.dataset.bookid);
    const bookId = e.currentTarget.dataset.bookid
    wx.navigateTo({
      url: `../book-detail/book-detail?bookId=${bookId}`
    })
  }
})
