// 进行点赞 or 取消点赞
import {
  HTTP
} from '../utils/ajax.js'

class LikeModules extends HTTP {
  constructor() {
    super()
  }
  // like(whetherLike, params, callback) {
  like(params) {
    const paramsCopy = JSON.parse(JSON.stringify(params))
    let url = paramsCopy.whetherLike === 'like' ? '/like' : '/like/cancel'
    paramsCopy.hasOwnProperty('whetherLike') && delete paramsCopy.whetherLike
    return this.request({
      url: url,
      data: paramsCopy,
      method: 'POST'
    })
  }
  likeStatus (params) {
    return this.request({
      url: `/classic/${params.type}/${params.art_id}/favor`,
    })
  }
}

export {
  LikeModules
}
