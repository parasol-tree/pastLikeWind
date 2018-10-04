// 进行点赞 or 取消点赞
import { HTTP } from '../utils/ajax.js'

class LikeModules extends HTTP {
  constructor() {
    super()
  }
  like(whetherLike, params, callback) {
    let url = whetherLike === 'like' ? '/like' : '/like/cancel'
    this.request({
      url: url,
      method: 'POST',
      data: params,
      success: (res) => {
        callback(res)
      }
    })
  }
  likeStatus (type, art_id, callback) {
    this.request({
      url: '/classic/' + type + '/' + art_id + '/favor',
      success: (res) => {
        callback(res)
      }
    })
  }
}

export { LikeModules }
